export default function Hero() {
  return (
    <section id="hero" className="px-5 py-16 text-center">
      <p className="mb-4 text-sm font-bold">
        Welcome to Boox Store
      </p>

      <h1 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">
        Find your next favourite book
      </h1>

      <p className="mx-auto mt-6 max-w-xl leading-relaxed">
        Explore fiction, nonfiction and staff picks.
        Find a new story or join us for our next book club.
      </p>

      <a
        href="#shop"
        className="mt-8 inline-block rounded bg-black px-6 py-3 text-white hover:bg-[#333333]"
      >
        Browse books
      </a>
    </section>
  )
}