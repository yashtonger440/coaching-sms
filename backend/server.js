import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/results", resultRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend running" })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

app.listen(5000, () => {
  console.log("Server running on port 5000")
})
