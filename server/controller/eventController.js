import Event from "../models/EventsModel.js";
import Notification from "../models/notificationModel.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    // Validate the body data
    const { eventName, eventDate, venue, description } = req.body;
    if (!eventName || !eventDate || !venue) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the Event
    const newEvent = await Event.create({
      eventName,
      eventDate,
      venue,
      description,
    });

    // Create a notification
    const notification = new Notification({
      message: `New event posted: ${newEvent.eventName}`, // Notification message
      userId: req.user.userId, // Assuming req.user._id holds the user ID of the current user (admin or the logged-in user)
    });

    await notification.save(); // Save notification to the database

    res.status(201).json(newEvent); // Return the newly created event
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message }); // Send error response
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Event updated: ${updatedEvent.eventName}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Not found" });

    // Create a notification
    const notification = new Notification({
      message: `Event deleted: ${deletedEvent.eventName}`,
      userId: req.user.userId,
    });
    await notification.save();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
