import cron from "node-cron";
import Tickets from "../models/tickets.js";
import { NOTIFICATION_TYPE, TICKET_STATUS } from "../constants/index.js";
import dayjs from "dayjs";
import { ticketUpdateStt } from "../controllers/tickets.js";
import Notification from "../models/notifications.js";

const TIME_TO_CANCELED = 30; // khoảng thời gian chờ thanh toán, sau thời gian này vé sẽ bị huỷ bởi hệ thống

const cronJobInitial = async () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const tickets = await Tickets.find({
        status: TICKET_STATUS.INITIAL,
      }).exec();

      for await (let ticket of tickets) {
        const expiredTime = dayjs(ticket.createdAt).add(
          TIME_TO_CANCELED,
          "minute"
        );

        const remainingTime = dayjs(expiredTime).diff(dayjs(), "minute");

        if (remainingTime <= 0) {
          // nếu đã quá 30p không thanh toán => huỷ
          await ticketUpdateStt({
            ticketId: ticket._id,
            status: TICKET_STATUS.CANCELED,
          });
        } else if (remainingTime <= 5) {
          // thông báo thanh toán vé trước khi bị huỷ 5p
          await new Notification({
            user: ticket.user,
            type: NOTIFICATION_TYPE.PAYMENT_REMIND,
            ticket: ticket._id,
          }).save();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export default cronJobInitial;
