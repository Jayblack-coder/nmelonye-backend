import express from "express";
import { loginuser, registerUser } from "../Controller/familyController.js";
// import {  getFamily,getFamilyById,findByIdAndUpdate,Create,findByIdAndDelete } from "../Controller/familyController.js";

export const familyRouter = express.Router();


// familyRouter.get("/", getFamily);
familyRouter.post('/members', registerUser);
familyRouter.post('/login', loginuser);
// familyRouter.get("/:id", getFamilyById);
// familyRouter.put("/:id", findByIdAndUpdate);
// familyRouter.post("/:id", Create);
// familyRouter.delete("/:id", findByIdAndDelete);


// module.exports = router;