# Boox Store

A fictional independent bookstore website built for the frontend practicum.

Assignment 2 rebuilds my original HTML and CSS site using React,
Vite and Tailwind CSS. The React application is inside the frontend folder.

## Features

- Responsive header and navigation
- Hero section with a decorative background image
- Catalogue of 200 books stored in one data file
- Fiction and nonfiction category filtering
- Staff pick badges
- Reusable book cards and a browser-saved shopping cart
- Signed-in Stripe Checkout (test mode until live keys are configured)
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

Install Node.js and npm. Configure the database and authentication values in
`server/.env` using `server/.env.example` as a template.

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