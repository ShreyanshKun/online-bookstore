// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.session.authorization?.accessToken;
  if (!token) return res.status(403).send("Not logged in");

  jwt.verify(token, "jwt-secret", (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

module.exports = authenticate;
