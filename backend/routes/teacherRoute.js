import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

/* ✅ GET ALL TEACHERS */
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ✅ GET SINGLE TEACHER */
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.json(teacher);
  } catch (err) {
    res.status(404).json({ error: "Teacher not found" });
  }
});

/* ✅ ADD TEACHER */
router.post("/", async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ✅ UPDATE TEACHER */
router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ✅ DELETE TEACHER */
router.delete("/:id", async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
