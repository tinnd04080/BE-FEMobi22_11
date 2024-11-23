import express from "express";
import authRouter from "./auth.js";
import userRouter from "./users.js";
import busRouteRouter from "./busRoutes.js";
import busRouter from "./bus.js";
import tripRouter from "./trips.js";
import seatRouter from "./seats.js";
import ticketRouter from "./tickets.js";
import notificationRouter from "./notifications.js";
import promotionRouter from "./promotion.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/bus-routes", busRouteRouter);
router.use("/buses", busRouter);
router.use("/trips", tripRouter);
router.use("/seats", seatRouter);
router.use("/tickets", ticketRouter);
router.use("/notifications", notificationRouter);
router.use("/promotions", promotionRouter);

export default router;
