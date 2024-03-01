DROP TABLE IF EXISTS autos;
CREATE TABLE autos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  año TEXT NOT NULL,
  kms INTEGER NOT NULL,
  color TEXT NOT NULL,
  aire TEXT CHECK (aire IN ('si', 'no')),
  pasajeros INTEGER NOT NULL,
  man INTEGER CHECK (man IN (0, 1)),
  automatico INTEGER CHECK (automatico IN (0, 1)),
  created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);