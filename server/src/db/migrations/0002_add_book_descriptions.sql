ALTER TABLE books
  ADD COLUMN IF NOT EXISTS description text;

UPDATE books
SET description = CASE
  WHEN category = 'Fiction' THEN
    'A fiction book by ' || author || '. Discover ' || title || ' in this imaginative story.'
  WHEN category = 'Nonfiction' THEN
    'A nonfiction book by ' || author || '. Explore ideas in ' || title || '.'
  ELSE
    'A book titled ' || title || ' by ' || author || '.'
END
WHERE description IS NULL OR btrim(description) = '';

ALTER TABLE books
  ALTER COLUMN description SET NOT NULL;
