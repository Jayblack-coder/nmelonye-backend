// import express from "express";
// import { loginuser, registerUser,getAllUsers,getUserById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/familyController.js";


// export const familyRouter = express.Router();
// // ✅ Setup Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // save files to "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // unique filename
//   },
// });

// const upload = multer({ storage });
// familyRouter.get("/", getAllUsers);
// familyRouter.post("/register", upload.single("profileImage"), registerUser);
// familyRouter.post("/login", loginuser);
// familyRouter.get("/:id", getUserById);
// familyRouter.put("/:id", findByIdAndUpdate);
// familyRouter.post("/:id", Create);
// familyRouter.delete("/:id", findByIdAndDelete);


// // module.exports = router;

import express from "express";
import multer from "multer";
import fs from "fs";
// import path from "path";
import {
  loginuser,
  registerUser,
  getAllUsers,
  getUserById,
  findByIdAndUpdate,
  Create,
  findByIdAndDelete,
} from "../Controller/familyController.js";
import { upload } from "../Config/cloudinary.js";

export const familyRouter = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // store inside uploads/
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// Routes
familyRouter.get("/", getAllUsers);

// ✅ Register user with profile image
familyRouter.post("/register", upload.single("image"), registerUser);

familyRouter.post("/login", loginuser);
familyRouter.get("/:id", getUserById);
familyRouter.put("/:id", findByIdAndUpdate);
familyRouter.post("/:id", Create);
familyRouter.delete("/:id", findByIdAndDelete);
