// Routes/eventsRoute.js
import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../Controller/eventsController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";
import { upload } from "../Config/cloudinary.js";

export const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);

// Admin only
eventRouter.post("/", protect, adminOnly, upload.single("image"), createEvent);
eventRouter.put("/:id", protect, adminOnly, upload.single("image"), updateEvent);
eventRouter.delete("/:id", protect, adminOnly, deleteEvent);
