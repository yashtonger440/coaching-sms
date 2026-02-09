import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
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
  

  // ✅ NEW: Paid Fees (IMPORTANT)
 

  // Profile
  profilePic: String, // image URL (later upload bhi kara denge)
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
