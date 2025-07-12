
const express = require('express');
const session = require('express-session');
const app = express();


const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');

app.use(express.json());

app.use(session({
  secret: "secret-key",
  resave: true,
  saveUninitialized: true
}));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
