export default function Header() {
  return (
    <header className="bg-[#254d3e] p-5 text-[#faf7f0]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="#hero" className="text-2xl font-bold">
          Boox Store
        </a>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-4">
            <li>
              <a href="#hero" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="#events" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}