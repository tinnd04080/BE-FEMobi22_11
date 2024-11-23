import { model, Schema } from "mongoose";

const tripSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      ref: "busRoutes",
      required: true,
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "buses",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = model("trip", tripSchema);
export default Trip;
