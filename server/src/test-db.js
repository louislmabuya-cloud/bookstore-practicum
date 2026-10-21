import { client } from './db/index.js'

try {
  // Ask the database to return the number 1.
  const result = await client`SELECT 1 AS connected`

  console.log('Database connection successful!')
  console.log('Database returned:', result[0].connected)
} catch (error) {
  console.error('Database connection failed.')
  console.error('Error code:', error.code ?? 'Unknown')
  process.exitCode = 1
} finally {
  // Close the connection after this test finishes.
  await client.end()
}