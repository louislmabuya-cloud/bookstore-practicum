// dotenv: load our private environment settings
import 'dotenv/config'

// Better Auth: create the authentication system
import { betterAuth } from 'better-auth'

// Adapter: connect Better Auth to Drizzle
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { username } from 'better-auth/plugins'

// Our own database connection and table descriptions
import { db } from './db/index.js'
import * as schema from './db/schema.js'

export const auth = betterAuth({
  appName: 'Boox Store',

  // Read settings from server/.env
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.RENDER_EXTERNAL_URL || process.env.BETTER_AUTH_URL,

  // Use our PostgreSQL database through Drizzle
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  // Allow people to register and log in with email and password
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'customer',
        input: false,
      },
    },
  },

  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
    }),
  ],

  // Allow authentication requests from our frontend
  trustedOrigins: [
  process.env.RENDER_EXTERNAL_URL || process.env.CLIENT_URL,
],
})