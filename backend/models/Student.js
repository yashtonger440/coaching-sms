import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  feesTotal: Number,

  // ✅ NEW: Paid Fees (IMPORTANT)
  paid: {
    type: Number,
    default: 0,
    min: 0,
  },

  // Profile
  profilePic: String, // image URL (later upload bhi kara denge)
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
