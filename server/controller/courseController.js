import Course from "../models/courseModel.js";
import Notification from "../models/notificationModel.js";

// Create Course
export const createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);

    // Create a notification
    const notification = new Notification({
      message: `New course posted: ${newCourse.name}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Course updated: ${updatedCourse.name}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Course deleted: ${deletedCourse.name}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
