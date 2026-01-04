import express from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();
const users = []; // temporary (DB later)

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ msg: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });

  res.status(201).json({ msg: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

  const token = generateToken({ email });

  res.json({ token });
});

export default router;
