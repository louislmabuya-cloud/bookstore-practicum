import { db, client } from './index.js'
import { books } from './schema.js'
import { books as bookData } from '../data/books.js'

try {
  // Insert the book objects into the books table
  const insertedBooks = await db
    .insert(books)
    .values(bookData)
    .onConflictDoNothing({ target: books.id })
    .returning({ id: books.id })

  console.log('Seeding finished!')
  console.log('Books in the seed file:', bookData.length)
  console.log('New books inserted:', insertedBooks.length)
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