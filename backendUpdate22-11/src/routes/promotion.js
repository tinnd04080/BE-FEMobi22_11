import express from "express";
import { checkLogin, isAdmin } from "../middlewares/auth.js";
import PromotionController from "../controllers/promotion.js";

const promotionRouter = express.Router();

promotionRouter.post(
  "/",
  checkLogin,
  isAdmin,
  PromotionController.createPromotion
);
promotionRouter.get(
  "/",
  checkLogin,
  isAdmin,
  PromotionController.getPromotions
);
promotionRouter.get(
  "/:code",
  checkLogin,
  PromotionController.getPromotionByCode
);
promotionRouter.get("/:id", checkLogin, PromotionController.getPromotion);
promotionRouter.put(
  "/:id",
  checkLogin,
  isAdmin,
  PromotionController.updatePromotion
);
promotionRouter.delete(
  "/:id",
  checkLogin,
  isAdmin,
  PromotionController.removePromotion
);
promotionRouter.post(
  "/:code/apply",
  checkLogin,
  PromotionController.applyPromotion
);

export default promotionRouter;
