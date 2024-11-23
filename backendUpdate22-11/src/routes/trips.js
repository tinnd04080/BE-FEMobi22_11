import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import TripController from "../controllers/trip.js";

const tripRouter = express.Router();

tripRouter.post("/", checkLogin, isAdmin, TripController.createTrip);
tripRouter.get("/", checkLogin, TripController.getTrips);
tripRouter.get("/search", TripController.getTripsByRoute);
tripRouter.get("/:id/busseats", TripController.getBusAndSeatsByTripId);
tripRouter.get("/:id", checkLogin, TripController.getTrip);
tripRouter.put("/:id", checkLogin, isAdmin, TripController.updateTrip);
tripRouter.delete("/:id", checkLogin, isAdmin, TripController.removeTrip);

export default tripRouter;
