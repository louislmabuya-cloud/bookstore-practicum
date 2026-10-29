import { useState } from 'react'
import { useCart } from '../context/cart-context.js'
import BookDetailsDialog from './BookDetailsDialog.jsx'

export default function BookCard({ book }) {
  const { items, addItem } = useCart()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const quantity = items.find((item) => item.bookId === book.id)?.quantity ?? 0

  return (
    <>
      <article className="rounded-xl border border-b-4 border-[#CDB99A] bg-[#FFF8EC] p-5 shadow-md transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
        <button
          type="button"
          onClick={() => setDetailsOpen(true)}
          aria-label={`View details for ${book.title}`}
          className="block w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35251C]"
        >
          <span className="block rounded-lg bg-[#F2E6D2] p-3">
            <img
              src={book.image}
              alt=""
              className="h-64 w-full object-contain"
              loading="lazy"
            />
          </span>

          <span className="mt-4 block text-lg font-bold">{book.title}</span>
          <span className="mt-1 block text-sm text-[#6B5746]">
            {book.author}
          </span>
          <span className="mt-2 block text-sm">{book.category}</span>
          <span className="mt-3 block text-sm font-bold underline underline-offset-4">
            View book details
          </span>
        </button>

        {book.staffPick && (
          <span className="mt-3 inline-block rounded-full bg-[#35251C] px-3 py-1 text-xs font-bold text-[#F2E6D2]">
            Staff pick
          </span>
        )}

        <p className="mt-4 text-lg font-bold">${book.price.toFixed(2)}</p>

        <button
          type="button"
          onClick={() => addItem(book.id)}
          className="mt-4 w-full rounded-lg bg-[#35251C] px-4 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35251C]"
        >
          Add to cart <span aria-live="polite">(x{quantity})</span>
        </button>
      </article>

      <BookDetailsDialog
        book={book}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onAddToCart={addItem}
        quantity={quantity}
      />
    </>
  )
}