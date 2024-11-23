import axios from "axios";
import axiosClient from "../../services/Api/axiosClient";
// API Call để lấy ghế của chuyến xe
export const getSeatsForTrip = async (tripId: string) => {
  try {
    const response = await axiosClient.get(`/trips/${tripId}/busseats`);
    return response.data; // Dữ liệu ghế trả về
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};
