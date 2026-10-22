import { useEffect, useState } from 'react'
import BookCard from './BookCard.jsx'

export default function BookGrid() {
  // React remembers these three choices between renders.
  const [category, setCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [page, setPage] = useState(1)

  // Start empty, then store the books received from our API
const [books, setBooks] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
  const controller = new AbortController()

  async function loadBooks() {
    try {
      // Ask Express for the books
      const response = await fetch('/api/books', {
        signal: controller.signal,
      })

      // A server error response must be handled as a failure
      if (!response.ok) {
        throw new Error('Could not load books. Please refresh to try again.')
      }

      // Convert the JSON response into JavaScript data
      const data = await response.json()

      if (!controller.signal.aborted) {
        setBooks(data)
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setError('Could not load books. Please refresh to try again.')
        console.error('Book request failed:', error.message)
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }

  loadBooks()

  // Cancel an unfinished request if this component is removed
  return () => controller.abort()
}, [])

  const booksPerPage = 20

  // Start with either the entire catalogue or just the featured books.
  const availableBooks = showAll
    ? books
    : books.filter((book) => book.featured)

  // Apply the category filter to whichever collection is open.
  const filteredBooks = availableBooks.filter((book) => {
    return category === 'All' || book.category === category
  })

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage))
  const startIndex = (page - 1) * booksPerPage

  // slice returns only this page's books. It does not change the data file.
  const visibleBooks = showAll
    ? filteredBooks.slice(startIndex, startIndex + booksPerPage)
    : filteredBooks

  function changeView() {
    setShowAll(!showAll)
    setCategory('All')
    setPage(1)
  }

  function changeCategory(event) {
    setCategory(event.target.value)
    setPage(1)
  }

  function changePage(nextPage) {
    setPage(nextPage)
    // Bring the next set of books into view, especially on a phone.
    document.getElementById('shop')?.scrollIntoView({ behavior: 'instant' })
  }

  if (loading) {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-12 text-[#35251C]">
      <p role="status">Loading our books...</p>
    </section>
  )
}

if (error) {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-12 text-[#35251C]">
      <p role="alert">{error}</p>
    </section>
  )
}

  return (
    <section id="shop" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 text-[#35251C]">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#6B5746]">
            The Boox collection
          </p>
          <h2 className="text-3xl font-bold">
            {showAll ? 'Explore all books' : 'Featured books'}
          </h2>
          <p className="mt-3 max-w-xl text-[#6B5746]">
            {showAll
              ? 'Find your next read, one page at a time.'
              : 'A little inspiration for your next chapter. Start with these eight favourites.'}
          </p>
        </div>

        {/* This button switches between featured books and the full catalogue. */}
        <button
          type="button"
          onClick={changeView}
          className="rounded-lg bg-[#35251C] px-5 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35251C] sm:shrink-0"
        >
          {showAll ? 'Back to featured' : `Browse all ${books.length} books`}
        </button>
      </div>

      <div className="mb-8">
        <label htmlFor="category" className="mb-2 block font-bold">
          {showAll ? 'Filter the catalogue' : 'Filter featured books'}
        </label>
        <select
          id="category"
          value={category}
          onChange={changeCategory}
          className="w-full rounded-lg border border-[#CDB99A] bg-[#FFF8EC] p-3 sm:w-64"
        >
          <option value="All">All categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Nonfiction">Nonfiction</option>
        </select>
        <p className="mt-3 text-sm text-[#6B5746]" role="status">
          {filteredBooks.length === 0
            ? 'No books match this category.'
            : showAll
              ? `Showing ${startIndex + 1}–${startIndex + visibleBooks.length} of ${filteredBooks.length} books · Page ${page} of ${totalPages}`
              : `Showing ${visibleBooks.length} featured books`}
        </p>
      </div>

      {/* Mobile: one column. Larger screens: two, three, then four. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Pagination only appears when the full catalogue has multiple pages. */}
      {showAll && totalPages > 1 && (
        <nav aria-label="Book catalogue pages" className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="rounded-lg border border-[#CDB99A] bg-[#FFF8EC] px-4 py-3 font-bold enabled:hover:bg-[#E6D5B8] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <button
            type="button"
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className="rounded-lg border border-[#CDB99A] bg-[#FFF8EC] px-4 py-3 font-bold enabled:hover:bg-[#E6D5B8] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  )
}
