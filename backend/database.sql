CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  due_date DATE,
  priority VARCHAR(10) NOT NULL DEFAULT 'media'
    CHECK (priority IN ('baixa', 'media', 'alta')),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
