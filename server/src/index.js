// Load the Express package we installed.
import express from 'express'

// Create our Express application.
const app = express()

// Use the hosting provider's port, or 3000 on our laptop.
const PORT = Number(process.env.PORT || 3000)

// Respond when someone requests /api/health.
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Boox Store server is running',
  })
})

// Start listening for requests.
app.listen(PORT, () => {
  console.log(`Boox Store API running at http://localhost:${PORT}`)
})