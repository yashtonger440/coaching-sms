import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

/**
 * ➕ ADD RESULT
 */
router.post("/", async (req, res) => {
  try {
    const {
      studentName,
      course,
      batch,
      testName,
      totalMarks,
      obtainedMarks,
    } = req.body;

    const percentage = (obtainedMarks / totalMarks) * 100;
    const status = percentage >= 40 ? "Pass" : "Fail";

    const result = await Result.create({
      studentName,
      course,
      batch,
      testName,
      totalMarks,
      obtainedMarks,
      percentage,
      status,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Result create failed", error: err });
  }
});

/**
 * 📄 GET ALL RESULTS
 */
router.get("/", async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * ✏️ UPDATE RESULT
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * ❌ DELETE RESULT  ✅ (THIS FIXES YOUR ERROR)
 */
router.delete("/:id", async (req, res) => {
  console.log("🔥 DELETE API HIT", req.params.id);

  try {
    const result = await Result.deleteOne({ _id: req.params.id });

    console.log("Mongo delete result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});



export default router;
