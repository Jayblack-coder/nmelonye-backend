import express from "express";
//import {Anyaga} from "../Modules/anyagaModule.js";
import { getAsouzu, getAsouzuById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/asouzuController.js";


export const asouzuRouter = express.Router();

asouzuRouter.get("/", getAsouzu);
asouzuRouter.get("/:id", getAsouzuById);
asouzuRouter.put("/:id", findByIdAndUpdate);
asouzuRouter.post("/", Create);
asouzuRouter.delete("/:id", findByIdAndDelete);


//module.exports = router;