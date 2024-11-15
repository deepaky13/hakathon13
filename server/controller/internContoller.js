import Internship from "../models/internModel.js";
import Notification from "../models/notificationModel.js";

// Create Internship
export const createInternship = async (req, res) => {
  try {
    const newInternship = await Internship.create(req.body);

    // Create a notification
    const notification = new Notification({
      message: `New internship posted: ${newInternship.title}`,
      recipient: req.user._id,
    });
    await notification.save();

    res.status(201).json(newInternship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Internships
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Internship
export const updateInternship = async (req, res) => {
  try {
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInternship)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Internship updated: ${updatedInternship.title}`,
      recipient: req.user._id,
    });
    await notification.save();

    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Internship
export const deleteInternship = async (req, res) => {
  try {
    const deletedInternship = await Internship.findByIdAndDelete(req.params.id);
    if (!deletedInternship)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Internship deleted: ${deletedInternship.title}`,
      recipient: req.user._id,
    });
    await notification.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
