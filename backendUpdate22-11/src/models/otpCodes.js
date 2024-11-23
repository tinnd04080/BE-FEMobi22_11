import { model, Schema } from "mongoose";

const otpCodeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expired: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const OtpCodes = model("otpCodes", otpCodeSchema);
export default OtpCodes;
