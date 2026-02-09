import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    course: String,
    batch: String,
    testName: String,

    totalMarks: {
      type: Number,
    },
    obtainedMarks: {
      type: Number,
    },

    percentage: Number,
    status: {
      type: String,
      enum: ["Pass", "Fail"],
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
