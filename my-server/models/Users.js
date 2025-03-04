const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const db = require("../database");

// Function to create the users table
const createUserTable = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            name TEXT NOT NULL,
            password TEXT DEFAULT ''
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table: " + err.message);
        } else {
          console.log("Users table created or already exists.");
        }
      }
    );
  });

  db.close((err) => {
    if (err) {
      console.error("Error closing the database: " + err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
};

// Export the function
module.exports = {
  createUserTable,
};
