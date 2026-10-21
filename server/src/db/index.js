import 'dotenv/config'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is missing from server/.env')
}

// The connection that communicates with PostgreSQL
export const client = postgres(connectionString, {
  prepare: false,
})

// Let Drizzle use that connection
export const db = drizzle({ client })