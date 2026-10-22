# Boox Store

A fictional independent bookstore website built for the frontend practicum.

Assignment 2 rebuilds my original HTML and CSS site using React,
Vite and Tailwind CSS. The React application is inside the frontend folder.

## Features

- Responsive header and navigation
- Hero section with a decorative background image
- Catalogue of 20 books stored in one data file
- Fiction and nonfiction category filtering
- Staff pick badges
- Reusable book cards and controlled quantity steppers
- Events, About and a three-column responsive footer

## Technologies

- JavaScript
- React
- Vite
- Tailwind CSS

## Run locally

Install Node.js and npm, then open a terminal in the repository folder.

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed in the terminal.

On Windows, use npm.cmd instead of npm if PowerShell blocks npm.ps1.

## Code checks

Run these commands from the frontend folder:

```bash
npm run lint
npm run build
```

## Project organisation

- frontend/src/components: reusable interface components
- frontend/src/data/books.js: book catalogue
- frontend/src/App.jsx: page composition
- frontend/src/index.css: Tailwind import
- frontend/public/images: book covers and hero image

## React behaviour

BookGrid stores the selected category using useState.
It filters the books array and uses map to display the matching cards.

Each BookCard stores its own quantity using useState.
QuantityStepper receives that quantity and an update function through
props, making it a controlled component.

Quantities reset when the page reloads or when a book is filtered out
and its card is later recreated.

## Project scope

This is a frontend demonstration with hardcoded data.
It does not include checkout, payments or a backend.

Prices, opening hours and contact details are sample information.
Some book covers are generated SVG placeholders, not official covers.

## Live website

https://bookstore-practicum.onrender.com

Built with React, Tailwind CSS, Express, PostgreSQL,
Drizzle ORM and Better Auth. Hosted on Render with Neon.

Features include a database-backed book catalogue,
category filtering, pagination, signup, login and persistent sessions.