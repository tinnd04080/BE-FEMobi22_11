import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import UserController from "../controllers/users.js";

const userRouter = express.Router();

userRouter.get("/profile", checkLogin, UserController.getProfile);
userRouter.put("/profile", checkLogin, UserController.updateProfile);
userRouter.post(
  "/profile/change-password",
  checkLogin,
  UserController.changeProfilePassword
);
userRouter.get("/", checkLogin, isAdmin, UserController.getUsers);
userRouter.get("/:id", checkLogin, isAdmin, UserController.getUser);
userRouter.put(
  "/:id/update-role",
  checkLogin,
  isAdmin,
  UserController.updateUserRole
);
userRouter.put("/:id", checkLogin, isAdmin, UserController.updateUser);
userRouter.delete("/:id", checkLogin, isAdmin, UserController.removeUser);

export default userRouter;
