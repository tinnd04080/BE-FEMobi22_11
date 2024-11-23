import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import TicketController from "../controllers/tickets.js";

const ticketRouter = express.Router();

ticketRouter.get("/", checkLogin, isAdmin, TicketController.getTickets);
ticketRouter.get("/me", checkLogin, TicketController.getMyTickets);
ticketRouter.get("/:id", checkLogin, TicketController.getTicket);
ticketRouter.post("/create", checkLogin, TicketController.createTicket);
ticketRouter.put(
  "/update-status/:id",
  checkLogin,
  TicketController.updateTicketStatus
);
ticketRouter.post("/payment", checkLogin, TicketController.createPaymentUrl);

export default ticketRouter;
