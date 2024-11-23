import axiosClient from "../Api/axiosClient";

const seatService = {
  // Lấy tất cả ghế
  getAllSeats: () => {
    const url = `/seats`;
    return axiosClient.get(url);
  },

  // Tạo mới một ghế
  createSeat: (data: { name: string; seatNumber: number; price: number }) => {
    const url = `/seats`;
    return axiosClient.post(url, data);
  },

  // Cập nhật thông tin ghế
  updateSeat: (
    seatId: string,
    data: {
      name?: string;
      seatNumber?: number;
      price?: number;
    }
  ) => {
    const url = `/seats/${seatId}`;
    return axiosClient.put(url, data);
  },

  // Xóa một ghế theo ID
  deleteSeat: (seatId: string) => {
    const url = `/seats/${seatId}`;
    return axiosClient.delete(url);
  },
};

export default seatService;
