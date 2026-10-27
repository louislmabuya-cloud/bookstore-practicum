import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import BookGrid from './components/BookGrid.jsx'
import CartSection from './components/CartSection.jsx'
import Events from './components/Events.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import AccountSection from './components/AccountSection.jsx'
import { CartProvider } from './context/CartContext.jsx'

export default function App() {
  const [books, setBooks] = useState([])
  const [booksLoading, setBooksLoading] = useState(true)
  const [booksError, setBooksError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadBooks() {
      try {
        const response = await fetch('/api/books', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Could not load books. Please refresh to try again.')
        }

        const data = await response.json()

        if (!controller.signal.aborted) {
          setBooks(data)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setBooksError('Could not load books. Please refresh to try again.')
          console.error('Book request failed:', error.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setBooksLoading(false)
        }
      }
    }

    loadBooks()

    return () => controller.abort()
  }, [])

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F2E6D2] text-[#30241C]">
        <Header />

        <main>
          <Hero />
          <AccountSection />
          <BookGrid
            books={books}
            loading={booksLoading}
            error={booksError}
          />
          <CartSection
            books={books}
            booksLoading={booksLoading}
            booksError={booksError}
          />
          <Events />
          <About />
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}