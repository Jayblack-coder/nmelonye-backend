// Modules/eventsModule.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ["wedding", "burial", "meeting", "general"], default: "general" },
    image: { type: String }, // URL of uploaded poster/banner
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
