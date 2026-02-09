import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    // Basic Info
    name: String,
    email: String,
    phone: String,
    dob: Date,
    gender: String,

    // Address
    address: String,
    city: String,
    state: String,
    pincode: String,

    // Academic
    course: String,
    qualification: String,
    experience: String,

  },
  { timestamps: true } // optional but useful
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
