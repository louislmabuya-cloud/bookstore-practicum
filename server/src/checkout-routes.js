import express from 'express'
import Stripe from 'stripe'
import { fromNodeHeaders } from 'better-auth/node'
import { and, eq, inArray } from 'drizzle-orm'
import { auth } from './auth.js'
import { db } from './db/index.js'
import { books, orderItems, orders } from './db/schema.js'
import { parseCartItems } from './cart-validation.js'

const router = express.Router()
const currency = 'usd'
let stripeClient

function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    const error = new Error('Stripe is not configured on the server.')
    error.statusCode = 503
    throw error
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY)
  }

  return stripeClient
}

function getStoreUrl() {
  const configuredUrl =
    process.env.RENDER_EXTERNAL_URL || process.env.CLIENT_URL

  if (!configuredUrl) {
    const error = new Error('The store URL is not configured on the server.')
    error.statusCode = 503
    throw error
  }

  const url = new URL(configuredUrl)
  const isLocalhost = ['localhost', '127.0.0.1'].includes(url.hostname)

  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLocalhost)) {
    const error = new Error('The configured store URL must use HTTPS.')
    error.statusCode = 503
    throw error
  }

  return url.origin
}

async function getSignedInUser(req) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  return session?.user ?? null
}

router.post(
  '/checkout/session',
  express.json({ limit: '16kb' }),
  async (req, res) => {
    try {
      const user = await getSignedInUser(req)

      if (!user) {
        return res.status(401).json({
          error: 'Please sign in before checking out.',
        })
      }

      const cartItems = parseCartItems(req.body)
      const stripe = getStripeClient()
      const storeUrl = getStoreUrl()
      const requestedBookIds = cartItems.map((item) => item.bookId)
      const catalogueBooks = await db
        .select()
        .from(books)
        .where(inArray(books.id, requestedBookIds))

      if (catalogueBooks.length !== requestedBookIds.length) {
        return res.status(400).json({
          error: 'A book in your cart is no longer available.',
        })
      }

      const booksById = new Map(
        catalogueBooks.map((book) => [book.id, book]),
      )
      const orderLines = cartItems.map((item) => {
        const book = booksById.get(item.bookId)
        const unitPriceCents = Math.round(book.price * 100)

        if (!Number.isSafeInteger(unitPriceCents) || unitPriceCents < 1) {
          throw new Error(`Book ${item.bookId} has an invalid price.`)
        }

        return {
          book,
          quantity: item.quantity,
          unitPriceCents,
        }
      })
      const totalCents = orderLines.reduce(
        (total, item) => total + item.unitPriceCents * item.quantity,
        0,
      )

      if (!Number.isSafeInteger(totalCents) || totalCents > 2147483647) {
        return res.status(400).json({
          error: 'Your cart total is too large to check out.',
        })
      }

      const [order] = await db.transaction(async (tx) => {
        const [createdOrder] = await tx
          .insert(orders)
          .values({
            userId: user.id,
            totalCents,
          })
          .returning({ id: orders.id })

        await tx.insert(orderItems).values(
          orderLines.map((item) => ({
            orderId: createdOrder.id,
            bookId: item.book.id,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
          })),
        )

        return [createdOrder]
      })

      let checkoutSession

      try {
        checkoutSession = await stripe.checkout.sessions.create({
          mode: 'payment',
          customer_email: user.email,
          client_reference_id: String(order.id),
          metadata: { orderId: String(order.id) },
          line_items: orderLines.map((item) => ({
            quantity: item.quantity,
            price_data: {
              currency,
              unit_amount: item.unitPriceCents,
              product_data: {
                name: item.book.title,
                description: `By ${item.book.author}`,
              },
            },
          })),
          success_url: `${storeUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}#cart`,
          cancel_url: `${storeUrl}/?checkout=cancel#cart`,
        })

        if (!checkoutSession.url) {
          throw new Error('Stripe did not return a Checkout URL.')
        }

        const updatedOrders = await db
          .update(orders)
          .set({ stripeSessionId: checkoutSession.id })
          .where(
            and(eq(orders.id, order.id), eq(orders.status, 'pending')),
          )
          .returning({ id: orders.id })

        if (updatedOrders.length !== 1) {
          throw new Error('Could not link the Stripe session to the order.')
        }

        return res.status(201).json({ url: checkoutSession.url })
      } catch (error) {
        if (checkoutSession?.id) {
          try {
            await stripe.checkout.sessions.expire(checkoutSession.id)
          } catch (expireError) {
            console.error(
              'Could not expire an unlinked Stripe Checkout Session:',
              expireError.message,
            )
          }
        }

        try {
          await db.delete(orders).where(eq(orders.id, order.id))
        } catch (cleanupError) {
          console.error(
            `Could not remove incomplete order ${order.id}:`,
            cleanupError.message,
          )
        }

        throw error
      }
    } catch (error) {
      console.error('Could not create checkout session:', error.message)
      return res.status(error.statusCode || 500).json({
        error:
          error.statusCode && (error.statusCode < 500 || error.statusCode === 503)
            ? error.message
            : 'Could not start checkout. Please try again.',
      })
    }
  },
)

