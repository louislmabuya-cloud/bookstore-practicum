import { useState } from 'react'
import QuantityStepper from './QuantityStepper.jsx'

export default function BookCard({ book }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <article className="rounded-xl border border-b-4 border-stone-300 bg-white p-5 shadow-md transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
      <div className="rounded-lg bg-[#faf7f0] p-3">
        <img
          src={book.image}
          alt={book.title + ' book cover'}
          className="h-64 w-full object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="mt-4 text-lg font-bold">
        {book.title}
      </h3>

      <p className="mt-1 text-sm text-stone-600">
        {book.author}
      </p>

      <p className="mt-2 text-sm">
        {book.category}
      </p>

      {book.staffPick && (
        <span className="mt-2 inline-block rounded-full bg-[#171717] px-3 py-1 text-xs font-bold text-[#faf7f0]">
          Staff pick
        </span>
      )}

      <p className="mt-4 text-lg font-bold">
        ${book.price.toFixed(2)}
      </p>

      <QuantityStepper
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </article>
  )
}