import axiosClient from "../../services/Api/axiosClient";

export const getTicket = async (id: string, token: string) => {
  try {
    const response = await axiosClient.get(`/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token xác thực nếu cần
      },
    });
    return response.data; // Trả về thông tin vé
  } catch (error) {
    console.error("Error fetching ticket: ", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
