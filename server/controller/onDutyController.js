import OnDutyFormModel from "../models/onDutyModel.js";
import NotificationModel from "../models/notificationModel.js";

// Create On-Duty Form
export const createOnDutyForm = async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      course,
      semester,
      reason,
      dateFrom,
      dateTo,
      contactNumber,
    } = req.body;

    // Create the On-Duty form
    const newOnDutyForm = await OnDutyFormModel.create({
      studentName,
      studentId,
      course,
      semester,
      reason,
      dateFrom,
      dateTo,
      contactNumber,
      createdBy: req.user.userId, // Store the ID of the user creating the form
    });

    // Create a notification for staff
    await NotificationModel.create({
      message: `New On-Duty form submitted by ${studentName} (ID: ${studentId})`,
      userId: req.user.userId, // Assuming staff will see it
    });

    res.status(201).json(newOnDutyForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update On-Duty Form Status
export const updateOnDutyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    // Find the On-Duty form by ID
    const onDutyForm = await OnDutyFormModel.findById(id);
    if (!onDutyForm) {
      return res.status(404).json({ message: "On-Duty Form not found" });
    }

    // Check for appropriate status transitions
    if (currentUser.role === "staff" && onDutyForm.status === "Pending") {
      // Staff can approve or reject the form, but it will not be sent to HOD unless approved.
      onDutyForm.status = "Processing"; // Staff can mark it as processing
    } else if (
      currentUser.role === "hod" &&
      onDutyForm.status === "Processing"
    ) {
      // HOD can approve or reject the form
      const { decision } = req.body; // Expecting 'approve' or 'reject' in request body

      if (decision === "approve") {
        onDutyForm.status = "Approved"; // If HOD approves, status changes to "Approved"
      } else if (decision === "reject") {
        onDutyForm.status = "Rejected"; // If HOD rejects, status changes to "Rejected"
      } else {
        return res.status(400).json({ message: "Invalid decision" });
      }
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized action or invalid status update" });
    }

    // Save the updated form
    await onDutyForm.save();

    // Create notification based on the status update
    let notificationMessage;
    if (onDutyForm.status === "Processing") {
      notificationMessage = `On-Duty form by ${onDutyForm.studentName} is now in process by staff.`;
    } else if (onDutyForm.status === "Approved") {
      notificationMessage = `On-Duty form by ${onDutyForm.studentName} has been approved by HOD.`;
    } else if (onDutyForm.status === "Rejected") {
      notificationMessage = `On-Duty form by ${onDutyForm.studentName} has been rejected.`;
    }

    // Create a notification for the student and/or staff depending on the status change
    const notificationData = {
      message: notificationMessage,
      userId: onDutyForm.createdBy, // Notify the student who submitted the form
    };
    await NotificationModel.create(notificationData);

    // Send the response
    res.status(200).json({ message: `Status updated to ${onDutyForm.status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All On-Duty Forms
export const getAllOnDutyForms = async (req, res) => {
  try {
    const currentUser = req.user; // Assuming the user info is stored in req.user

    let onDutyForms;

    if (currentUser.role === "admin") {
      // If the user is staff, return all On-Duty forms
      onDutyForms = await OnDutyFormModel.find();
    } else if (currentUser.role === "head") {
      // If the user is head, return only the forms that have been approved by staff (status = "Processing")
      onDutyForms = await OnDutyFormModel.find({ status: "Processing" });
    } else {
      // If the user is neither staff nor head, return an error
      return res
        .status(403)
        .json({ message: "Unauthorized to view the On-Duty forms" });
    }

    res.status(200).json(onDutyForms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get On-Duty Form by ID
export const getOnDutyFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const onDutyForm = await OnDutyFormModel.findById(id);
    if (!onDutyForm) {
      return res.status(404).json({ message: "On-Duty Form not found" });
    }
    res.status(200).json(onDutyForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete On-Duty Form
export const deleteOnDutyForm = async (req, res) => {
  try {
    const { id } = req.params;
    const onDutyForm = await OnDutyFormModel.findByIdAndDelete(id);
    if (!onDutyForm) {
      return res.status(404).json({ message: "On-Duty Form not found" });
    }

    // Create a notification for the student
    await NotificationModel.create({
      message: `Your On-Duty form has been deleted by staff.`,
      userId: onDutyForm.createdBy,
    });

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
