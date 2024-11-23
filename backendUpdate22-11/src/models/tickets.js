import { model, Schema } from "mongoose";
import { TICKET_STATUS } from "../constants/index.js";

const ticketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: null,
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: "trip",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: Array,
      required: true,
    },
    boardingPoint: {
      type: String,
      required: true,
    },
    dropOffPoint: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TICKET_STATUS),
      required: true,
      default: TICKET_STATUS.INITIAL,
    },
  },
  { timestamps: true }
);

const Tickets = model("tickets", ticketSchema);
export default Tickets;
