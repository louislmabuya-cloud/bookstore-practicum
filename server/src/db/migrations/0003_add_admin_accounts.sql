ALTER TABLE "user"
  ADD COLUMN IF NOT EXISTS username text,
  ADD COLUMN IF NOT EXISTS display_username text,
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'customer';

CREATE UNIQUE INDEX IF NOT EXISTS user_username_unique
  ON "user" (username)
  WHERE username IS NOT NULL;

ALTER TABLE books
  ADD COLUMN IF NOT EXISTS is_available boolean NOT NULL DEFAULT true;
