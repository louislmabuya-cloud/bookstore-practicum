import { useCart } from '../context/cart-context.js'

export default function BookCard({ book }) {
  const { addItem } = useCart()

  return (
    <article className="rounded-xl border border-b-4 border-[#CDB99A] bg-[#FFF8EC] p-5 shadow-md transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
      <div className="rounded-lg bg-[#F2E6D2] p-3">
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

      <p className="mt-1 text-sm text-[#6B5746]">
        {book.author}
      </p>

      <p className="mt-2 text-sm">
        {book.category}
      </p>

      {book.staffPick && (
        <span className="mt-2 inline-block rounded-full bg-[#35251C] px-3 py-1 text-xs font-bold text-[#F2E6D2]">
          Staff pick
        </span>
      )}

      <p className="mt-4 text-lg font-bold">
        ${book.price.toFixed(2)}
      </p>

      <button
        type="button"
        onClick={() => addItem(book.id)}
        className="mt-4 w-full rounded-lg bg-[#35251C] px-4 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35251C]"
      >
        Add to cart
      </button>
    </article>
  )
}