router.get('/checkout/session/:sessionId', async (req, res) => {
  try {
    const user = await getSignedInUser(req)

    if (!user) {
      return res.status(401).json({
        error: 'Please sign in to view this order.',
      })
    }

    const sessionId = req.params.sessionId

    if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
      return res.status(400).json({ error: 'Invalid Checkout Session ID.' })
    }

    const [order] = await db
      .select({
        id: orders.id,
        status: orders.status,
        totalCents: orders.totalCents,
      })
      .from(orders)
      .where(
        and(
          eq(orders.stripeSessionId, sessionId),
          eq(orders.userId, user.id),
        ),
      )
      .limit(1)

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' })
    }

    return res.json({
      orderId: order.id,
      status: order.status,
      totalCents: order.totalCents,
    })
  } catch (error) {
    console.error('Could not look up checkout order:', error.message)
    return res.status(500).json({
      error: 'Could not check your order. Please try again.',
    })
  }
})

router.post(
  '/stripe/webhook',
  express.raw({ type: 'application/json', limit: '1mb' }),
  async (req, res) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return res.status(503).json({
        error: 'Stripe payments are not configured on the server.',
      })
    }

    const signature = req.headers['stripe-signature']

    if (typeof signature !== 'string' || !Buffer.isBuffer(req.body)) {
      return res.status(400).json({ error: 'Invalid Stripe webhook request.' })
    }

    let event

    try {
      event = getStripeClient().webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      )
    } catch (error) {
      console.error('Could not verify Stripe webhook:', error.message)
      return res.status(400).json({ error: 'Invalid Stripe webhook signature.' })
    }

    const paidEventTypes = new Set([
      'checkout.session.completed',
      'checkout.session.async_payment_succeeded',
    ])
    const expiredEvent = event.type === 'checkout.session.expired'
    const failedEvent = event.type === 'checkout.session.async_payment_failed'

    if (
      !paidEventTypes.has(event.type) &&
      !expiredEvent &&
      !failedEvent
    ) {
      return res.json({ received: true })
    }

    try {
      const checkoutSession = event.data.object
      const orderId = Number(checkoutSession.metadata?.orderId)

      if (!Number.isSafeInteger(orderId) || orderId < 1) {
        console.error('Stripe Checkout Session has invalid order metadata.')
        return res.status(400).json({ error: 'Invalid order metadata.' })
      }

      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.id, orderId))
        .limit(1)

      if (!order || order.stripeSessionId !== checkoutSession.id) {
        console.error(
          `Stripe Checkout Session ${checkoutSession.id} does not match order ${orderId}.`,
        )
        return res.status(400).json({ error: 'Checkout order did not match.' })
      }

      if (paidEventTypes.has(event.type)) {
        if (checkoutSession.payment_status !== 'paid') {
          return res.json({ received: true })
        }

        if (
          checkoutSession.amount_total !== order.totalCents ||
          checkoutSession.currency !== currency
        ) {
          console.error(
            `Stripe amount or currency did not match order ${order.id}.`,
          )
          return res.status(400).json({ error: 'Checkout total did not match.' })
        }

        if (order.status === 'pending') {
          await db
            .update(orders)
            .set({ status: 'paid', paidAt: new Date() })
            .where(
              and(
                eq(orders.id, order.id),
                eq(orders.status, 'pending'),
                eq(orders.stripeSessionId, checkoutSession.id),
              ),
            )
        }
      } else if (order.status === 'pending') {
        await db
          .update(orders)
          .set({
            status: expiredEvent ? 'expired' : 'failed',
          })
          .where(
            and(
              eq(orders.id, order.id),
              eq(orders.status, 'pending'),
              eq(orders.stripeSessionId, checkoutSession.id),
            ),
          )
      }

      return res.json({ received: true })
    } catch (error) {
      console.error('Could not process Stripe webhook:', error.message)
      return res.status(500).json({ error: 'Could not process webhook.' })
    }
  },
)

export default router
