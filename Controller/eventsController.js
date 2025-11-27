import { Event } from "../Modules/eventsModule.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, date, description, category } = req.body;

    if (!title || !date)
      return res.status(400).json({ message: "Title and date are required" });

    const image = req.file ? req.file.path : null;

    const event = new Event({
      title,
      date,
      description,
      category,
      image
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const image = req.file ? req.file.path : null;

    const updated = await Event.findByIdAndUpdate(
      eventId,
      { ...req.body, image },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deleted = await Event.findByIdAndDelete(eventId);
    if (!deleted)
      return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
