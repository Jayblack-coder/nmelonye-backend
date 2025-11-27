import express from "express";
import { createEvent, getAllEvents } from "../Controller/eventsController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

export const eventRouter = express.Router();

// Public route – members can view events
eventRouter.get("/", getAllEvents);

// Admin only – creating events
eventRouter.post("/", protect, adminOnly, createEvent);
