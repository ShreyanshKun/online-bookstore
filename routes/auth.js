// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerUser, authenticateUser } = require('../utils/users');

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (registerUser(username, password)) {
    res.send("User registered successfully");
  } else {
    res.status(409).send("User already exists");
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);
  if (user) {
    const token = jwt.sign({ username }, "jwt-secret", { expiresIn: "1h" });
    req.session.authorization = { accessToken: token, username };
    res.send("Login successful");
  } else {
    res.status(403).send("Invalid credentials");
  }
});

module.exports = router;
