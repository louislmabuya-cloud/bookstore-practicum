import { db, client } from './index.js'
import { books } from './schema.js'
import { books as bookData } from '../data/books.js'
import { sql } from 'drizzle-orm'

try {
  // Insert new books and refresh the descriptions of books already in the database
  const upsertedBooks = await db
    .insert(books)
    .values(bookData)
    .onConflictDoUpdate({
      target: books.id,
      set: { description: sql`excluded.description` },
    })
    .returning({ id: books.id })

  console.log('Seeding finished!')
  console.log('Books in the seed file:', bookData.length)
  console.log('Books inserted or updated:', upsertedBooks.length)
} catch (error) {
  console.error('Seeding failed.')

  // Report the error code without printing connection credentials
  console.error(
    'Error code:',
    error.cause?.code ?? error.code ?? 'Unknown'
  )

  process.exitCode = 1
} finally {
  // Close this script's connection when finished
  await client.end()
}