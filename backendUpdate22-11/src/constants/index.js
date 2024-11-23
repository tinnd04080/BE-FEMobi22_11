export const ROLE = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
};

export const ROLE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export const PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

export const BUS_ROUTES_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};

export const SEAT_STATUS = {
  EMPTY: "EMPTY",
  SOLD: "SOLD",
};

export const TICKET_STATUS = {
  INITIAL: "INITIAL",
  PAID: "PAID",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  CANCELED: "CANCELED",
};

export const NOTIFICATION_TYPE = {
  PAYMENT_REMIND: "PAYMENT_REMIND", // nhắc thanh toán vé
  TICKET_BOOK_SUCCESS: "TICKET_BOOK_SUCCESS", // thanh toán thành công
  TICKET_BOOK_FAILED: "TICKET_BOOK_FAILED", // thanh toán thất bại
  TICKET_CANCELED: "TICKET_CANCELED", // vé bị huỷ
};

export const DISCOUNT_TYPE = {
  AMOUNT: "AMOUNT",
  PERCENT: "PERCENT",
};

export const ISVERIFIED_TYPE = {
  TRUE: "Đã xác minh ",
  FALSE: "Chưa xác minh",
};
