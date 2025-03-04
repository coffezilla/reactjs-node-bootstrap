const dotenv = require("dotenv");

const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

dotenv.config();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
    const responseApi = {
      users: users,
    };
    res.json(responseApi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const newUser = await userService.createUser(email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH (update) user by ID
router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, email, password);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await userService.deleteUser(userId);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
