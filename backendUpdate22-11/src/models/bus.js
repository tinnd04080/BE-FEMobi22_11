import { model, Schema } from "mongoose";

const busSchema = new Schema(
  {
    // Các trường gộp từ busTypes
    busTypeName: {
      type: String,
      required: true,
    },
    seatCapacity: {
      type: Number,
      required: true,
    },
    priceFactor: {
      type: Number,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Bus = model("buses", busSchema);
export default Bus;
