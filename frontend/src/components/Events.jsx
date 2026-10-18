export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-6xl px-5 py-12">
      <h2 className="text-3xl font-bold">
        Events at Boox Store
      </h2>

      <p className="mt-4 text-[#6B5746]">
        Meet other readers and discover something new.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-b-4 border-[#CDB99A] bg-[#FFF8EC] p-6 shadow-md transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
          <p className="mb-4 inline-block rounded-full bg-[#35251C] px-3 py-1 text-xs font-bold text-[#F2E6D2]">
            Read and discuss
          </p>

          <h3 className="text-xl font-bold">
            Saturday book club
          </h3>

          <p className="mt-2 font-semibold">
            Saturdays at 10:00
          </p>

          <p className="mt-4 leading-relaxed text-[#6B5746]">
            Bring your current read and join a relaxed conversation
            about books.
          </p>
        </article>

        <article className="rounded-xl border border-b-4 border-[#CDB99A] bg-[#E6D5B8] p-6 shadow-md transition duration-200 hover:shadow-xl motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
          <p className="mb-4 inline-block rounded-full bg-[#35251C] px-3 py-1 text-xs font-bold text-[#F2E6D2]">
            For young readers
          </p>

          <h3 className="text-xl font-bold">
            Sunday story time
          </h3>

          <p className="mt-2 font-semibold">
            Sundays at 11:00
          </p>

          <p className="mt-4 leading-relaxed text-[#6B5746]">
            A morning of stories for young readers and their families.
          </p>
        </article>
      </div>
    </section>
  )
}