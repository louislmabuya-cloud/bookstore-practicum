import { useState } from 'react'
import { authClient } from '../lib/auth-client.js'

export default function AccountSection() {
  // Better Auth: ask the backend who is currently signed in
  const {
    data: session,
    isPending,
    error: sessionError,
  } = authClient.useSession()

  // React: remember the form values and its current mode
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Shared Tailwind styles for our form
  const inputClass =
    'mt-2 w-full rounded-lg border border-[#CDB99A] bg-[#FFF8EC] p-3'

  const buttonClass =
    'rounded-lg bg-[#35251C] px-5 py-3 font-bold text-[#FFF8EC] hover:bg-[#513A2A] disabled:opacity-50'

  async function handleSubmit(event) {
    // Keep the browser from reloading when the form submits
    event.preventDefault()
    setError('')
    setBusy(true)

    try {
      let result

      if (isSignup) {
        // Better Auth: create an account
        result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        })
      } else {
        // Better Auth: sign in to an existing account
        result = await authClient.signIn.email({
          email: email.trim(),
          password,
        })
      }

      if (result.error) {
        setError(result.error.message || 'Unable to continue. Please try again.')
      } else {
        setPassword('')
      }
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSignOut() {
    setError('')
    setBusy(true)

    try {
      const result = await authClient.signOut()

      if (result.error) {
        setError('Could not sign out. Please try again.')
      }
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  function changeMode() {
    setIsSignup(!isSignup)
    setError('')
    setPassword('')
  }

  return (
    <section
      id="account"
      className="mx-auto max-w-xl scroll-mt-24 px-5 py-12 text-[#35251C]"
    >
      <div className="rounded-xl border border-[#CDB99A] bg-[#E6D5B8] p-6 shadow-md">
        <h2 className="mb-5 text-2xl font-bold">Your Boox account</h2>

        {/* Wait until the backend has checked our session */}
        {isPending ? (
          <p role="status">Checking your session...</p>
        ) : sessionError ? (
          <p role="alert">
            Could not check your session. Please refresh to try again.
          </p>
        ) : session ? (
          // Signed-in view
          <div className="space-y-4">
            <p>
              Welcome, <strong>{session.user.name}</strong>!
            </p>
            <p className="break-words">{session.user.email}</p>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={busy}
              className={buttonClass}
            >
              {busy ? 'Please wait...' : 'Sign out'}
            </button>
          </div>
        ) : (
          // Signed-out view: signup or login form
          <form onSubmit={handleSubmit}>
            <fieldset disabled={busy} className="min-w-0 space-y-4">
              <legend className="mb-4 font-bold">
                {isSignup ? 'Create an account' : 'Sign in'}
              </legend>

              {isSignup && (
                <label className="block">
                  Name
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={inputClass}
                  />
                </label>
              )}

              <label className="block">
                Email
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="block">
                Password
                <input
                  type="password"
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  minLength={8}
                  maxLength={128}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                />
              </label>

              <button type="submit" className={buttonClass}>
                {busy ? 'Please wait...' : isSignup ? 'Create account' : 'Sign in'}
              </button>

              <button
                type="button"
                onClick={changeMode}
                className="block text-left underline underline-offset-4"
              >
                {isSignup
                  ? 'Already have an account? Sign in'
                  : 'New here? Create an account'}
              </button>
            </fieldset>
          </form>
        )}

        {error && (
          <p role="alert" className="mt-4 text-red-800">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}