const db = require('./db');

db.prepare('DELETE FROM books').run();
db.prepare('DELETE FROM authors').run();

const addAuthor = db.prepare('INSERT INTO authors (name, bio) VALUES (?, ?)');

const a1 = addAuthor.run('J.R.R. Tolkien', 'Fantasy author');
const a2 = addAuthor.run('George Orwell', 'Dystopian author');

const addBook = db.prepare('INSERT INTO books (title, year, author_id) VALUES (?, ?, ?)');

addBook.run('The Hobbit', 1937, a1.lastInsertRowid);
addBook.run('1984', 1949, a2.lastInsertRowid);

console.log("Database seeded!");