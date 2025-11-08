import express from "express";

import {
  loginuser,
  registerUser,
  getAllUsers,
  getUserById,
  findByIdAndUpdate,
  Create,
  findByIdAndDelete,
} from "../Controller/familyController.js";
import { updateProfilePicture } from "../Controller/familyController.js";
import { upload } from "../Config/cloudinary.js";
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
