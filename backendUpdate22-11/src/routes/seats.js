import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import SeatController from "../controllers/seats.js";

const seatRouter = express.Router();

seatRouter.post("/", checkLogin, isAdmin, SeatController.createSeat);
seatRouter.get("/", checkLogin, SeatController.getAllSeats);
seatRouter.get("/:id", checkLogin, SeatController.getSeat);
seatRouter.put("/:id", checkLogin, isAdmin, SeatController.updateSeat);
seatRouter.delete("/:id", checkLogin, isAdmin, SeatController.removeSeat);

export default seatRouter;
