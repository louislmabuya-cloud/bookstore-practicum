# Boox Store

A fictional independent bookstore website built for the frontend practicum.

Boox Store is a bookstore practicum built with React, Vite, Tailwind CSS,
Express, PostgreSQL, Drizzle ORM, Better Auth, and Stripe Checkout.

## Features

- Responsive header and navigation
- Hero section with a decorative background image
- Catalogue of 200 books stored in one data file
- Fiction and nonfiction category filtering
- Staff pick badges
- Selectable book details with descriptions, category, price, and author
- Reusable book cards and a browser-saved shopping cart
- Signed-in Stripe Checkout (test mode until live keys are configured)
- Private administrator area for managing the catalogue and creating admins
- Events, About and a three-column responsive footer

## Technologies

- JavaScript
- React
- Vite
- Tailwind CSS
- Express
- PostgreSQL and Drizzle ORM
- Better Auth
- Stripe Checkout

## Run locally

Install Node.js and npm. Configure the database, authentication, and Stripe
values in `server/.env` using `server/.env.example` as a template. Never commit
the `.env` file or share its secret values.

```bash
cd server
npm install
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL printed in the second terminal. To enable checkout,
follow the [checkout setup](#checkout-setup) steps below.

On Windows, use npm.cmd instead of npm if PowerShell blocks npm.ps1.

## Code checks

Run these commands from the frontend folder:

```bash
npm run lint
npm run build
```

## Checkout setup

The cart is saved in the current browser. Checkout requires a signed-in user
and sends the customer to Stripe-hosted Checkout. The server looks up book
prices in PostgreSQL, creates a pending order, and marks it paid only after a
valid Stripe webhook confirms the payment. This demo uses USD and does not add
shipping or tax. After payment is verified, a full-page confirmation stays on
screen until the customer chooses to continue browsing.

To run checkout locally:

1. Apply `server/src/db/migrations/0001_create_orders.sql` in the PostgreSQL
   database if the `orders` and `order_items` tables do not already exist.
2. Create a Stripe account and use its test-mode secret key. Put it and the
   webhook signing secret in `server/.env` as `STRIPE_SECRET_KEY` and
   `STRIPE_WEBHOOK_SECRET`. Do not commit or share these secrets.
3. Use Stripe CLI to forward test webhooks to
   `http://localhost:3000/api/stripe/webhook`, then copy its printed `whsec_...`
   value into `STRIPE_WEBHOOK_SECRET`.
4. In one terminal run `cd server` then `npm run dev`. In another run
   `cd frontend` then `npm run dev`.
5. Sign in, add a book, and use Stripe's test card
   `4242 4242 4242 4242` with any future expiry date and any CVC.

## Database migrations

Apply the SQL migration files once to each PostgreSQL database, in numeric
order. Use the provider's SQL editor, or from the `server` folder run:

```powershell
psql $env:DATABASE_URL -f src/db/migrations/0001_create_orders.sql
psql $env:DATABASE_URL -f src/db/migrations/0002_add_book_descriptions.sql
psql $env:DATABASE_URL -f src/db/migrations/0003_add_admin_accounts.sql
```

The third migration adds usernames and roles to the existing Better Auth user
table and an availability flag to books. A removed book is hidden from the
store without deleting its order history.

## Administrator access

The private admin page is not linked in the public navigation. The deployed
link works after this version has been deployed:

- Deployed: <https://bookstore-practicum.onrender.com/backroom/books>
- Local Vite development: <http://localhost:5173/backroom/books>

The initial administrator username is **Louis**. Admin login requires a
12-character-or-longer password you set privately. The password is not stored
in this README, the PDF guide, or source code. The private URL is only an
unlisted entry point; server-side role checks protect every admin API.

To create the first administrator, first apply migration
`0003_add_admin_accounts.sql`. Then, in `server/.env`, set:

```text
ADMIN_USERNAME=Louis
ADMIN_EMAIL=your email address
ADMIN_PASSWORD=your own strong password (12 or more characters)
```

Use the same `DATABASE_URL` as the website, then run this once from the
`server` folder:

```powershell
npm.cmd run admin:bootstrap
```

Remove `ADMIN_PASSWORD` from `.env` after the setup. The bootstrap command
creates the Louis account, or promotes the configured email's existing account
to admin. It never resets an existing account's password.

After signing in at the private page, an administrator can:

- add a book with its description, image, category, and price
- change catalogue details and prices
- remove a book from the storefront or restore it
- create another administrator with their own username, email, and strong
  password

Admin changes go through protected server routes. Deleting a book is a
soft-removal: it disappears from the storefront and checkout, while existing
order records stay intact.

To create another administrator, open **Create admin account** while signed in
to the admin area. Passwords must be at least 12 characters. Public signup
creates customer accounts only; it cannot grant administrator permissions.

See the [admin code and setup guide](./docs/admin-area-code-and-setup.pdf) for
the implementation walkthrough, or the
[editable admin guide](./docs/admin-area-code-and-setup.md).

## Book descriptions and details

Book cards open a details dialog with the book's description, author, category,
price, and catalogue selection badge. The description migration has been applied to the configured database and all
200 books have descriptions. If setting up a fresh database, apply the
migrations above and run `node src/db/seed.js` from the `server` folder to
populate or refresh descriptions. See
[the code explanation](./docs/book-details-code-explained.md) for how the
feature works.

See [the checkout guide](./docs/stripe-checkout-guide.pdf) for the full setup
and code walkthrough.

## Project organisation

- frontend/src/components: reusable interface components
- frontend/src/data/books.js: book catalogue
- frontend/src/App.jsx: page composition
- frontend/src/index.css: Tailwind import
- frontend/public/images: book covers and hero image

## React behaviour

BookGrid stores the selected category using useState.
It filters the books array and uses map to display the matching cards.

CartContext shares cart quantities between book cards, the header, and the
cart section. It saves only book IDs and quantities in browser localStorage;
prices are looked up from the server catalogue.

## Project scope

This is a bookstore practicum with a database-backed catalogue, accounts,
browser-saved cart, and Stripe Checkout integration. Checkout requires server
configuration and a working webhook; local test mode does not move real money.

Prices, opening hours and contact details are sample information.
Some book covers are generated SVG placeholders, not official covers.

## Live website

https://bookstore-practicum.onrender.com

Built with React, Tailwind CSS, Express, PostgreSQL,
Drizzle ORM and Better Auth. Hosted on Render with Neon.

Features include a database-backed book catalogue,
category filtering, pagination, signup, login and persistent sessions.