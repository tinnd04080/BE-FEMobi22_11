import axiosClient from "../Api/axiosClient";

const busService = {
  //Lấy tất cả dữ liệu bus từ server
  getAllBus: () => {
    const url = "/buses";
    return axiosClient.get(url);
  },

  //Gửi dữ liệu bus routes lên server
  createBus: (data: {
    busTypeName: string;
    seatCapacity: number;
    priceFactor: number;
    licensePlate: string;
  }) => {
    const url = "/buses";
    return axiosClient.post(url, data);
  },

  //Cập nhật dữ liệu bus theo ID
  updateBus: (
    busId: string,
    data: {
      busTypeName?: string;
      seatCapacity?: number;
      priceFactor?: number;
      licensePlate?: string;
    }
  ) => {
    const url = `/buses/${busId}`;
    return axiosClient.put(url, data);
  },

  //Xoá bus theo ID
  deleteBus: (busId: string) => {
    const url = `/buses/${busId}`;
    return axiosClient.delete(url);
  },
};

export default busService;
