# Book details: what changed and how it works

## What a shopper sees

Selecting a book's cover, title, or **View book details** opens a dialog with:

- the cover, title, and author
- the category and current catalogue price
- whether the book is a staff pick or featured title
- an original short description
- an **Add to cart** button showing the current quantity

The dialog can be closed with its Close button, by pressing Escape, or by
selecting the shaded area outside it. The existing card-level Add to cart
button still works as before.

## Where the code lives

- `frontend/src/data/books.js` adds descriptions for the 20 existing titles and
  creates original descriptions for the fictional sample catalogue.
- `frontend/src/components/BookCard.jsx` makes a book's cover and title open the
  details dialog, while keeping the existing cart button.
- `frontend/src/components/BookDetailsDialog.jsx` displays the book information
  in an accessible native HTML dialog.
- `server/src/db/schema.js` adds a required `description` field to the Drizzle
  definition of the books table.
- `server/src/db/migrations/0002_add_book_descriptions.sql` adds the column and
  fills descriptions for existing database rows before requiring the value.
- `server/src/db/seed.js` updates descriptions on existing rows when the book
  catalogue is seeded again.

## How the information travels

1. The seed data in `frontend/src/data/books.js` contains each book's
   description.
2. The seed script writes the descriptions into PostgreSQL.
3. The server's existing `/api/books` endpoint returns the book records,
   including their descriptions.
4. `BookGrid` passes each book to `BookCard`.
5. `BookCard` passes the selected book to `BookDetailsDialog`, which displays
   the details without navigating away from the catalogue.

Descriptions are original catalogue copy. The app does not have fields for
ISBN, publication date, page count, or format, so those details are not shown
or invented.

## Updating the database

Apply the new migration once to each database, then run the seed script from
the server folder so existing rows receive the full descriptions from the
catalogue:

```powershell
cd server
psql $env:DATABASE_URL -f src/db/migrations/0002_add_book_descriptions.sql
node src/db/seed.js
```

If `psql` is not installed, run the SQL migration using the database
provider's SQL editor, then run `node src/db/seed.js` from `server`.
