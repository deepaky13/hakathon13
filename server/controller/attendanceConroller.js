import Attendance from "../models/attendanceModel.js";
import Notification from "../models/notificationModel.js";

// Create Attendance
export const createAttendance = async (req, res) => {
  try {
    const { studentId, attendancePercentage, semester, remarks } = req.body;

    if (!studentId || attendancePercentage === undefined || !semester) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create attendance record
    const newAttendance = await Attendance.create({
      studentId,

      attendancePercentage,
      semester,
      remarks,
    });

    // Create a notification for the student
    const notification = new Notification({
      message: `Your attendance has been updated for semester ${semester}.`,
      userId: studentId,
    });
    await notification.save();

    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Attendance by Student ID
export const getAttendanceByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId })
      //  .populate("courseId", "courseName")
      .populate("studentId", "name email");
    if (!attendance)
      return res.status(404).json({ message: "No records found" });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAttendance)
      return res.status(404).json({ message: "Record not found" });

    // Create notification for updated attendance
    const notification = new Notification({
      message: `Your attendance record has been updated.`,
      userId: updatedAttendance.studentId,
    });
    await notification.save();

    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Attendance
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance)
      return res.status(404).json({ message: "Record not found" });

    // Create notification for deleted attendance
    const notification = new Notification({
      message: `Your attendance record has been removed.`,
      userId: deletedAttendance.studentId,
    });
    await notification.save();

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
