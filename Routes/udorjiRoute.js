import express from "express";
import { getUdorji, getUdorjiById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/udorjiController.js";


export const udorjiRouter = express.Router();


udorjiRouter.get("/", getUdorji);
udorjiRouter.get("/:id", getUdorjiById);
udorjiRouter.put("/:id", findByIdAndUpdate);
udorjiRouter.post("/", Create);
udorjiRouter.delete("/:id", findByIdAndDelete);


//module.exports = router;