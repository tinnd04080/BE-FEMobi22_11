// axiosClient được thiết lập để giao tiếp với API Node.js + Express:
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Định nghĩa URL API gốc
const axiosClient = axios.create({
  baseURL: "http://192.168.2.69:8080/api/", // Thay bằng URL API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Thiết lập interceptor để tự động thêm token vào header nếu có
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
