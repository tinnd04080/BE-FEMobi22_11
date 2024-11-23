import { PAGINATION } from "../constants/index.js";
import Notification from "../models/notifications.js";

const NotificationController = {
  getMyNotifications: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;
      const queryObj = {
        user: req.user.id,
      };

      const notifications = await Notification.find(queryObj)
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .populate("ticket")
        .exec();

      const count = await Notification.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: notifications,
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

  getBusType: async (req, res) => {
    try {
      const { id } = req.params;

      const busType = await BusTypes.findById(id);

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateBusType: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, seatNumber, price } = req.body;

      const busType = await BusTypes.findByIdAndUpdate(
        id,
        {
          name,
          seatNumber,
          price,
        },
        { new: true }
      );

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeBusType: async (req, res) => {
    try {
      const { id } = req.params;

      const busType = await BusTypes.findByIdAndDelete(id);

      res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default NotificationController;
