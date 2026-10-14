# Boox Store

An independent bookstore website built for the frontend practicum.

## Current progress

Assignment 1 is implemented using HTML and CSS:

- Responsive header and navigation
- Hero section
- Book grid with fiction, nonfiction and staff picks
- Events and About sections
- Footer with contact information and opening hours
- Card hover effects and keyboard focus styles

The current site is a static demonstration.
Prices, contact details and opening hours are sample content.

## Run the current version

Open index.html in a browser, or open the project in
VS Code and use Live Server.

## Assignment 2 plan

Rebuild the existing site with React and Tailwind,
keeping the Boox Store content and visual design.

- [ ] Set up Vite and React in this repository
- [ ] Connect Tailwind
- [ ] Create Header, Hero, main content and Footer components
- [ ] Move book information into one array of objects
- [ ] Render book cards from that data
- [ ] Add a category filter using useState
- [ ] Add a reusable controlled quantity stepper to each book
- [ ] Rewrite responsive styling with Tailwind classes
- [ ] Remove the old stylesheet once its styling is replaced
- [ ] Check navigation, keyboard controls and screen sizes

## Planned interactions

The book filter will show All, Fiction, Nonfiction or Staff picks.

Each book will have a quantity stepper with plus and minus buttons.
The parent component will store the quantities in state.
The stepper will receive its value and an onChange callback.

## Assignment 2 status

Planning complete. React and Tailwind implementation pending.