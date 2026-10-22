// Load the Express package we installed.
import express from 'express'
import { db } from './db/index.js'
import { books } from './db/schema.js'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'

// Create our Express application.
const app = express()

// Express sends authentication requests to Better Auth
app.all('/api/auth/*splat', toNodeHandler(auth))

// Use the hosting provider's port, or 3000 on our laptop.
const PORT = Number(process.env.PORT || 3000)

// Respond when someone requests /api/health.
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Boox Store server is running',
  })
})

// Return all books stored in the database
app.get('/api/books', async (req, res) => {
  try {
    // Read the books, ordered by their IDs
    const allBooks = await db
      .select()
      .from(books)
      .orderBy(books.id)

    // Send the resulting array to the browser as JSON
    res.json(allBooks)
  } catch (error) {
    console.error(
      'Could not fetch books:',
      error.cause?.code ?? error.code ?? 'Unknown'
    )

    // Tell the browser that the request failed
    res.status(500).json({
      error: 'Could not load books. Please try again.',
    })
  }
})

// Start listening for requests.
app.listen(PORT, () => {
  console.log(`Boox Store API running at http://localhost:${PORT}`)
})