import ExamTimetable from "../models/examModel.js";
import Notification from "../models/notificationModel.js";

// Create Exam Timetable
export const createExamTimetable = async (req, res) => {
  try {
    const newTimetable = await ExamTimetable.create(req.body);

    // Create a notification
    const notification = new Notification({
      message: `New exam timetable posted: ${newTimetable.name}`,
      recipient: req.user._id, // Assuming the logged-in user is the admin/staff posting
    });
    await notification.save();

    res.status(201).json(newTimetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Exam Timetables
export const getAllExamTimetables = async (req, res) => {
  try {
    const timetables = await ExamTimetable.find();
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Exam Timetable by ID
export const getExamTimetableById = async (req, res) => {
  try {
    const timetable = await ExamTimetable.findById(req.params.id);
    if (!timetable) return res.status(404).json({ message: "Not found" });
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Exam Timetable
export const updateExamTimetable = async (req, res) => {
  try {
    const updatedTimetable = await ExamTimetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTimetable)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Exam timetable updated: ${updatedTimetable.name}`,
      recipient: req.user._id, // Assuming the logged-in user is the admin/staff
    });
    await notification.save();

    res.status(200).json(updatedTimetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Exam Timetable
export const deleteExamTimetable = async (req, res) => {
  try {
    const deletedTimetable = await ExamTimetable.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTimetable)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Exam timetable deleted: ${deletedTimetable.name}`,
      recipient: req.user._id, // Assuming the logged-in user is the admin/staff
    });
    await notification.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
