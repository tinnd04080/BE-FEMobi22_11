import { PAGINATION } from "../constants/index.js";
import Seats from "../models/seats.js";
import Bus from "../models/bus.js";

const SeatController = {
  // createSeat: async (req, res) => {
  //   try {
  //     const { bus, seatNumber, status } = req.body;

  //     const busInfo = await Bus.findById(bus).exec();

  //     if (!busInfo) {
  //       return res.status(404).json({
  //         message: "An error occurred, please try again",
  //       });
  //     }

  //     const seat = await new Seats({ bus, seatNumber, status }).save();

  //     res.json(seat);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Internal server error",
  //       error: error.message,
  //     });
  //   }
  // },
  createSeat: async (req, res) => {
    try {
      const { bus, seats } = req.body; // `seats` là mảng chứa thông tin về các ghế

      // Kiểm tra xem bus có tồn tại không
      const busInfo = await Bus.findById(bus).exec();
      if (!busInfo) {
        return res.status(404).json({
          message: "Bus not found, please try again",
        });
      }

      // Chuẩn bị dữ liệu cho từng ghế từ mảng `seats`
      const seatsData = seats.map((seat) => ({
        bus,
        seatNumber: seat.seatNumber,
        status: seat.status,
      }));

      // Dùng insertMany để thêm nhiều ghế cùng lúc
      const createdSeats = await Seats.insertMany(seatsData);

      res.json({
        message: "Seats created successfully",
        seats: createdSeats,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getAllSeats: async (req, res) => {
    try {
      const {
        page = PAGINATION.PAGE,
        limit = PAGINATION.LIMIT,
        sortBy = "createdAt",
        orderBy = "DESC",
        bus,
      } = req.query;

      const queryObj = {};
      if (bus) {
        queryObj.bus = bus;
      }

      const seats = await Seats.find(queryObj)
        .sort({
          [sortBy]: orderBy === "DESC" ? -1 : 1,
        })
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .populate("bus")
        .exec();

      const count = await Seats.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: seats,
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

  getSeat: async (req, res) => {
    try {
      const { id } = req.params;

      const seat = await Seats.findById(id).populate("bus").exec();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateSeat: async (req, res) => {
    try {
      const { id } = req.params;
      const { bus, seatNumber, status } = req.body;
      const busInfo = await Bus.findById(bus).exec();
      if (!busInfo) {
        return res.status(404).json({
          message: "An error occurred, please try again",
        });
      }
      const seat = await Seats.findByIdAndUpdate(
        id,
        {
          bus,
          seatNumber,
          status,
        },
        { new: true }
      ).exec();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeSeat: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Seats.findById(id).exec();

      const bus = await Bus.findById(data.bus).exec();

      const seat = await Seats.findByIdAndDelete(id).exec();

      res.json(seat);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default SeatController;
