import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { auth } from './auth.js'
import { db, client } from './db/index.js'
import { user } from './db/schema.js'

const username = process.env.ADMIN_USERNAME || 'Louis'
const normalizedUsername = username.toLowerCase()
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD

function getDatabaseErrorCode(error) {
  return error.code || error.cause?.code || error.cause?.cause?.code
}

try {
  if (!email || !password) {
    throw new Error(
      'Set ADMIN_EMAIL and ADMIN_PASSWORD privately in server/.env before bootstrapping.',
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('ADMIN_EMAIL must be a valid email address.')
  }

  if (!/^[a-zA-Z0-9_.]{3,30}$/.test(username)) {
    throw new Error('ADMIN_USERNAME must be 3–30 letters, numbers, dots, or underscores.')
  }

  if (password.length < 12 || password.length > 128) {
    throw new Error('ADMIN_PASSWORD must be between 12 and 128 characters.')
  }

  const columns = await client`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = current_schema()
      AND table_name = 'user'
  `
  const availableColumns = new Set(columns.map((column) => column.column_name))
  const requiredColumns = [
    'id',
    'name',
    'email',
    'username',
    'display_username',
    'role',
  ]
  const missingColumns = requiredColumns.filter(
    (column) => !availableColumns.has(column),
  )

  if (missingColumns.length > 0) {
    throw new Error(
      `The connected database is missing admin columns: ${missingColumns.join(', ')}. Apply server/src/db/migrations/0003_add_admin_accounts.sql to the same database configured by DATABASE_URL, then retry.`,
    )
  }

  const [existingEmail] = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1)
  const [existingUsername] = await db
    .select()
    .from(user)
    .where(eq(user.username, normalizedUsername))
    .limit(1)

  if (existingUsername && existingUsername.id !== existingEmail?.id) {
    throw new Error('That admin username is already assigned to another account.')
  }

  let adminUser = existingEmail

  if (!adminUser) {
    const response = await auth.api.signUpEmail({
      body: {
        name: username,
        username,
        displayUsername: username,
        email,
        password,
      },
      asResponse: true,
    })
    const body = await response.json()

    if (!response.ok || !body.user?.id) {
      throw new Error(
        body.message || body.error || 'Better Auth could not create the initial admin.',
      )
    }

    adminUser = { id: body.user.id, username: body.user.username }
  } else if (adminUser.username && adminUser.username !== normalizedUsername) {
    throw new Error(
      'The configured admin email already belongs to an account with another username.',
    )
  }

  await db
    .update(user)
    .set({
      name: username,
      username: normalizedUsername,
      displayUsername: username,
      role: 'admin',
    })
    .where(eq(user.id, adminUser.id))

  console.log(`Administrator account ${username} is ready.`)
  console.log('Remove ADMIN_PASSWORD from server/.env after this one-time setup.')
} catch (error) {
  const code = getDatabaseErrorCode(error)

  if (code === 'ETIMEDOUT' || code === 'ENETUNREACH') {
    console.error(
      'Admin bootstrap failed: the configured database could not be reached. Check the database status, network access, and DATABASE_URL, then retry.',
    )
  } else if (code === 'ECONNREFUSED') {
    console.error(
      'Admin bootstrap failed: the database refused the connection. Check the database status and DATABASE_URL, then retry.',
    )
  } else {
    console.error(
      'Admin bootstrap failed:',
      error.message || 'An unexpected database error occurred.',
    )
  }

  process.exitCode = 1
} finally {
  await client.end()
}
