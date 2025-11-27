import express from "express";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent
} from "../Controller/eventsController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

export const eventRouter = express.Router();

// Public route: anyone can see events
eventRouter.get("/", getAllEvents);

// Admin only
eventRouter.post("/", protect, adminOnly, createEvent);
eventRouter.put("/:id", protect, adminOnly, updateEvent);
eventRouter.delete("/:id", protect, adminOnly, deleteEvent);
