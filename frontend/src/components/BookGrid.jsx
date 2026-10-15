import { books } from '../data/books.js'
import BookCard from './BookCard.jsx'

export default function BookGrid() {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-12">
      <h2 className="mb-8 text-3xl font-bold">
        Explore our books
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}