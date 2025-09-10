import express from "express";
import { registerUser } from "../Controller/familyController.js";
// import {  getFamily,getFamilyById,findByIdAndUpdate,Create,findByIdAndDelete } from "../Controller/familyController.js";

export const familyRouter = express.Router();


// familyRouter.get("/", getFamily);
familyRouter.post('/members', registerUser);
// familyRouter.get("/:id", getFamilyById);
// familyRouter.put("/:id", findByIdAndUpdate);
// familyRouter.post("/:id", Create);
// familyRouter.delete("/:id", findByIdAndDelete);


// module.exports = router;