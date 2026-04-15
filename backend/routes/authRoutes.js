const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.json({ error: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  res.json(user);
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ error: "Email not found" });

  if (user.password !== password)
    return res.json({ error: "Wrong password" });

  if (user.role !== role)
    return res.json({ error: `Login as ${user.role}` });

  res.json(user);
});

module.exports = router;