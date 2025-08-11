import express from "express";
//import Anyaga from "../Modules/anyagaModule.js";
import { getNwankwo, getNwankwoById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/nwankwoController.js";

export const router = express.Router();


router.get("/", getNwankwo);
router.get("/:id", getNwankwoById);
router.put("/:id", findByIdAndUpdate);
router.post("/", Create);
router.delete("/:id", findByIdAndDelete);


//module.exports = router;
//MONGO_URL="mongodb://localhost:27017/Nmelonye"
//srv-d25100c9c44c73b3f640
//https://nmelonye-backend-3.onrender.com
//102.90.100.98/32