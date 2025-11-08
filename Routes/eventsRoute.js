import express from "express";
import { createEvent, getAllEvents } from "../Controller/eventsController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

export const eventRouter = express.Router();

eventRouter.post("/", createEvent);
eventRouter.get("/", getAllEvents);
// ✅ Admin only
eventRouter.post("/", protect, adminOnly, createEvent);