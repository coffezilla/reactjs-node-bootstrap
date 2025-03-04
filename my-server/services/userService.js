const db = require("../database");

// Function to fetch all users
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// Function to create a new user
const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, email, password });
      }
    );
  });
};

// Function to get a user by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

// Function to update a user by ID
const updateUser = (id, email, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET email = ?, password = ? WHERE id = ?",
      [email, password, id],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes > 0 ? { id, email, password } : null);
      }
    );
  });
};

// Function to delete a user by ID
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes > 0);
    });
  });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
