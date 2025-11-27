import { Event } from "../Modules/eventsModule.js";

export const createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    if (!title || !date)
      return res.status(400).json({ message: "Title and date are required" });

    const event = new Event({ title, date, description });
    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: -1 });
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
