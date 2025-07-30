import express from "express";
//import Anyaga from "../Modules/anyagaModule.js";
import { getAnyaga, getAnyagaById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/anyagaController.js";


export const anyagaRouter = express.Router();


anyagaRouter.get("/", getAnyaga);
anyagaRouter.get("/:id", getAnyagaById);
anyagaRouter.put("/:id", findByIdAndUpdate);
anyagaRouter.post("/", Create);
anyagaRouter.delete("/:id", findByIdAndDelete);


//module.exports = router;