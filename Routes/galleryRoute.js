import express from "express";
import { upload } from "../Config/cloudinary.js";
import { uploadGalleryImage, getAllGalleryImages } from "../Controller/galleryController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

export const galleryRouter = express.Router();

// Public (GET)
galleryRouter.get("/", getAllGalleryImages);

// Admin-only upload (POST)
galleryRouter.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("image"),
  uploadGalleryImage
);
