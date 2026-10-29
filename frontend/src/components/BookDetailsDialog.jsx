import { useEffect, useRef } from 'react'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function BookDetailsDialog({
  book,
  open,
  onClose,
  onAddToCart,
  quantity,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (open && dialog && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog?.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close()
        }
      }}
      aria-labelledby={`book-details-title-${book.id}`}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-[#CDB99A] bg-[#FFF8EC] p-0 text-[#35251C] shadow-2xl backdrop:bg-[#35251C]/70"
    >
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <p className="text-sm font-bold uppercase tracking-widest text-[#6B5746]">
            Book details
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg border border-[#CDB99A] px-3 py-2 font-bold hover:bg-[#F2E6D2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35251C]"
            aria-label={`Close details for ${book.title}`}
          >
            Close
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8">
          <div className="rounded-xl bg-[#F2E6D2] p-4">
            <img
              src={book.image}
              alt={`${book.title} book cover`}
              className="mx-auto max-h-80 w-full object-contain"
            />
          </div>

          <div>
            <h2
              id={`book-details-title-${book.id}`}
              className="text-2xl font-bold sm:text-3xl"
            >
              {book.title}
            </h2>
            <p className="mt-2 text-lg text-[#6B5746]">by {book.author}</p>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
              <dt className="font-bold">Category</dt>
              <dd>{book.category}</dd>
              <dt className="font-bold">Price</dt>
              <dd>{money.format(book.price)}</dd>
              <dt className="font-bold">Selection</dt>
              <dd>
                {book.staffPick
                  ? 'Staff pick'
                  : book.featured
                    ? 'Featured book'
                    : 'Catalogue book'}
              </dd>
            </dl>

            <div className="mt-6 border-t border-[#CDB99A] pt-5">
              <h3 className="font-bold">About this book</h3>
              <p className="mt-2 leading-relaxed text-[#6B5746]">
                {book.description || 'A description is not available yet.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(book.id)}
              className="mt-6 w-full rounded-lg bg-[#35251C] px-5 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35251C]"
            >
              Add to cart <span aria-live="polite">(x{quantity})</span>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
