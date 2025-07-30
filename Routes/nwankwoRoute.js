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