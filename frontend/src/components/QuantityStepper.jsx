export default function QuantityStepper({ quantity, onQuantityChange }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        type="button"
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity === 0}
        aria-label="Decrease quantity"
        className="rounded border px-3 py-1 hover:bg-[#E6D5B8] disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="min-w-6 text-center">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onQuantityChange(quantity + 1)}
        aria-label="Increase quantity"
        className="rounded border px-3 py-1 hover:bg-[#E6D5B8]"
      >
        +
      </button>
    </div>
  )
}