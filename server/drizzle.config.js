import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  // Which database system we use
  dialect: 'postgresql',

  // Where we described our tables
  schema: './src/db/schema.js',

  // Read the private connection URL from .env
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})