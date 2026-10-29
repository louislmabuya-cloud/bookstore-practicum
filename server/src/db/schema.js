import {
  pgTable,
  serial,
  integer,
  text,
  numeric,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'

// We need the user table so each order can point at its buyer
import { user } from './auth-schema.js'

// Describe the books table and its columns
export const books = pgTable('books', {
  // Keep the IDs from our existing book data
  id: integer('id').primaryKey(),

  title: text('title').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),

  // Store prices with two decimal places
  price: numeric('price', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),

  // Store the image path, rather than the image itself
  image: text('image').notNull(),

  staffPick: boolean('staff_pick').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
})

// One row per purchase
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),

  // Which signed-in user placed this order
  userId: text('user_id')
    .notNull()
    .references(() => user.id),

  // Starts as 'pending'. Only the Stripe webhook may change it to 'paid'
  status: text('status').notNull().default('pending'),

  // Total in cents (1499 means $14.99), because Stripe counts in cents
  totalCents: integer('total_cents').notNull(),

  // Filled in after we create the Stripe Checkout Session
  stripeSessionId: text('stripe_session_id').unique(),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  // Set by the webhook at the moment payment is confirmed
  paidAt: timestamp('paid_at'),
})

// One row per book inside an order
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),

  // Which order this line belongs to. Deleting an order deletes its items
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),

  // Which book was bought
  bookId: integer('book_id')
    .notNull()
    .references(() => books.id),

  quantity: integer('quantity').notNull(),

  // The price in cents at the moment of purchase
  unitPriceCents: integer('unit_price_cents').notNull(),
})

// Make the authentication tables available through this schema file
export {
  user,
  session,
  account,
  verification,
} from './auth-schema.js'