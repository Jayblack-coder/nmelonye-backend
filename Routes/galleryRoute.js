import express from "express";
import { upload } from "../Config/cloudinary.js";
import { uploadGalleryImage, getAllGalleryImages } from "../Controller/galleryController.js";

export const galleryRouter = express.Router();

galleryRouter.post("/upload", upload.single("image"), uploadGalleryImage);
galleryRouter.get("/", getAllGalleryImages);
