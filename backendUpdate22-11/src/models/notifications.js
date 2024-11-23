import { model, Schema } from "mongoose";
import { NOTIFICATION_TYPE } from "../constants/index.js";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "tickets",
    },
    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPE),
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = model("notifications", notificationSchema);
export default Notification;
