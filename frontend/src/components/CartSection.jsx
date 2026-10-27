import QuantityStepper from './QuantityStepper.jsx'
import { useCart } from '../context/cart-context.js'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function CartSection({ books, booksLoading, booksError }) {
  const {
    items,
    itemCount,
    storageError,
    setItemQuantity,
    removeItem,
    clearCart,
  } = useCart()

  const cartItems = items.map((item) => ({
    ...item,
    book: books.find((book) => book.id === item.bookId),
  }))
  const subtotalCents = cartItems.reduce(
    (total, item) =>
      total +
      (item.book ? Math.round(item.book.price * 100) * item.quantity : 0),
    0,
  )
  const hasUnavailableBooks =
    !booksLoading &&
    !booksError &&
    cartItems.some((item) => !item.book)

  return (
    <section
      id="cart"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 text-[#35251C]"
    >
      <div className="rounded-xl border border-[#CDB99A] bg-[#E6D5B8] p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#6B5746]">
              Your shopping basket
            </p>
            <h2 className="text-3xl font-bold">Your cart</h2>
            <p className="mt-2 text-[#6B5746]" role="status">
              {itemCount === 1 ? '1 book in your cart' : `${itemCount} books in your cart`}
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-lg border border-[#80664F] px-4 py-2 font-bold hover:bg-[#F2E6D2]"
            >
              Empty cart
            </button>
          )}
        </div>

        {storageError && (
          <p role="alert" className="mt-4 text-red-800">
            {storageError}
          </p>
        )}

        {hasUnavailableBooks && (
          <p role="alert" className="mt-4 text-red-800">
            Some books in your saved cart are no longer in the catalogue. You can remove them below.
          </p>
        )}
        {booksError && items.length > 0 && (
          <p role="alert" className="mt-4 text-red-800">
            Book details could not be loaded. Your saved cart is still here; refresh to try again.
          </p>
        )}

        {items.length === 0 ? (
          <p className="mt-6 rounded-lg bg-[#FFF8EC] p-4">
            Your cart is empty. Add a book from the collection to see it here.
          </p>
        ) : (
          <>
            <ul className="mt-6 divide-y divide-[#CDB99A]">
              {cartItems.map((item) => (
                <li
                  key={item.bookId}
                  className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  {item.book ? (
                    <>
                      <img
                        src={item.book.image}
                        alt=""
                        className="h-20 w-16 rounded bg-[#FFF8EC] object-contain p-1"
                      />
                      <div className="min-w-40 flex-1">
                        <h3 className="font-bold">{item.book.title}</h3>
                        <p className="text-sm text-[#6B5746]">
                          {money.format(item.book.price)} each
                        </p>
                      </div>
                      <QuantityStepper
                        quantity={item.quantity}
                        onQuantityChange={(quantity) =>
                          setItemQuantity(item.bookId, quantity)
                        }
                        label={item.book.title}
                      />
                      <p className="w-24 text-right font-bold">
                        {money.format(
                          (Math.round(item.book.price * 100) * item.quantity) /
                            100,
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="min-w-40 flex-1 font-bold">
                        {booksLoading
                          ? 'Loading book details...'
                          : booksError
                            ? 'Book details unavailable'
                            : `Unavailable book (ID ${item.bookId})`}
                      </p>
                      <span>Quantity: {item.quantity}</span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(item.bookId)}
                    className="rounded px-3 py-2 font-bold underline underline-offset-4 hover:bg-[#F2E6D2]"
                    aria-label={`Remove ${item.book?.title ?? 'unavailable book'} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[#CDB99A] pt-4 text-right">
              <p className="text-lg font-bold">
                Subtotal: {money.format(subtotalCents / 100)}
              </p>
              <p className="mt-1 text-sm text-[#6B5746]">
                Shipping and payment will be handled during checkout.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
