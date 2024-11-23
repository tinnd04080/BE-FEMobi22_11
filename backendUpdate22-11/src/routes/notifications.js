import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import NotificationController from "../controllers/notifications.js";

const notificationRouter = express.Router();

notificationRouter.get(
  "/me",
  checkLogin,
  NotificationController.getMyNotifications
);

export default notificationRouter;
