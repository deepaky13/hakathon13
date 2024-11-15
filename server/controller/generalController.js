import GeneralInfo from "../models/Generalmodel.js";
import Notification from "../models/notificationModel.js";

// Create General Info
export const createGeneralInfo = async (req, res) => {
  try {
    const newGeneralInfo = await GeneralInfo.create(req.body);

    // Create a notification
    const notification = new Notification({
      message: `New general information posted: ${newGeneralInfo.title}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(201).json(newGeneralInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All General Info
export const getAllGeneralInfo = async (req, res) => {
  try {
    const generalInfoList = await GeneralInfo.find();
    res.status(200).json(generalInfoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get General Info by ID
export const getGeneralInfoById = async (req, res) => {
  try {
    const generalInfo = await GeneralInfo.findById(req.params.id);
    if (!generalInfo) return res.status(404).json({ message: "Not found" });
    res.status(200).json(generalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update General Info
export const updateGeneralInfo = async (req, res) => {
  try {
    const updatedGeneralInfo = await GeneralInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGeneralInfo)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `General info updated: ${updatedGeneralInfo.title}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json(updatedGeneralInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete General Info
export const deleteGeneralInfo = async (req, res) => {
  try {
    const deletedGeneralInfo = await GeneralInfo.findByIdAndDelete(
      req.params.id
    );
    if (!deletedGeneralInfo)
      return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `General info deleted: ${deletedGeneralInfo.title}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
