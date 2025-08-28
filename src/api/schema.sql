CREATE TABLE IF NOT EXISTS trips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  startOdometer INTEGER,
  startPhoto TEXT,
  endOdometer INTEGER,
  endPhoto TEXT,
  income REAL,
  createdAt TEXT
);

CREATE TABLE IF NOT EXISTS receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL,
  photo TEXT,
  createdAt TEXT
);
