const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});