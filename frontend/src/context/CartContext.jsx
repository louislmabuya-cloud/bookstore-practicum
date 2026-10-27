import { useState } from 'react'
import { CartContext } from './cart-context.js'

const CART_STORAGE_KEY = 'boox-store-cart'

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
      return { items: [], storageError: '' }
    }

    const parsedCart = JSON.parse(storedCart)

    if (!Array.isArray(parsedCart)) {
      throw new Error('Stored cart is not a list.')
    }

    const seenBookIds = new Set()
    const items = parsedCart.map((item) => {
      if (
        !Number.isInteger(item.bookId) ||
        item.bookId < 1 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        seenBookIds.has(item.bookId)
      ) {
        throw new Error('Stored cart contains an invalid item.')
      }

      seenBookIds.add(item.bookId)
      return { bookId: item.bookId, quantity: item.quantity }
    })

    return { items, storageError: '' }
  } catch (error) {
    console.error('Could not restore the saved cart:', error)
    return {
      items: [],
      storageError: 'Your saved cart could not be read in this browser.',
    }
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart)
  const { items, storageError } = cart

  function saveItems(nextItems) {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems))
      setCart({ items: nextItems, storageError: '' })
    } catch (error) {
      console.error('Could not save the cart:', error)
      setCart({
        items: nextItems,
        storageError: 'Your cart could not be saved in this browser.',
      })
    }
  }

  function addItem(bookId) {
    const existingItem = items.find((item) => item.bookId === bookId)
    const nextItems = existingItem
      ? items.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...items, { bookId, quantity: 1 }]

    saveItems(nextItems)
  }

  function setItemQuantity(bookId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new RangeError('Cart quantity must be a non-negative whole number.')
    }

    const nextItems =
      quantity === 0
        ? items.filter((item) => item.bookId !== bookId)
        : items.map((item) =>
            item.bookId === bookId ? { ...item, quantity } : item,
          )

    saveItems(nextItems)
  }

  function removeItem(bookId) {
    saveItems(items.filter((item) => item.bookId !== bookId))
  }

  function clearCart() {
    saveItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        storageError,
        addItem,
        setItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
