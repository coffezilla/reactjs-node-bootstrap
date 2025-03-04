const dotenv = require("dotenv");

const express = require("express");
const router = express.Router();
const userAuth = require("../services/authService");

dotenv.config();

// POST login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const user = await userAuth.loginAuthService(email, password);
    // Format the response as desired
    res.status(200).json({
      data: {
        message: "Logged",
        result: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST recovery password
router.post("/recovery-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await userAuth.recoveryPasswordService(email);
    res.status(200).json({
      data: {
        message: "Recovery Sent",
        result: {
          email: user.email,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST register password
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const user = await userAuth.registerUserService(email, password, name);
    res.status(201).json({
      data: {
        message: "Registered",
        result: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST check-token
router.get("/check-token/:email", async (req, res) => {
  const { email } = req.params;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const user = await userAuth.checkTokenService(email, token);
    res.status(200).json({
      status: 200,
      data: {
        message: "Authenticated",
        result: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
