import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

/* ✅ GET ALL */
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

/* ✅ GET SINGLE STUDENT */
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

/* ✅ ADD STUDENT */
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

/* ✅ UPDATE STUDENT */
router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
});

/* ✅ DELETE */
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
