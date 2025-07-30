import express from "express";
//import Family from "../Module/FamilyModule.js";
import { getNwankwos, getNwankwosById, NwankwosByIdAndUpdate, CreateNwankwos, NwankwosByIdAndDelete } from "../Controller/familyController.js";
const router = express.Router();


router.get("/nwankwos", getNwankwos);
router.get("/nwankwos/:id", getNwankwosById);
router.put("/nwankwos/:id", NwankwosByIdAndUpdate);
router.post("/nwankwos/:id", CreateNwankwos);
router.delete("/nwankwos/:id", NwankwosByIdAndDelete);


module.exports = router;