import express from "express";
import { upload } from "../Config/cloudinary.js";
import { uploadGalleryImage, getAllGalleryImages } from "../Controller/galleryController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

export const galleryRouter = express.Router();

// galleryRouter.post("/upload", upload.single("image"), uploadGalleryImage);
galleryRouter.get("/", getAllGalleryImages);
// ✅ Protected route (admin only)
galleryRouter.post("/upload", protect, adminOnly, upload.single("image"), uploadGalleryImage);

