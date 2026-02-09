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

// /* ✅ ADD PAYMENT */
// router.post("/:id/payment", async (req, res) => {
//   const student = await Student.findById(req.params.id);

//   student.payments.push({
//     amount: req.body.amount,
//     remark: req.body.remark,
//   });

//   await student.save();
//   res.json(student);
// });

// // ✅ UPDATE PAYMENT
// router.put("/:studentId/payment/:paymentId", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.studentId);

//     const payment = student.payments.id(req.params.paymentId);

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     payment.amount = req.body.amount;
//     payment.remark = req.body.remark;

//     await student.save();
//     res.json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


export default router;
