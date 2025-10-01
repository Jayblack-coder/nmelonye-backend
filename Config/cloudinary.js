// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ Storage engine for Multer (direct upload to Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nmelonye_profiles", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], // optional resize
  },
});

// ✅ Multer middleware
const upload = multer({ storage });

export { cloudinary, upload };
