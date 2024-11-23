// tripApi.ts
// Chứa các hàm giúp tương tác với API
import axiosClient from "../Api/axiosClient";

const tripApi = {
  getTripsByRoute: async (
    startProvince: string,
    endProvince: string,
    departureDate: Date
  ) => {
    try {
      const response = await axiosClient.get("/trips/search", {
        params: {
          startProvince,
          endProvince,
          departureDate: departureDate.toISOString().split("T")[0],
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching trips:", error);
      throw error;
    }
  },
};

export default tripApi;
