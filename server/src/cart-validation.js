export function parseCartItems(body) {
  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    const error = new Error('Your cart is empty.')
    error.statusCode = 400
    throw error
  }

  if (body.items.length > 100) {
    const error = new Error('Your cart has too many different books.')
    error.statusCode = 400
    throw error
  }

  const seenBookIds = new Set()
  return body.items.map((item) => {
    if (
      !item ||
      typeof item !== 'object' ||
      !Number.isInteger(item.bookId) ||
      item.bookId < 1 ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 999999 ||
      seenBookIds.has(item.bookId)
    ) {
      const error = new Error('Your cart contains an invalid book or quantity.')
      error.statusCode = 400
      throw error
    }

    seenBookIds.add(item.bookId)
    return { bookId: item.bookId, quantity: item.quantity }
  })
}
