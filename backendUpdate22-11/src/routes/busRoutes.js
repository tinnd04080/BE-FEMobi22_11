import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import BusRouteController from "../controllers/busRoutes.js";

const busTypeRouter = express.Router();

busTypeRouter.post(
  "/",
  checkLogin,
  isAdmin,
  BusRouteController.createBusRoutes
);
busTypeRouter.get("/", checkLogin, BusRouteController.getBusRoutes);
busTypeRouter.get("/:id", checkLogin, BusRouteController.getBusRoute);
busTypeRouter.put(
  "/:id",
  checkLogin,
  isAdmin,
  BusRouteController.updateBusRoute
);
busTypeRouter.delete(
  "/:id",
  checkLogin,
  isAdmin,
  BusRouteController.removeBusRoute
);

export default busTypeRouter;
