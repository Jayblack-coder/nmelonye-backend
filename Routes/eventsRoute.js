import express from "express";
import { createEvent, getAllEvents } from "../Controller/eventsController.js";

export const eventRouter = express.Router();

eventRouter.post("/", createEvent);
eventRouter.get("/", getAllEvents);
