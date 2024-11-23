import express from "express";
import AuthController from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.signUp);
authRouter.post("/login", AuthController.signIn);
authRouter.post("/verify-otp", AuthController.verifyOtp);
authRouter.post("/resend-otp", AuthController.resendOtp);

export default authRouter;
