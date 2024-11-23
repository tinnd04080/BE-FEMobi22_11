import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import BusController from "../controllers/bus.js";

const busRouter = express.Router();

busRouter.post("/", checkLogin, isAdmin, BusController.createBus);
busRouter.get("/", checkLogin, BusController.getBuses);
busRouter.get("/:id", checkLogin, BusController.getBus);
busRouter.put("/:id", checkLogin, isAdmin, BusController.updateBus);
busRouter.delete("/:id", checkLogin, isAdmin, BusController.removeBus);

export default busRouter;
