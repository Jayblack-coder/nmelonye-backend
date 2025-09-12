import express from "express";
import { loginuser, registerUser,getAllUsers,getUserById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/familyController.js";


export const familyRouter = express.Router();

familyRouter.get("/", getAllUsers);
familyRouter.post('/members', registerUser);
familyRouter.post('/login', loginuser);
familyRouter.get("/:id", getUserById);
familyRouter.put("/:id", findByIdAndUpdate);
familyRouter.post("/:id", Create);
familyRouter.delete("/:id", findByIdAndDelete);


// module.exports = router;