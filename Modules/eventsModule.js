import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },

    category: {
      type: String,
      enum: ["wedding", "burial", "meeting", "birthday", "thanksgiving", "general"],
      default: "general"
    },

    image: { type: String }, // Cloudinary image URL
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
