import {
  pgTable,
  integer,
  text,
  numeric,
  boolean,
} from 'drizzle-orm/pg-core'

// Describe the books table and its columns
export const books = pgTable('books', {
  // Keep the IDs from our existing book data
  id: integer('id').primaryKey(),

  title: text('title').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),

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

// Make the authentication tables available through this schema file
export {
  user,
  session,
  account,
  verification,
} from './auth-schema.js'