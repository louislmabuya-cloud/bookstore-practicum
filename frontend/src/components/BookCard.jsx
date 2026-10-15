export default function BookCard({ book }) {
  return (
    <article className="rounded-lg border border-[#ded8ce] bg-white p-4">
      <img
        src={book.image}
        alt={book.title + ' book cover'}
        className="h-64 w-full object-contain"
        loading="lazy"
      />

      <h3 className="mt-4 text-lg font-bold">
        {book.title}
      </h3>

      <p className="mt-1 text-sm text-[#555555]">
        {book.author}
      </p>

      <p className="mt-2 text-sm">
        {book.category}
      </p>

      {book.staffPick && (
        <span className="mt-2 inline-block rounded-full bg-[#faf7f0] px-3 py-1 text-xs font-bold">
          Staff pick
        </span>
      )}

      <p className="mt-4 text-lg font-bold">
        ${book.price.toFixed(2)}
      </p>
    </article>
  )
}