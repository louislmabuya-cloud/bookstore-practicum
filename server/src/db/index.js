// Load the settings from our .env file.
import 'dotenv/config'
import postgres from 'postgres'

// Read the private database connection string.
const connectionString = process.env.DATABASE_URL

// Stop with a clear message if the setting is missing.
if (!connectionString) {
  throw new Error('DATABASE_URL is missing from server/.env')
}

// Prepare a database client that other files can use.
export const client = postgres(connectionString, {
  prepare: false,
})