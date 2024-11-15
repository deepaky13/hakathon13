import Scholarship from "../models/ScholarshipModel.js";
import Notification from "../models/notificationModel.js";

// Create Scholarship
export const createScholarship = async (req, res) => {
  try {
    const newScholarship = await Scholarship.create(req.body);

    // Create a notification
    const notification = new Notification({
      message: `New scholarship posted: ${newScholarship.name}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Scholarships
export const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Scholarship by ID
export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) return res.status(404).json({ message: "Not found" });
    res.status(200).json(scholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Scholarship
export const updateScholarship = async (req, res) => {
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScholarship)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Scholarship updated: ${updatedScholarship.name}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json(updatedScholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const deletedScholarship = await Scholarship.findByIdAndDelete(
      req.params.id
    );
    if (!deletedScholarship)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Scholarship deleted: ${deletedScholarship.name}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
