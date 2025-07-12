// routes/reviews.js
const express = require('express');
const books = require('../books');
const authenticate = require('../middleware/auth');
const router = express.Router();

// Add or modify review
router.put("/:isbn", authenticate, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const username = req.user.username;

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    res.send("Review added/updated");
  } else {
    res.status(404).send("Book not found");
  }
});

// Delete review
router.delete("/:isbn", authenticate, (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  if (books[isbn]?.reviews[username]) {
    delete books[isbn].reviews[username];
    res.send("Review deleted");
  } else {
    res.status(404).send("Review not found");
  }
});
// Get reviews for a specific book by ISBN
router.get("/:isbn", (req, res) => {
  const { isbn } = req.params;

  if (books[isbn]) {
    res.json(books[isbn].reviews);
  } else {
    res.status(404).send("Book not found");
  }
});


module.exports = router;
