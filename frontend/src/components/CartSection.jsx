import { useEffect, useState } from 'react'
import QuantityStepper from './QuantityStepper.jsx'
import { useCart } from '../context/cart-context.js'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function CartSection({ books, booksLoading, booksError }) {
  const {
    items,
    itemCount,
    storageError,
    setItemQuantity,
    removeItem,
    clearCart,
  } = useCart()
  const [checkoutBusy, setCheckoutBusy] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [checkoutRetry, setCheckoutRetry] = useState(0)
  const [checkoutFeedback, setCheckoutFeedback] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const result = params.get('checkout')
    const sessionId = params.get('session_id')

    if (result === 'cancel') {
      return {
        status: 'cancelled',
        message: 'Checkout was cancelled. Your cart is still here.',
      }
    }

    if (result === 'success' && sessionId) {
      return {
        status: 'checking',
        message: 'Checking your payment with the store...',
        sessionId,
      }
    }

    return null
  })

  const cartItems = items.map((item) => ({
    ...item,
    book: books.find((book) => book.id === item.bookId),
  }))
  const subtotalCents = cartItems.reduce(
    (total, item) =>
      total +
      (item.book ? Math.round(item.book.price * 100) * item.quantity : 0),
    0,
  )
  const hasUnavailableBooks =
    !booksLoading &&
    !booksError &&
    cartItems.some((item) => !item.book)
  const canCheckout =
    items.length > 0 &&
    !booksLoading &&
    !booksError &&
    !hasUnavailableBooks &&
    !checkoutBusy

  useEffect(() => {
    if (checkoutFeedback?.status !== 'checking') {
      return undefined
    }

    const controller = new AbortController()
    let retryTimer

    async function checkPayment() {
      try {
        const response = await fetch(
          `/api/checkout/session/${encodeURIComponent(checkoutFeedback.sessionId)}`,
          { signal: controller.signal },
        )
        const result = await response.json()

        if (!response.ok) {
          setCheckoutFeedback({
            status: 'error',
            message:
              response.status === 401
                ? 'Sign in to the same account you used to place the order, then check again.'
                : result.error || 'Could not check the payment status.',
            sessionId: checkoutFeedback.sessionId,
          })
          return
        }

        if (result.status === 'paid') {
          clearCart()
          setCheckoutFeedback({
            status: 'paid',
            message: `Payment confirmed for order ${result.orderId}. Thank you!`,
            orderId: result.orderId,
            totalCents: result.totalCents,
          })
          return
        }

        if (['failed', 'expired'].includes(result.status)) {
          setCheckoutFeedback({
            status: result.status,
            message:
              result.status === 'expired'
                ? 'This checkout session expired. Your cart is still here; you can try again.'
                : 'The payment did not complete. Your cart is still here; you can try again.',
            sessionId: checkoutFeedback.sessionId,
          })
          return
        }

        if (checkoutRetry < 5) {
          retryTimer = window.setTimeout(
            () => setCheckoutRetry((attempt) => attempt + 1),
            2000,
          )
        } else {
          setCheckoutFeedback({
            status: 'pending',
            message:
              'Payment is still being confirmed. You can check again in a moment.',
            sessionId: checkoutFeedback.sessionId,
          })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Could not check payment status:', error.message)
          setCheckoutFeedback({
            status: 'error',
            message: 'Could not check the payment status. Please try again.',
            sessionId: checkoutFeedback.sessionId,
          })
        }
      }
    }

    checkPayment()
    return () => {
      controller.abort()
      window.clearTimeout(retryTimer)
    }
  }, [checkoutFeedback, checkoutRetry, clearCart])

  async function startCheckout() {
    setCheckoutBusy(true)
    setCheckoutError('')

    try {
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ bookId, quantity }) => ({ bookId, quantity })),
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? 'Please sign in before checking out.'
            : result.error || 'Could not start checkout. Please try again.',
        )
      }

      const checkoutUrl = new URL(result.url)

      if (
        checkoutUrl.protocol !== 'https:' ||
        checkoutUrl.hostname !== 'checkout.stripe.com'
      ) {
        throw new Error('Stripe returned an unexpected checkout address.')
      }

      window.location.assign(checkoutUrl.href)
    } catch (error) {
      console.error('Could not start checkout:', error.message)
      setCheckoutError(error.message)
      setCheckoutBusy(false)
    }
  }

  function continueBrowsing() {
    const url = new URL(window.location.href)
    url.searchParams.delete('checkout')
    url.searchParams.delete('session_id')
    url.hash = 'shop'
    window.history.replaceState(window.history.state, '', url)
    setCheckoutFeedback(null)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {checkoutFeedback?.status === 'paid' && (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-[#F2E6D2] px-5 py-10 text-[#35251C]">
          <section
            role="status"
            aria-labelledby="checkout-success-title"
            className="w-full max-w-xl rounded-2xl border border-[#CDB99A] bg-[#FFF8EC] p-8 text-center shadow-xl sm:p-12"
          >
            <div
              aria-hidden="true"
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl font-bold text-green-800"
            >
              ✓
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-[#6B5746]">
              Boox Store
            </p>
            <h1
              id="checkout-success-title"
              className="mt-3 text-3xl font-bold sm:text-4xl"
            >
              Payment confirmed!
            </h1>
            <p className="mt-4 leading-relaxed text-[#6B5746]">
              Thank you for supporting our bookstore. Your order is safely
              recorded and your cart is clear.
            </p>
            <div className="mt-6 rounded-lg bg-[#F2E6D2] p-4">
              <p className="font-bold">Order #{checkoutFeedback.orderId}</p>
              <p className="mt-1 text-[#6B5746]">
                Paid {money.format(checkoutFeedback.totalCents / 100)}
              </p>
            </div>
            <button
              type="button"
              onClick={continueBrowsing}
              className="mt-8 rounded-lg bg-[#35251C] px-6 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35251C]"
            >
              Continue browsing
            </button>
          </section>
        </div>
      )}
      <section
        id="cart"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 text-[#35251C]"
      >
      <div className="rounded-xl border border-[#CDB99A] bg-[#E6D5B8] p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#6B5746]">
              Your shopping basket
            </p>
            <h2 className="text-3xl font-bold">Your cart</h2>
            <p className="mt-2 text-[#6B5746]" role="status">
              {itemCount === 1 ? '1 book in your cart' : `${itemCount} books in your cart`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-lg border border-[#80664F] px-4 py-2 font-bold hover:bg-[#F2E6D2]"
            >
              Empty cart
            </button>
          )}
        </div>

        {storageError && (
          <p role="alert" className="mt-4 text-red-800">
            {storageError}
          </p>
        )}

        {hasUnavailableBooks && (
          <p role="alert" className="mt-4 text-red-800">
            Some books in your saved cart are no longer in the catalogue. You can remove them below.
          </p>
        )}
        {booksError && items.length > 0 && (
          <p role="alert" className="mt-4 text-red-800">
            Book details could not be loaded. Your saved cart is still here; refresh to try again.
          </p>
        )}
        {checkoutFeedback && (
          <div
            role={checkoutFeedback.status === 'error' ? 'alert' : 'status'}
            className={`mt-4 rounded-lg p-4 ${
              checkoutFeedback.status === 'error'
                ? 'bg-red-100 text-red-900'
                : 'bg-[#FFF8EC]'
            }`}
          >
            <p>{checkoutFeedback.message}</p>
            {['pending', 'error', 'expired', 'failed'].includes(
              checkoutFeedback.status,
            ) && checkoutFeedback.sessionId && (
              <button
                type="button"
                onClick={() => {
                  setCheckoutFeedback((current) => ({
                    ...current,
                    status: 'checking',
                  }))
                  setCheckoutRetry(0)
                }}
                className="mt-2 font-bold underline underline-offset-4"
              >
                Check payment again
              </button>
            )}
          </div>
        )}

        {items.length === 0 ? (
          <p className="mt-6 rounded-lg bg-[#FFF8EC] p-4">
            Your cart is empty. Add a book from the collection to see it here.
          </p>
        ) : (
          <>
            <ul className="mt-6 divide-y divide-[#CDB99A]">
              {cartItems.map((item) => (
                <li
                  key={item.bookId}
                  className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  {item.book ? (
                    <>
                      <img
                        src={item.book.image}
                        alt=""
                        className="h-20 w-16 rounded bg-[#FFF8EC] object-contain p-1"
                      />
                      <div className="min-w-40 flex-1">
                        <h3 className="font-bold">{item.book.title}</h3>
                        <p className="text-sm text-[#6B5746]">
                          {money.format(item.book.price)} each
                        </p>
                      </div>
                      <QuantityStepper
                        quantity={item.quantity}
                        onQuantityChange={(quantity) =>
                          setItemQuantity(item.bookId, quantity)
                        }
                        label={item.book.title}
                      />
                      <p className="w-24 text-right font-bold">
                        {money.format(
                          (Math.round(item.book.price * 100) * item.quantity) /
                            100,
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="min-w-40 flex-1 font-bold">
                        {booksLoading
                          ? 'Loading book details...'
                          : booksError
                            ? 'Book details unavailable'
                            : `Unavailable book (ID ${item.bookId})`}
                      </p>
                      <span>Quantity: {item.quantity}</span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(item.bookId)}
                    className="rounded px-3 py-2 font-bold underline underline-offset-4 hover:bg-[#F2E6D2]"
                    aria-label={`Remove ${item.book?.title ?? 'unavailable book'} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[#CDB99A] pt-4 text-right">
              <p className="text-lg font-bold">
                Subtotal: {money.format(subtotalCents / 100)}
              </p>
              <p className="mt-1 text-sm text-[#6B5746]">
                Demo checkout uses USD and does not add shipping or tax.
              </p>
              <button
                type="button"
                onClick={startCheckout}
                disabled={!canCheckout}
                className="mt-4 rounded-lg bg-[#35251C] px-5 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {checkoutBusy
                  ? 'Opening secure checkout...'
                  : 'Proceed to secure checkout'}
              </button>
              {checkoutError && (
                <p role="alert" className="mt-3 text-red-800">
                  {checkoutError}
                  {checkoutError.includes('sign in') && (
                    <>
                      {' '}
                      <a
                        href="#account"
                        className="font-bold underline underline-offset-4"
                      >
                        Go to your account
                      </a>
                    </>
                  )}
                </p>
              )}
            </div>
          </>
        )}
      </div>
      </section>
    </>
  )
}
