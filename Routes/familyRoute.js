import express from "express";

import {
  loginuser,
  registerUser,
  getAllUsers,
  getUserById,
  findByIdAndUpdate,
  Create,
  findByIdAndDelete,
  updateProfilePicture,
} from "../Controller/familyController.js";
import { upload } from "../Config/cloudinary.js";
import { protect,  } from "../Middleware/authMiddleware.js";
import dotenv from "dotenv";


dotenv.config();

export const familyRouter = express.Router();



// Routes
familyRouter.get("/", getAllUsers);

// ✅ Register user with profile image
familyRouter.post("/register", upload.single("image"), registerUser);

familyRouter.post("/login", loginuser);
familyRouter.get("/:id", getUserById);
familyRouter.put("/:id", findByIdAndUpdate);
familyRouter.post("/:id", Create);
familyRouter.delete("/:id", findByIdAndDelete);
familyRouter.post("/:id/uploadPhoto", upload.single("image"), updateProfilePicture);
// ✅ Only logged-in users can update their photo
familyRouter.post("/:id/uploadPhoto", protect, upload.single("image"), updateProfilePicture);