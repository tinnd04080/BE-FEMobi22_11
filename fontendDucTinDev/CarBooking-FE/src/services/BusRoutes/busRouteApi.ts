import axiosClient from "../Api/axiosClient";

const busRoute = {
  // Lấy tất cả dữ liệu bus routes từ server
  getAllBusRoutes: (routeData: {
    startProvince: string;
    endProvince: string;
  }) => {
    const url = `/bus-routes?startProvince=${routeData.startProvince}&endProvince=${routeData.endProvince}`;
    return axiosClient.get(url);
  },

  // Gửi dữ liệu bus routes lên server
  createBusRoute: (data: {
    startProvince: string;
    startDistrict: string;
    endProvince: string;
    endDistrict: string;
    duration: string;
    status?: string;
    distance: number;
    pricePerKM: number;
  }) => {
    const url = "/bus-routes";
    return axiosClient.post(url, data);
  },

  // Cập nhật dữ liệu bus route theo ID
  updateBusRoute: (
    id: string,
    data: {
      startProvince?: string;
      startDistrict?: string;
      endProvince?: string;
      endDistrict?: string;
      duration?: string;
      status?: string;
      distance?: number;
      pricePerKM?: number;
    }
  ) => {
    const url = `/bus-routes/${id}`;
    return axiosClient.put(url, data);
  },

  // Xóa bus route theo ID
  deleteBusRoute: (id: string) => {
    const url = `/bus-routes/${id}`;
    return axiosClient.delete(url);
  },
};

export default busRoute;
