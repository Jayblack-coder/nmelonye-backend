// import express from "express";
// import { upload } from "../Config/cloudinary.js";
// import { uploadGalleryImage, getAllGalleryImages } from "../Controller/galleryController.js";
// import { protect, adminOnly } from "../Middleware/authMiddleware.js";

// export const galleryRouter = express.Router();

// // Public (GET)
// galleryRouter.get("/", getAllGalleryImages);

// // Admin-only upload (POST)
// galleryRouter.post(
//   "/upload",
//   protect,
//   adminOnly,
//   upload.single("image"),
//   uploadGalleryImage
// );
// Routes/galleryRoute.js
import express from "express";
import { upload } from "../Config/cloudinary.js";
import { uploadGalleryImage, getAllGalleryImages } from "../Controller/galleryController.js";
import { protect, adminOnly } from "../Middleware/authMiddleware.js";

export const galleryRouter = express.Router();

// ✅ Public route: get all images
galleryRouter.get("/", async (req, res, next) => {
  try {
    await getAllGalleryImages(req, res);
  } catch (err) {
    next(err);
  }
});

// ✅ Admin-only route: upload image
galleryRouter.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("image"),
  async (req, res, next) => {
    try {
      await uploadGalleryImage(req, res);
    } catch (err) {
      next(err); // pass errors to express error handler
    }
  }
);
