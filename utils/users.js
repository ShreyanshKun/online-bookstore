// utils/users.js
let users = [];

const registerUser = (username, password) => {
  if (users.find(user => user.username === username)) return false;
  users.push({ username, password });
  return true;
};

const authenticateUser = (username, password) => {
  return users.find(user => user.username === username && user.password === password);
};

module.exports = { registerUser, authenticateUser };
