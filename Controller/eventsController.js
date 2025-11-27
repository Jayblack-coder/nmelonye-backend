// Controller/eventsController.js
import { Event } from "../Modules/eventsModule.js";

export const createEvent = async (req, res) => {
  try {
    const { title, date, description, category } = req.body;

    const event = new Event({
      title,
      date,
      description,
      category,
      image: req.file ? req.file.path : null
    });

    await event.save();
    res.status(201).json({ message: "Event created", event });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({ events });  // <<< RETURN AS AN OBJECT
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) updateData.image = req.file.path;

    const updated = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

