const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all authors
router.get('/', (req, res) => {
  const authors = db.prepare('SELECT * FROM authors').all();
  res.json(authors);
});

// GET one author
router.get('/:id', (req, res) => {
  const author = db.prepare('SELECT * FROM authors WHERE id = ?').get(req.params.id);

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.json(author);
});

// POST author
router.post('/', (req, res) => {
  const { name, bio } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const result = db.prepare(
    'INSERT INTO authors (name, bio) VALUES (?, ?)'
  ).run(name, bio);

  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT author
router.put('/:id', (req, res) => {
  const { name, bio } = req.body;

  const result = db.prepare(
    'UPDATE authors SET name = ?, bio = ? WHERE id = ?'
  ).run(name, bio, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.json({ message: 'Updated' });
});

// DELETE author
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM authors WHERE id = ?').run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.status(204).send();
});

// GET books by author
router.get('/:id/books', (req, res) => {
  const books = db.prepare(
    'SELECT * FROM books WHERE author_id = ?'
  ).all(req.params.id);

  res.json(books);
});

module.exports = router;