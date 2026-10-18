import { useState } from 'react'
import { books } from '../data/books.js'
import BookCard from './BookCard.jsx'

export default function BookGrid() {
  const [category, setCategory] = useState('All')

  const filteredBooks = books.filter((book) => {
    return category === 'All' || book.category === category
  })

  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-12">
      <h2 className="mb-8 text-3xl font-bold">
        Explore our books
      </h2>

      <div className="mb-8">
        <label htmlFor="category" className="mb-2 block font-bold">
          Browse by category
        </label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded border border-[#CDB99A] bg-[#FFF8EC] p-3 sm:w-64"
        >
          <option value="All">All books</option>
          <option value="Fiction">Fiction</option>
          <option value="Nonfiction">Nonfiction</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}