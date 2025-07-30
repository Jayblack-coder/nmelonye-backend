import express from "express";
import { getOkoli, getOkoliById, findByIdAndUpdate, Create, findByIdAndDelete } from "../Controller/okoliController.js";


export const okoliRouter = express.Router();

okoliRouter.get("/", getOkoli);
okoliRouter.get("/:id", getOkoliById);
okoliRouter.put("/:id", findByIdAndUpdate);
okoliRouter.post("/", Create);
okoliRouter.delete("/:id", findByIdAndDelete);
