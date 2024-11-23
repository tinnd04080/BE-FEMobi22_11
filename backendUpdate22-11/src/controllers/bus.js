import { PAGINATION } from "../constants/index.js";
import Bus from "../models/bus.js";

const BusController = {
  // Hàm tạo mới một bus
  createBus: async (req, res) => {
    try {
      // Lấy thông tin từ body request
      const { busTypeName, seatCapacity, priceFactor, licensePlate } = req.body;

      // Kiểm tra nếu biển số đã tồn tại
      const existingBus = await Bus.findOne({ licensePlate });
      if (existingBus) {
        return res.status(400).json({ message: "Biển số xe đã tồn tại" });
      }

      // Tạo mới một xe bus
      const bus = await new Bus({
        busTypeName,
        seatCapacity,
        priceFactor,
        licensePlate,
      }).save();

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Hàm lấy danh sách các bus với phân trang
  getBuses: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      // Lấy danh sách xe bus với phân trang
      const buses = await Bus.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await Bus.countDocuments();
      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: buses,
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

  // Hàm lấy thông tin chi tiết một bus theo id
  getBus: async (req, res) => {
    try {
      const { id } = req.params;

      const bus = await Bus.findById(id).exec();

      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Hàm cập nhật thông tin một bus
  updateBus: async (req, res) => {
    try {
      const { id } = req.params;
      const { busTypeName, seatCapacity, priceFactor, licensePlate } = req.body;

      // Cập nhật thông tin xe bus
      const bus = await Bus.findByIdAndUpdate(
        id,
        {
          busTypeName,
          seatCapacity,
          priceFactor,
          licensePlate,
        },
        { new: true }
      ).exec();

      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Hàm xóa một bus theo id
  removeBus: async (req, res) => {
    try {
      const { id } = req.params;

      const bus = await Bus.findByIdAndDelete(id).exec();

      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }

      res.json({ message: "Bus removed successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default BusController;
