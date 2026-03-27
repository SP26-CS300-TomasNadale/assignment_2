const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all books
router.get('/', (req, res) => {
  const books = db.prepare('SELECT * FROM books').all();
  res.json(books);
});

// GET one book
router.get('/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

// POST book
router.post('/', (req, res) => {
  const { title, year, author_id } = req.body;

  if (!title || !author_id) {
    return res.status(400).json({ error: 'title and author_id required' });
  }

  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(author_id);
  if (!author) {
    return res.status(400).json({ error: 'Invalid author_id' });
  }

  const result = db.prepare(
    'INSERT INTO books (title, year, author_id) VALUES (?, ?, ?)'
  ).run(title, year, author_id);

  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT book
router.put('/:id', (req, res) => {
  const { title, year } = req.body;

  const result = db.prepare(
    'UPDATE books SET title = ?, year = ? WHERE id = ?'
  ).run(title, year, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json({ message: 'Updated' });
});

// DELETE book
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(204).send();
});

module.exports = router;