import { createAuthClient } from 'better-auth/react'
import { usernameClient } from 'better-auth/client/plugins'

// Send authentication requests through the current website.
// Our Vite proxy forwards /api requests to Express.
export const authClient = createAuthClient({
  baseURL: window.location.origin,
  plugins: [usernameClient()],
})