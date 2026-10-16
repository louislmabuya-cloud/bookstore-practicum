import { useState } from 'react'

export default function Header() {
  // MOBILE: remembers whether the hamburger menu is open.
  // false means it starts closed.
  const [menuOpen, setMenuOpen] = useState(false)

  // Closes the mobile menu after a navigation link is clicked.
  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    // SHARED: background, spacing and text colours for all screens.
    <header className="bg-[#171717] p-5 text-[#faf7f0]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">

        {/* SHARED: the logo appears on mobile and desktop. */}
        <a
          href="#hero"
          onClick={closeMenu}
          aria-label="Boox Store home"
          className="text-2xl font-bold"
        >
          B<span className="rounded-full bg-white px-1 text-black">oo</span>x Store
        </a>

        {/*
          MOBILE ONLY: hamburger button.
          sm:hidden hides this button at widths of 640px and above.
          Clicking it switches menuOpen between true and false.
        */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          className="flex h-11 w-11 items-center justify-center rounded border border-stone-600 hover:bg-stone-800 sm:hidden"
        >
          {/* MOBILE: show a cross when open, or a hamburger when closed. */}
          <span aria-hidden="true" className="text-2xl">
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>

        {/*
          SHARED NAVIGATION: one set of links for both layouts.

          MOBILE:
          menuOpen chooses 'block' (visible) or 'hidden'.
          w-full makes the navigation take a full row below the logo.

          DESKTOP / WIDER SCREENS:
          sm:block always displays the navigation.
          sm:w-auto makes it only as wide as its content,
          allowing it to sit beside the logo.
        */}
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`${menuOpen ? 'block' : 'hidden'} w-full sm:block sm:w-auto`}
        >
          {/*
            MOBILE: flex-col stacks the links vertically.
            DESKTOP: sm:flex-row places the links side by side.
            sm:gap-4 increases the space between links on wider screens.
          */}
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-4">

            {/* SHARED: Home link. */}
            <li>
              <a
                href="#hero"
                onClick={closeMenu}
                className="block py-2 hover:underline"
              >
                Home
              </a>
            </li>

            {/* SHARED: Books link. */}
            <li>
              <a
                href="#shop"
                onClick={closeMenu}
                className="block py-2 hover:underline"
              >
                Books
              </a>
            </li>

            {/* SHARED: Events link. */}
            <li>
              <a
                href="#events"
                onClick={closeMenu}
                className="block py-2 hover:underline"
              >
                Events
              </a>
            </li>

            {/* SHARED: About link. */}
            <li>
              <a
                href="#about"
                onClick={closeMenu}
                className="block py-2 hover:underline"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}