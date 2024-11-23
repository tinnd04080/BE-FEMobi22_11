import axios from "axios";
import axiosClient from "../../services/Api/axiosClient";
export interface TicketData {
  customerPhone: string;
  customerName: string;
  note: string;
  trip: string;
  seatNumber: string[];
  boardingPoint: string;
  dropOffPoint: string;
  discountCode?: string;
}
export const createTicket = async (data: TicketData, token: any) => {
  try {
    const response = await axiosClient.post(`/tickets/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Dữ liệu phản hồi
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Truy cập thuộc tính message
    } else {
      console.error("Unknown error", error);
    }
  }
};
export const getPromotionByCode = async (code: string, token: string) => {
  try {
    const response = await axiosClient.get(`promotions/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`, // nếu cần
      },
    });
    return response.data; // Trả về thông tin khuyến mãi
  } catch (error) {
    console.error("Error fetching promotion: ", error);
    throw error; // ném lỗi để xử lý ở nơi gọi hàm
  }
};
