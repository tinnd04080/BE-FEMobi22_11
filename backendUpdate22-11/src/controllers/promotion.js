import dayjs from "dayjs";
import { PAGINATION } from "../constants/index.js";
import Promotion from "../models/promotion.js";

const PromotionController = {
  createPromotion: async (req, res) => {
    try {
      const {
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
      } = req.body;

      const busType = await new Promotion({
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
      }).save();

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getPromotions: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const promotions = await Promotion.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await Promotion.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: promotions,
        totalPage,
        currentPage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getPromotion: async (req, res) => {
    try {
      const { id } = req.params;

      const promotion = await Promotion.findById(id).exec();

      res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updatePromotion: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
      } = req.body;

      const promotion = await Promotion.findByIdAndUpdate(
        id,
        {
          code,
          description,
          discountAmount,
          discountType,
          startDate,
          endDate,
        },
        { new: true }
      ).exec();

      res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removePromotion: async (req, res) => {
    try {
      const { id } = req.params;

      const promotion = await Promotion.findByIdAndDelete(id).exec();

      res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  applyPromotion: async (req, res) => {
    try {
      const { code } = req.params;

      const discount = await Promotion.findOne({ code }).exec();
      if (!discount) {
        return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
      }

      const isBeforeStart = dayjs().isBefore(dayjs(discount.startDate));
      if (isBeforeStart) {
        return res.status(406).json({ message: "Chưa đến thời gian sử dụng" });
      }

      const isExpired = dayjs().isAfter(discount.endDate);
      if (isExpired) {
        return res.status(406).json({ message: "Mã giảm giá đã hết hạn" });
      }

      res.json(discount);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  getPromotionByCode: async (req, res) => {
    try {
      const { code } = req.params;

      // Tìm kiếm theo mã giảm giá 'code', không phải theo _id
      const promotion = await Promotion.findOne({ code }).exec();

      if (!promotion) {
        return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
      }

      res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default PromotionController;
