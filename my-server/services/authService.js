const db = require("../database");

// login
const loginAuthService = (email, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, name, email FROM users WHERE email = ? AND password = ? LIMIT 1",
      [email, password],
      (err, user) => {
        if (err) {
          return reject(err);
        }

        if (!user) {
          return reject(new Error("User not found"));
        }

        const token = process.env.AUTH_TOKEN;

        resolve({ id: user.id, email: user.email, name: user.name, token });
      }
    );
  });
};

// recovery
const recoveryPasswordService = (email) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT email FROM users WHERE email = ?", [email], (err, user) => {
      if (err) {
        return reject(err);
      }

      if (!user) {
        return reject(new Error("User not found"));
      }

      resolve({ email: user.email });
    });
  });
};

// register
const registerUserService = (email, password, name) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, password, name],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, name, email, password });
      }
    );
  });
};

// check token
const checkTokenService = (email, token) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, name, email FROM users WHERE email = ?",
      [email],
      (err, user) => {
        if (err) {
          return reject(err);
        }

        if (!user) {
          return reject(new Error("User not found"));
        }

        if (token !== process.env.AUTH_TOKEN) {
          return reject(new Error("Token not found"));
        }

        resolve({ id: user.id, email: user.email, name: user.name, token });
      }
    );
  });
};

module.exports = {
  loginAuthService,
  recoveryPasswordService,
  registerUserService,
  checkTokenService,
};
