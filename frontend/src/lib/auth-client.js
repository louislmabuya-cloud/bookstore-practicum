import { createAuthClient } from 'better-auth/react'

// Send authentication requests through the current website.
// Our Vite proxy forwards /api requests to Express.
export const authClient = createAuthClient({
  baseURL: window.location.origin,
})