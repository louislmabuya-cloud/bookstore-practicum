import express from 'express'
import { asc, eq, sql } from 'drizzle-orm'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from './auth.js'
import { db } from './db/index.js'
import { books, user } from './db/schema.js'
import { validateBook } from './admin-validation.js'

const router = express.Router()

async function requireAdmin(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (session?.user?.role !== 'admin') {
      return res.status(session?.user ? 403 : 401).json({
        error: session?.user
          ? 'Administrator access is required.'
          : 'Please sign in as an administrator.',
      })
    }

    req.admin = session.user
    return next()
  } catch (error) {
    console.error('Could not verify administrator session:', error.message)
    return res.status(500).json({ error: 'Could not verify your session.' })
  }
}

router.use(express.json({ limit: '32kb' }), requireAdmin)

router.get('/books', async (req, res) => {
  try {
    const allBooks = await db.select().from(books).orderBy(asc(books.id))
    return res.json(allBooks)
  } catch (error) {
    console.error('Could not load admin book list:', error.message)
    return res.status(500).json({ error: 'Could not load the book list.' })
  }
})

router.post('/books', async (req, res) => {
  const result = validateBook(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  try {
    const [createdBook] = await db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(872310)`)
      const [next] = await tx
        .select({ id: sql`COALESCE(MAX(${books.id}), 0) + 1` })
        .from(books)

      return tx
        .insert(books)
        .values({ id: Number(next.id), ...result.value })
        .returning()
    })

    return res.status(201).json(createdBook)
  } catch (error) {
    console.error('Could not add book:', error.message)
    return res.status(500).json({ error: 'Could not add the book.' })
  }
})

router.patch('/books/:bookId', async (req, res) => {
  const bookId = Number(req.params.bookId)

  if (!Number.isSafeInteger(bookId) || bookId < 1) {
    return res.status(400).json({ error: 'Invalid book ID.' })
  }

  if (typeof req.body?.isAvailable === 'boolean') {
    try {
      const [updatedBook] = await db
        .update(books)
        .set({ isAvailable: req.body.isAvailable })
        .where(eq(books.id, bookId))
        .returning()

      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found.' })
      }

      return res.json(updatedBook)
    } catch (error) {
      console.error(`Could not update availability for book ${bookId}:`, error.message)
      return res.status(500).json({ error: 'Could not update book availability.' })
    }
  }

  const result = validateBook(req.body)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  try {
    const [updatedBook] = await db
      .update(books)
      .set(result.value)
      .where(eq(books.id, bookId))
      .returning()

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found.' })
    }

    return res.json(updatedBook)
  } catch (error) {
    console.error(`Could not update book ${bookId}:`, error.message)
    return res.status(500).json({ error: 'Could not update the book.' })
  }
})

router.delete('/books/:bookId', async (req, res) => {
  const bookId = Number(req.params.bookId)

  if (!Number.isSafeInteger(bookId) || bookId < 1) {
    return res.status(400).json({ error: 'Invalid book ID.' })
  }

  try {
    const [updatedBook] = await db
      .update(books)
      .set({ isAvailable: false })
      .where(eq(books.id, bookId))
      .returning({ id: books.id })

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found.' })
    }

    return res.json({ id: updatedBook.id, isAvailable: false })
  } catch (error) {
    console.error(`Could not remove book ${bookId}:`, error.message)
    return res.status(500).json({ error: 'Could not remove the book.' })
  }
})

router.post('/admins', async (req, res) => {
  const { name, username, email, password } = req.body ?? {}
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanUsername = typeof username === 'string' ? username.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

  if (!cleanName || cleanName.length > 100) {
    return res.status(400).json({ error: 'Enter a name of 100 characters or fewer.' })
  }

  if (!/^[a-zA-Z0-9_.]{3,30}$/.test(cleanUsername)) {
    return res.status(400).json({
      error: 'Username must be 3–30 letters, numbers, dots, or underscores.',
    })
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    cleanEmail.length > 254
  ) {
    return res.status(400).json({ error: 'Enter a valid email address.' })
  }

  if (typeof password !== 'string' || password.length < 12 || password.length > 128) {
    return res.status(400).json({
      error: 'Admin passwords must be between 12 and 128 characters.',
    })
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name: cleanName,
        username: cleanUsername,
        displayUsername: cleanName,
        email: cleanEmail,
        password,
      },
      headers: fromNodeHeaders(req.headers),
      asResponse: true,
    })
    const body = await response.json()

    if (!response.ok || !body.user?.id) {
      return res.status(response.status || 400).json({
        error: body.message || body.error || 'Could not create the admin account.',
      })
    }

    await db
      .update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, body.user.id))

    return res.status(201).json({
      id: body.user.id,
      username: body.user.username,
      message: 'Administrator account created.',
    })
  } catch (error) {
    console.error('Could not create admin account:', error.message)
    return res.status(500).json({ error: 'Could not create the admin account.' })
  }
})

export default router
