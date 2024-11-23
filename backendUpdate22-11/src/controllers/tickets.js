import {
  DISCOUNT_TYPE,
  NOTIFICATION_TYPE,
  PAGINATION,
  ROLE,
  SEAT_STATUS,
  TICKET_STATUS,
} from "../constants/index.js";
import Tickets from "../models/tickets.js";
import randomNumber from "../utils/randomNumber.js";
import Bus from "../models/bus.js";
import createVNPayPaymentUrl from "../utils/payment.js";
import Notification from "../models/notifications.js";
import Trip from "../models/trips.js";
import Seat from "../models/seats.js";
import Promotion, { PromotionUsage } from "../models/promotion.js";
import Seats from "../models/seats.js";
import dayjs from "dayjs";
import Permission from "../models/permissions.js";
import BusRoutes from "../models/busRoutes.js";

const getListTicket = async (page, limit, queryObj = {}) => {
  const tickets = await Tickets.find(queryObj)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .populate(["user", "trip"])
    .exec();

  const count = await Tickets.countDocuments();

  const totalPage = Math.ceil(count / limit);
  const currentPage = Number(page);

  return {
    tickets,
    totalPage,
    currentPage,
  };
};

const updateSeatStt = async ({ tripId, seatNumber, status }) => {
  const updateSeatTask = seatNumber.map((seatName) => {
    return Seat.findOneAndUpdate(
      {
        trip: tripId,
        seatNumber: seatName,
      },
      {
        status,
      }
    );
  });
  await Promise.all(updateSeatTask);
};

export const ticketUpdateStt = async ({ ticketId, status }) => {
  const ticket = await Tickets.findByIdAndUpdate(
    ticketId,
    {
      status,
    },
    { new: true }
  )
    .populate("trip")
    .exec();
  // In dữ liệu của ticket ra console
  console.log("Dữ liệu của ticket:", ticket);
  // save notification
  switch (status) {
    case TICKET_STATUS.CANCELED: {
      await new Notification({
        ticket: ticket._id,
        type: NOTIFICATION_TYPE.TICKET_CANCELED,
        user: ticket.user,
      }).save();

      // cập nhật trạng thái => ghế trống
      await updateSeatStt({
        tripId: ticket.trip._id,
        seatNumber: ticket.seatNumber,
        status: SEAT_STATUS.EMPTY,
      });
      break;
    }

    case TICKET_STATUS.PAYMENT_FAILED: {
      await new Notification({
        ticket: ticket._id,
        type: NOTIFICATION_TYPE.TICKET_BOOK_FAILED,
        user: ticket.user,
      }).save();

      // cập nhật trạng thái => ghế trống
      await updateSeatStt({
        tripId: ticket.trip._id,
        seatNumber: ticket.seatNumber,
        status: SEAT_STATUS.EMPTY,
      });
      break;
    }

    case TICKET_STATUS.PAID: {
      await new Notification({
        ticket: ticket._id,
        type: NOTIFICATION_TYPE.TICKET_BOOK_SUCCESS,
        user: ticket.user,
      }).save();
      break;
    }

    default: {
    }
  }

  return ticket;
};

