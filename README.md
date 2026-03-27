# Assignment 2 — Books API

## 📌 Overview
This project is a RESTful API built using Node.js, Express, and SQLite.  
It allows users to perform CRUD (Create, Read, Update, Delete) operations on authors and books.

Books are related to authors using a foreign key relationship.

---

## ⚙️ Setup Instructions

1. Install dependencies:
   npm install

2. Seed the database:
   node seed.js

3. Start the server:
   npm run dev

Server runs at:
http://localhost:3000

---

## 📚 API Endpoints

### AUTHORS

#### GET /api/authors
Returns all authors  
**Response 200**
```json
[
  { "id": 1, "name": "J.R.R. Tolkien", "bio": "Fantasy author" }
]
