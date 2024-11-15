import express from "express";
import {
  createAttendance,
  getAttendanceByStudentId,
  updateAttendance,
  deleteAttendance,
} from "../controller/attendanceConroller.js";

const router = express.Router();

// Routes
router.post("/", createAttendance); // Create attendance
router.get("/:studentId", getAttendanceByStudentId); // Get attendance by student ID
router.put("/:id", updateAttendance); // Update attendance
router.delete("/:id", deleteAttendance); // Delete attendance

export default router;
