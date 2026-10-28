CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  user_id text NOT NULL REFERENCES "user"(id),
  status text NOT NULL DEFAULT 'pending',
  total_cents integer NOT NULL,
  stripe_session_id text UNIQUE,
  created_at timestamp NOT NULL DEFAULT now(),
  paid_at timestamp
);

CREATE TABLE IF NOT EXISTS order_items (
  id serial PRIMARY KEY,
  order_id integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  book_id integer NOT NULL REFERENCES books(id),
  quantity integer NOT NULL,
  unit_price_cents integer NOT NULL
);
