import assert from 'node:assert/strict'
import test from 'node:test'
import { validateBook } from './admin-validation.js'

const validBook = {
  title: 'The Example Book',
  author: 'A. Writer',
  category: 'Fiction',
  description: 'An example description for a sample book.',
  price: '12.50',
  image: '/images/example-book.svg',
  staffPick: false,
  featured: true,
}

test('accepts a complete book and normalizes its price to cents', () => {
  assert.deepEqual(validateBook(validBook), {
    value: {
      ...validBook,
      price: 12.5,
    },
  })
})

test('trims text fields and rejects invalid price precision', () => {
  assert.equal(validateBook({ ...validBook, title: '  Book  ' }).value.title, 'Book')
  assert.match(validateBook({ ...validBook, price: '2.345' }).error, /two decimals/)
  assert.match(validateBook({ ...validBook, price: '-1' }).error, /greater than zero/)
})

test('rejects invalid category and unsafe image URL', () => {
  assert.match(validateBook({ ...validBook, category: 'Other' }).error, /Choose Fiction/)
  assert.match(validateBook({ ...validBook, image: 'http://example.test/cover.jpg' }).error, /secure HTTPS/)
})