const TicketController = {
  createTicket: async (req, res) => {
    try {
      const {
        customerPhone,
        customerName,
        note,
        trip,
        seatNumber,
        boardingPoint,
        dropOffPoint,
        status,
        discountCode,
      } = req.body;
      // Kiểm tra thông tin các trường bắt buộc
      if (!customerPhone || !customerName || !boardingPoint || !dropOffPoint) {
        return res.status(400).json({
          message: "Vui lòng nhập đầy đủ thông tin yêu cầu.",
        });
      }
      const user = req.user.id;
      const code = `MD${randomNumber(5)}`;

      // kiểm tra thông tin chuyến xe
      const tripInfo = await Trip.findById(trip).populate("bus route").exec();
      if (!tripInfo) {
        return res.status(404).json({
          message: "Chuyến xe không tồn tại",
        });
      }

      if (dayjs().isAfter(tripInfo.departureTime)) {
        return res.status(400).json({
          message: "Chuyến xe đã khởi hành",
        });
      }

      let totalAmount = tripInfo.price * seatNumber.length;

      // kiểm tra trạng thái ghế
      for await (let seat of seatNumber) {
        const seatInfo = await Seats.findOne({
          seatNumber: seat,
          trip: tripInfo._id,
        }).exec();

        if (!seatInfo) {
          return res.status(404).json({
            message: "Không tìm thấy ghế",
          });
        }

        if (seatInfo.status === SEAT_STATUS.SOLD) {
          return res.status(406).json({
            message: `Ghế ${seat} đã có người đặt`,
          });
        }
      }

      // cập nhật trạng thái ghế
      await updateSeatStt({
        tripId: tripInfo._id,
        seatNumber,
        status: SEAT_STATUS.SOLD,
      });

      let discount;
      if (discountCode) {
        discount = await Promotion.findOne({ code: discountCode }).exec();
        if (!discount) {
          return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
        }

        if (discount.discountType === DISCOUNT_TYPE.AMOUNT) {
          totalAmount -= discount.discountAmount;
        } else {
          const decreasePrice = (totalAmount * discount.discountAmount) / 100;
          totalAmount -= decreasePrice;
        }

        totalAmount = totalAmount >= 0 ? totalAmount : 0;
      }

      const ticket = await new Tickets({
        user,
        customerPhone,
        customerName,
        note,
        trip,
        code,
        seatNumber,
        boardingPoint,
        dropOffPoint,
        status,
        totalAmount,
      }).save();

      // mã giảm giá
      if (discountCode) {
        await new PromotionUsage({
          user,
          ticket: ticket._id,
          promotion: discount._id,
        }).save();
      }

      // Lấy thông tin chi tiết vé
      const ticketInfo = await Tickets.findById(ticket._id)
        .populate({
          path: "trip",
          populate: {
            path: "bus route",
          },
        })
        .exec();

      res.json({
        message: "Create ticket successfully",
        ticket: ticketInfo,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi tạo vé",
        error: error.message,
      });
    }
  },
  getTickets: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const { tickets, currentPage, totalPage } = await getListTicket(
        page,
        limit
      );

      res.json({
        data: tickets,
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

  getMyTickets: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      const queryObj = {
        user: req.user.id,
      };

      const { tickets, currentPage, totalPage } = await getListTicket(
        page,
        limit,
        queryObj
      );

      res.json({
        data: tickets,
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

  getTicket: async (req, res) => {
    try {
      const { id } = req.params;

      // Tìm vé theo id và populate thông tin người dùng và chuyến xe
      const ticket = await Tickets.findById(id)
        .populate(["user", "trip"]) // Đảm bảo lấy thông tin chuyến xe
        .exec();

      if (!ticket) {
        return res.status(404).json({
          message: "Ticket not found",
        });
      }

      // Lấy thông tin khuyến mãi nếu có
      let promotion = null;
      const promotionUsage = await PromotionUsage.findOne({
        ticket: ticket._id,
      }).exec();
      if (promotionUsage) {
        promotion = await Promotion.findById(promotionUsage.promotion).exec();
      }

      // Lấy thông tin về chuyến xe từ bảng Trip
      const trip = ticket.trip; // Chúng ta đã populate trip trong ticket
      if (!trip) {
        return res.status(404).json({
          message: "Trip not found for this ticket",
        });
      }

      // Nếu route là một tham chiếu tới bảng BusRoutes, ta populate thêm thông tin tuyến xe
      let route = trip.route; // Lấy thông tin tuyến từ trip
      if (typeof route === "object" && route._id) {
        // Populate thông tin từ bảng BusRoutes
        route = await BusRoutes.findById(route._id).exec();
      }

      // Lấy thông tin về xe từ bảng Bus
      const bus = await Bus.findById(trip.bus).exec();
      if (!bus) {
        return res.status(404).json({
          message: "Bus not found for this trip",
        });
      }

      // Trả về thông tin vé, chuyến xe, xe và người lái xe
      res.json({
        ...ticket.toJSON(),
        trip: {
          id: trip._id,
          route: route
            ? {
                startProvince: route.startProvince,
                startDistrict: route.startDistrict,
                endProvince: route.endProvince,
                endDistrict: route.endDistrict,
                duration: route.duration,
                status: route.status,
                distance: route.distance,
                pricePerKM: route.pricePerKM,
              }
            : trip.route, // Trả về toàn bộ thông tin của tuyến nếu có
          departureTime: trip.departureTime, // Thời gian khởi hành
          arrivalTime: trip.arrivalTime, // Thời gian đến
          price: trip.price, // Giá vé của chuyến xe
        },
        bus: {
          id: bus._id,
          busType: bus.busType, // Loại xe
          licensePlate: bus.licensePlate, // Biển số xe
          driver: bus.driver, // Thông tin người lái xe
        },
        promotion,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateTicketStatus: async (req, res) => {
    try {
      const user = req.user;
      const { id } = req.params;
      const { status } = req.body;

      const ticketInfo = await Tickets.findById(id).exec();
      const tripInfo = await Trip.findById(ticketInfo.trip).exec();

      const userRole = await Permission.findOne({ user: user.id }).exec();

      const isGTE5h =
        Math.floor(
          (dayjs(tripInfo.departureTime).diff(dayjs()) / (1000 * 60 * 60)) % 24
        ) >= 5;

      if (
        userRole === ROLE.CUSTOMER &&
        status === TICKET_STATUS.CANCELED &&
        !isGTE5h
      ) {
        return res.status(400).json({
          message: "Bạn chỉ có thể huỷ vé trước khi chuyến xe xuất phát 5h",
        });
      }

      const ticket = await ticketUpdateStt({ ticketId: id, status });

      res.json(ticket);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  createPaymentUrl: async (req, res) => {
    try {
      const { ticketId } = req.body;

      const ticket = await Tickets.findById(ticketId).exec();
      if (!ticket) {
        return res.status(404).json({ message: "Không tìm thấy vé" });
      }

      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      const orderId = `BOOKING_${ticket._id}`;
      const paymentUrl = await createVNPayPaymentUrl({
        ipAddr,
        orderId,
        amount: ticket.totalAmount,
        orderInfo: `Thanh toan ve xe ${orderId}`,
      });

      res.json(paymentUrl);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default TicketController;
