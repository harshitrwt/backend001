import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const users = [];

router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "Protected users data", users });
});

export default router;
