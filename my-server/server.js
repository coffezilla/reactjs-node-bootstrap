const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Auth
const routeAuth = require("./routes/auth");
app.use("/auth", routeAuth);

// Users
const routeUsers = require("./routes/users");
app.use("/users", routeUsers);

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
