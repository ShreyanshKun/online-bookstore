const express = require('express');
const router = express.Router();
const books = require('../books'); // your book data

// ✅ 1. Async + Callback: Get all books
const getAllBooks = async (callback) => {
  try {
    
    const data = books;
    callback(null, data);
  } catch (err) {
    callback(err, null);
  }
};

router.get('/', (req, res) => {
  getAllBooks((err, result) => {
    if (err) return res.status(500).send("Error retrieving books");
    res.json(result);
  });
});

// ✅ 2. Promises: Get book by ISBN
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) resolve(book);
    else reject("Book not found");
  });
};

router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  getBookByISBN(isbn)
    .then(book => res.json(book))
    .catch(err => res.status(404).send(err));
});

// ✅ 3. Promises: Search by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const matchingBooks = [];

  new Promise((resolve, reject) => {
    for (const key in books) {
      if (books[key].author.toLowerCase().includes(author)) {
        matchingBooks.push(books[key]);
      }
    }
    resolve(matchingBooks);
  }).then(result => {
    res.json(result.length ? result : { message: "No books found" });
  }).catch(() => res.status(500).send("Error searching books"));
});

// ✅ 4. Promises: Search by title
router.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const matchingBooks = [];

  new Promise((resolve, reject) => {
    for (const key in books) {
      if (books[key].title.toLowerCase().includes(title)) {
        matchingBooks.push(books[key]);
      }
    }
    resolve(matchingBooks);
  }).then(result => {
    res.json(result.length ? result : { message: "No books found" });
  }).catch(() => res.status(500).send("Error searching books"));
});
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  console.log("Looking for ISBN:", isbn);
  getBookByISBN(isbn)
    .then(book => res.json(book))
    .catch(err => res.status(404).send(err));
});


module.exports = router;
