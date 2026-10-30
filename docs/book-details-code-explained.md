# Book descriptions and detail window: where to find everything

This guide explains the book-detail feature added to Boox Store and what was
done in the database. It is written for someone new to the project.

## What you can do on the website

1. Open the bookstore and scroll to the book collection.
2. Select a book's cover, title, or **View book details**.
3. A window opens with its cover, title, author, category, price, catalogue
   label, description, and an **Add to cart** button.
4. Close the window with **Close**, press Escape, or select the shaded area
   outside the window.

The original **Add to cart** button on each book card still works too.

## Find the changed files in VS Code

Open the Explorer panel in VS Code and expand these folders:

| What you want to understand | File in the project | What it does |
|---|---|---|
| Book data and descriptions | `frontend/src/data/books.js` | Holds the catalogue. The first 20 books have individual descriptions; descriptions for the sample catalogue are generated from each book's title and category. |
| What opens the detail window | `frontend/src/components/BookCard.jsx` | Makes the book cover/title clickable and opens the detail window. It also keeps the original cart button. |
| What the detail window looks like | `frontend/src/components/BookDetailsDialog.jsx` | Shows the selected book's details and cart button. |
| What fields a book has in the database | `server/src/db/schema.js` | Defines the PostgreSQL `books` table for the server. It now includes a required `description` field. |
| How an older database gets the new field | `server/src/db/migrations/0002_add_book_descriptions.sql` | Adds the column, fills any empty descriptions, and then makes the column required. |
| How the catalogue is copied into the database | `server/src/db/seed.js` | Reads the shared catalogue from `frontend/src/data/books.js`, inserts new books, and updates descriptions for existing books. |
| How the browser receives books | `server/src/index.js` | Its existing `/api/books` endpoint reads the database and returns the book records, including descriptions. |
| How the change is explained in the project | `README.md` | Includes a short feature note and links back to this guide. |

## How the code pieces work together

Think of the catalogue as a shared list:

1. `frontend/src/data/books.js` supplies each book's details and description.
2. `server/src/db/seed.js` copies that list into PostgreSQL. If a book ID is
   already in the database, it refreshes that book's description.
3. `server/src/db/schema.js` tells the server that every database book has a
   description.
4. The `/api/books` endpoint in `server/src/index.js` sends the database books
   to the website as JSON.
5. `BookGrid` gives each book to `BookCard`.
6. `BookCard` passes the selected book to `BookDetailsDialog`, which displays
   it in a window without leaving the collection.

The detail window is a native HTML `<dialog>`. That gives it built-in keyboard
support, including closing with Escape. React remembers whether the window is
open and which book's details it should display.

The project does not store ISBN, publication date, page count, or format, so
the window does not claim to show those details.

## What was done in the database

The description migration has been applied to the configured database. The
seed script then reported that it updated 200 catalogue records. A follow-up
database check confirmed:

- 200 books total
- 200 books with descriptions
- no missing or blank descriptions

The live `/api/books` endpoint also returned books with their descriptions.
You do not need to run the migration or seed command again for this database.

For reference, the safe-to-repeat commands are run from PowerShell like this:

```powershell
cd C:\Users\louis\Documents\bookstore-practicum\server
node src\test-db.js
node src\db\seed.js
```

`test-db.js` checks that the database responds. The seed command refreshes
descriptions from the project catalogue. The migration is a one-time schema
change and is stored at
`server/src/db/migrations/0002_add_book_descriptions.sql`.

## If you want to change a description later

1. Open `frontend/src/data/books.js`.
2. For one of the first 20 books, edit its entry in `bookDescriptions` near the
   top of the file.
3. For sample books, edit the `describeBook` rules, or add that book's ID to
   `bookDescriptions` if it needs its own specific wording.
4. Run `node src\db\seed.js` from the `server` folder to update descriptions in
   the database.
5. Refresh the website.
