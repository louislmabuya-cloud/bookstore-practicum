import { useEffect, useMemo, useState } from 'react'
import { authClient } from '../lib/auth-client.js'

const emptyBook = {
  title: '',
  author: '',
  category: 'Fiction',
  description: '',
  price: '',
  image: '',
  staffPick: false,
  featured: false,
}

const inputClass =
  'mt-1 w-full rounded-lg border border-[#CDB99A] bg-white p-3'
const buttonClass =
  'rounded-lg bg-[#35251C] px-4 py-2 font-bold text-white hover:bg-[#513A2A] disabled:opacity-50'

function BookForm({ initialBook, onSave, onCancel, busy }) {
  const [book, setBook] = useState(initialBook)

  function changeField(event) {
    const { name, value, type, checked } = event.target
    setBook((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function submit(event) {
    event.preventDefault()
    onSave({ ...book, price: Number(book.price) })
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl bg-[#F2E6D2] p-5">
      <label className="block font-bold">
        Title
        <input
          name="title"
          value={book.title}
          onChange={changeField}
          required
          maxLength={200}
          className={inputClass}
        />
      </label>
      <label className="block font-bold">
        Author
        <input
          name="author"
          value={book.author}
          onChange={changeField}
          required
          maxLength={200}
          className={inputClass}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block font-bold">
          Category
          <select
            name="category"
            value={book.category}
            onChange={changeField}
            className={inputClass}
          >
            <option>Fiction</option>
            <option>Nonfiction</option>
          </select>
        </label>
        <label className="block font-bold">
          Price in USD
          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={book.price}
            onChange={changeField}
            required
            className={inputClass}
          />
        </label>
      </div>
      <label className="block font-bold">
        Description
        <textarea
          name="description"
          value={book.description}
          onChange={changeField}
          required
          maxLength={5000}
          rows={4}
          className={inputClass}
        />
      </label>
      <label className="block font-bold">
        Cover image path or HTTPS URL
        <input
          name="image"
          value={book.image}
          onChange={changeField}
          required
          maxLength={500}
          placeholder="/images/my-book.svg"
          className={inputClass}
        />
      </label>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            name="staffPick"
            type="checkbox"
            checked={book.staffPick}
            onChange={changeField}
          />
          Staff pick
        </label>
        <label className="flex items-center gap-2">
          <input
            name="featured"
            type="checkbox"
            checked={book.featured}
            onChange={changeField}
          />
          Show as featured
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? 'Saving...' : initialBook.id ? 'Save changes' : 'Add book'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#80664F] px-4 py-2 font-bold"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default function AdminPage() {
  const {
    data: session,
    isPending: sessionPending,
    error: sessionError,
  } = authClient.useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [busy, setBusy] = useState(false)
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [editingBook, setEditingBook] = useState(null)
  const [showNewBook, setShowNewBook] = useState(false)
  const [adminFormOpen, setAdminFormOpen] = useState(false)
  const [adminForm, setAdminForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const isAdmin = session?.user?.role === 'admin'

  useEffect(() => {
    if (!isAdmin) return undefined

    const controller = new AbortController()

    async function loadBooks() {
      try {
        const response = await fetch('/api/admin/books', {
          signal: controller.signal,
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Could not load books.')
        }

        setBooks(result)
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(error.message)
        }
      }
    }

    loadBooks()
    return () => controller.abort()
  }, [isAdmin])

  const visibleBooks = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return books

    return books.filter((book) =>
      `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query),
    )
  }, [books, search])

  async function submitLogin(event) {
    event.preventDefault()
    setBusy(true)
    setLoginError('')

    try {
      const result = await authClient.signIn.username({
        username: username.trim(),
        password,
      })

      if (result.error) {
        setLoginError(result.error.message || 'Sign-in failed. Check your details.')
      } else {
        setPassword('')
      }
    } catch (error) {
      setLoginError(error.message || 'Could not connect to the server.')
    } finally {
      setBusy(false)
    }
  }

  async function refreshBooks() {
    const response = await fetch('/api/admin/books')
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Could not refresh books.')
    setBooks(result)
  }

  async function saveBook(book) {
    setBusy(true)
    setMessage('')
    setErrorMessage('')

    try {
      const response = await fetch(
        editingBook
          ? `/api/admin/books/${editingBook.id}`
          : '/api/admin/books',
        {
          method: editingBook ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
        },
      )
      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Could not save book.')

      await refreshBooks()
      setEditingBook(null)
      setShowNewBook(false)
      setMessage(editingBook ? 'Book details saved.' : 'Book added to the catalogue.')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  async function setBookAvailability(book, isAvailable) {
    setBusy(true)
    setMessage('')
    setErrorMessage('')

    try {
      const response = await fetch(`/api/admin/books/${book.id}`, {
        method: isAvailable ? 'PATCH' : 'DELETE',
        headers: isAvailable ? { 'Content-Type': 'application/json' } : {},
        body: isAvailable ? JSON.stringify({ isAvailable: true }) : undefined,
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not update book.')
      await refreshBooks()
      setMessage(isAvailable ? 'Book returned to the store.' : 'Book removed from the store.')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  async function createAdmin(event) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    setErrorMessage('')

    try {
      const response = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminForm),
      })
      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Could not create admin.')

      setAdminForm({ name: '', username: '', email: '', password: '' })
      setAdminFormOpen(false)
      setMessage(`Admin account ${result.username} created.`)
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    try {
      const result = await authClient.signOut()
      if (result.error) setErrorMessage('Could not sign out. Please try again.')
    } catch (error) {
      setErrorMessage(error.message || 'Could not sign out.')
    } finally {
      setBusy(false)
    }
  }

  if (sessionPending) {
    return <main className="mx-auto max-w-3xl p-8 text-[#35251C]">Checking sign-in...</main>
  }

  if (sessionError) {
    return <main role="alert" className="mx-auto max-w-3xl p-8 text-red-900">Could not check your session. Refresh to try again.</main>
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#F2E6D2] px-5 py-16 text-[#35251C]">
        <section className="mx-auto max-w-md rounded-2xl border border-[#CDB99A] bg-[#FFF8EC] p-7 shadow-lg">
          <p className="text-sm font-bold uppercase tracking-widest text-[#6B5746]">
            Boox Store private area
          </p>
          <h1 className="mt-2 text-3xl font-bold">Administrator sign in</h1>
          <p className="mt-3 text-[#6B5746]">
            Sign in with an administrator username and password.
          </p>
          <form onSubmit={submitLogin} className="mt-6 space-y-4">
            <label className="block font-bold">
              Username
              <input
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block font-bold">
              Password
              <input
                type="password"
                autoComplete="current-password"
                minLength={12}
                maxLength={128}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
              />
            </label>
            <button type="submit" disabled={busy} className={buttonClass}>
              {busy ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          {loginError && <p role="alert" className="mt-4 text-red-900">{loginError}</p>}
          <a href="/" className="mt-6 block underline underline-offset-4">
            Return to the bookstore
          </a>
        </section>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#F2E6D2] px-5 py-16 text-[#35251C]">
        <section className="mx-auto max-w-xl rounded-2xl bg-[#FFF8EC] p-8">
          <h1 className="text-2xl font-bold">Administrator access required</h1>
          <p className="mt-3">This signed-in account does not have admin permissions.</p>
          <button type="button" onClick={signOut} className={`${buttonClass} mt-5`}>
            Sign out
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F2E6D2] px-5 py-10 text-[#35251C]">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#6B5746]">
              Boox Store private area
            </p>
            <h1 className="mt-1 text-3xl font-bold">Book administration</h1>
            <p className="mt-2">Signed in as {session.user.displayUsername || session.user.name}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="rounded-lg border border-[#80664F] px-4 py-2 font-bold">
              View store
            </a>
            <button type="button" onClick={signOut} disabled={busy} className={buttonClass}>
              Sign out
            </button>
          </div>
        </header>

        {(message || errorMessage) && (
          <p
            role={errorMessage ? 'alert' : 'status'}
            className={`mt-6 rounded-lg p-4 ${errorMessage ? 'bg-red-100 text-red-900' : 'bg-green-100 text-green-900'}`}
          >
            {errorMessage || message}
          </p>
        )}

        <section className="mt-8 rounded-2xl border border-[#CDB99A] bg-[#FFF8EC] p-5 shadow">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Books</h2>
              <p className="mt-1 text-[#6B5746]">
                Add books, update details or prices, and remove or restore catalogue entries.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingBook(null)
                setShowNewBook(!showNewBook)
              }}
              className={buttonClass}
            >
              {showNewBook ? 'Close new book form' : 'Add a book'}
            </button>
          </div>

          {showNewBook && (
            <div className="mt-5">
              <h3 className="mb-3 text-xl font-bold">New book</h3>
              <BookForm
                key="new-book"
                initialBook={emptyBook}
                onSave={saveBook}
                onCancel={() => setShowNewBook(false)}
                busy={busy}
              />
            </div>
          )}

          <label className="mt-6 block max-w-xl font-bold">
            Search catalogue
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, author, or category"
              className={inputClass}
            />
          </label>

          <ul className="mt-5 space-y-3">
            {visibleBooks.map((book) => (
              <li key={book.id} className="rounded-xl border border-[#CDB99A] p-4">
                {editingBook?.id === book.id ? (
                  <>
                    <h3 className="mb-3 text-xl font-bold">Edit {book.title}</h3>
                    <BookForm
                      key={book.id}
                      initialBook={{ ...book, price: String(book.price) }}
                      onSave={saveBook}
                      onCancel={() => setEditingBook(null)}
                      busy={busy}
                    />
                  </>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold">{book.title}</h3>
                      <p className="text-sm text-[#6B5746]">
                        {book.author} · {book.category} · ${Number(book.price).toFixed(2)}
                      </p>
                      {!book.isAvailable && (
                        <span className="mt-1 inline-block text-sm font-bold text-red-800">
                          Not shown in store
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewBook(false)
                          setEditingBook(book)
                        }}
                        className="rounded-lg border border-[#80664F] px-3 py-2 font-bold"
                      >
                        Edit
                      </button>
                      {book.isAvailable ? (
                        <button
                          type="button"
                          onClick={() => setBookAvailability(book, false)}
                          disabled={busy}
                          className="rounded-lg border border-red-800 px-3 py-2 font-bold text-red-900"
                        >
                          Remove from store
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setBookAvailability(book, true)}
                          disabled={busy}
                          className="rounded-lg border border-green-800 px-3 py-2 font-bold text-green-900"
                        >
                          Restore to store
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {visibleBooks.length === 0 && (
            <p className="mt-5 text-[#6B5746]">No books match that search.</p>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-[#CDB99A] bg-[#FFF8EC] p-5 shadow">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Administrator accounts</h2>
              <p className="mt-1 text-[#6B5746]">
                Only a signed-in administrator can create another administrator.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAdminFormOpen(!adminFormOpen)}
              className={buttonClass}
            >
              {adminFormOpen ? 'Close form' : 'Create admin account'}
            </button>
          </div>
          {adminFormOpen && (
            <form onSubmit={createAdmin} className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="font-bold">
                Name
                <input
                  required
                  value={adminForm.name}
                  onChange={(event) =>
                    setAdminForm({ ...adminForm, name: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <label className="font-bold">
                Username
                <input
                  required
                  minLength={3}
                  maxLength={30}
                  value={adminForm.username}
                  onChange={(event) =>
                    setAdminForm({ ...adminForm, username: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <label className="font-bold">
                Email
                <input
                  type="email"
                  required
                  value={adminForm.email}
                  onChange={(event) =>
                    setAdminForm({ ...adminForm, email: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <label className="font-bold">
                Temporary password (12 characters minimum)
                <input
                  type="password"
                  autoComplete="new-password"
                  minLength={12}
                  maxLength={128}
                  required
                  value={adminForm.password}
                  onChange={(event) =>
                    setAdminForm({ ...adminForm, password: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" disabled={busy} className={buttonClass}>
                  {busy ? 'Creating...' : 'Create administrator'}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
