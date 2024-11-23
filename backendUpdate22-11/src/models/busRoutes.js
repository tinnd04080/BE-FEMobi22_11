import { model, Schema } from "mongoose";
import { BUS_ROUTES_STATUS } from "../constants/index.js";

const busRoutesSchema = new Schema(
  {
    startProvince: {
      type: String,
      required: true,
    },
    startDistrict: {
      type: String,
      required: true,
    },
    endDistrict: {
      type: String,
      required: true,
    },
    endProvince: {
      type: String,
      required: true,
    },
    duration: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BUS_ROUTES_STATUS),
      default: BUS_ROUTES_STATUS.OPEN,
    },
    distance: {
      type: Number,
      required: true,
    },
    pricePerKM: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BusRoutes = model("busRoutes", busRoutesSchema);
export default BusRoutes;
