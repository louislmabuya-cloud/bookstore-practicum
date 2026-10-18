export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-5 py-20 text-center sm:py-28"
    >
      {/* Background image. Its centre is already blurred. */}
      <img
        src="/images/library-entrance.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* A light cream overlay helps the black text stand out. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#faf7f0]/20"
      />

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
        className="mt-8 inline-block rounded bg-black px-6 py-3 text-white hover:bg-slate-600 hover:scale-105 transition-all duration-500"
      >
        Browse books
      </a>
    </section>
  )
}