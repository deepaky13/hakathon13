import mongoose from "mongoose";

// Define Attendance Schema
const AttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    attendancePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    semester: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", AttendanceSchema);
