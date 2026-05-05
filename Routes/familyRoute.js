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
  getNwankwoUsers,
  getAsouzuUsers,
  getUdorjiUsers,
  getOkoliUsers,
  getFamilyLineUsers,
} from "../Controller/familyController.js";
import { upload } from "../Config/cloudinary.js";
import { protect } from "../Middleware/authMiddleware.js";

export const familyRouter = express.Router();



// Routes
familyRouter.get("/", getAllUsers);

// ✅ Separate endpoints for each family line
familyRouter.get("/family-line/nwankwo", getNwankwoUsers);
familyRouter.get("/family-line/asouzu", getAsouzuUsers);
familyRouter.get("/family-line/udorji", getUdorjiUsers);
familyRouter.get("/family-line/okoli", getOkoliUsers);
familyRouter.get("/family-line/:surname", getFamilyLineUsers);

// ✅ Compatibility aliases for older frontend requests
familyRouter.get("/nwankwo", getNwankwoUsers);
familyRouter.get("/asouzu", getAsouzuUsers);
familyRouter.get("/udorji", getUdorjiUsers);
familyRouter.get("/okoli", getOkoliUsers);

// ✅ Register user with profile image
familyRouter.post("/register", upload.single("image"), registerUser);

familyRouter.post("/login", loginuser);
familyRouter.get("/:id", getUserById);
familyRouter.put("/:id", protect, findByIdAndUpdate);
familyRouter.post("/:id", Create);
familyRouter.delete("/:id", findByIdAndDelete);
// familyRouter.post("/:id/uploadPhoto", upload.single("image"), updateProfilePicture);
// ✅ Only logged-in users can update their photo
familyRouter.post("/:id/uploadPhoto", protect, upload.single("image"), updateProfilePicture);