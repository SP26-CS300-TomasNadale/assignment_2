const Database = require('better-sqlite3');
const db = new Database('./app.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bio TEXT
  );

  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER,
    author_id INTEGER,
    FOREIGN KEY(author_id) REFERENCES authors(id)
  );
`);

module.exports = db;