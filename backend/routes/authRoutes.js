import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../modules/Admin.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashed });
  res.json({ message: "Admin created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid" });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
