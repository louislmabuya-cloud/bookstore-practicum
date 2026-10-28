import assert from 'node:assert/strict'
import test from 'node:test'
import { parseCartItems } from './cart-validation.js'

test('accepts a list of unique books with positive whole-number quantities', () => {
  assert.deepEqual(
    parseCartItems({
      items: [
        { bookId: 2, quantity: 3 },
        { bookId: 8, quantity: 1 },
      ],
    }),
    [
      { bookId: 2, quantity: 3 },
      { bookId: 8, quantity: 1 },
    ],
  )
})

test('rejects an empty cart', () => {
  assert.throws(
    () => parseCartItems({ items: [] }),
    { message: 'Your cart is empty.', statusCode: 400 },
  )
})

test('rejects invalid quantities and duplicate books', () => {
  for (const items of [
    [{ bookId: 1, quantity: 0 }],
    [{ bookId: 1, quantity: 1.5 }],
    [{ bookId: 1, quantity: 1000000 }],
    [
      { bookId: 1, quantity: 1 },
      { bookId: 1, quantity: 2 },
    ],
    [null],
  ]) {
    assert.throws(() => parseCartItems({ items }), { statusCode: 400 })
  }
})

test('rejects carts with too many distinct books', () => {
  const items = Array.from({ length: 101 }, (_, index) => ({
    bookId: index + 1,
    quantity: 1,
  }))

  assert.throws(
    () => parseCartItems({ items }),
    { message: 'Your cart has too many different books.', statusCode: 400 },
  )
})
