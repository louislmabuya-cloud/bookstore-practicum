export default function Footer() {
  return (
    <footer className="bg-[#35251C] px-5 py-12 text-[#F2E6D2]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">
              Boox Store
            </h2>

            <p className="mt-4 leading-relaxed text-[#E6D5B8]">
              An independent bookstore for curious readers.
              Explore our books and join our reading community.
            </p>

            <a
              href="#hero"
              className="mt-4 inline-block underline underline-offset-4 hover:text-[#FFF8EC]"
            >
              Back to top
            </a>
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Contact us
            </h2>

            <p className="mt-4 leading-relaxed text-[#E6D5B8]">
              Questions about a book or an upcoming event?
            </p>

            <a
              href="mailto:hello@booxstore.example"
              className="mt-4 inline-block break-all underline underline-offset-4 hover:text-[#FFF8EC]"
            >
              hello@booxstore.example
            </a>
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Opening hours
            </h2>

            <ul className="mt-4 space-y-3 text-[#E6D5B8]">
              <li>Monday to Friday: 09:00 to 18:00</li>
              <li>Saturday: 09:00 to 16:00</li>
              <li>Sunday: 10:00 to 14:00</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-[#80664F] pt-6 text-sm text-[#CDB99A]">
          © 2026 Boox Store. All rights reserved.
        </p>
      </div>
    </footer>
  )
}