export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-6xl px-5 py-12">
      <h2 className="text-3xl font-bold">
        Events at Boox Store
      </h2>

      <p className="mt-4 text-stone-600">
        Meet other readers and discover something new.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="rounded-lg border border-stone-300 bg-white p-6">
          <h3 className="text-xl font-bold">
            Saturday book club
          </h3>

          <p className="mt-2 font-semibold">
            Saturdays at 10:00
          </p>

          <p className="mt-4 leading-relaxed text-stone-600">
            Bring your current read and join a relaxed conversation
            about books.
          </p>
        </article>

        <article className="rounded-lg border border-stone-300 bg-white p-6">
          <h3 className="text-xl font-bold">
            Sunday story time
          </h3>

          <p className="mt-2 font-semibold">
            Sundays at 11:00
          </p>

          <p className="mt-4 leading-relaxed text-stone-600">
            A morning of stories for young readers and their families.
          </p>
        </article>
      </div>
    </section>
  )
}