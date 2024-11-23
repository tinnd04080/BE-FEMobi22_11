// {api clients chứa các hàm giúp tương tác với API }
import axiosClient from "../Api/axiosClient";

const authApi = {
  signIn: (data: { email: string; password: string }) => {
    return axiosClient.post("auth/login", data);
  },
  signUp: (data: {
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    cccd: string;
    password: string;
  }) => {
    return axiosClient.post("auth/register", data); // Đường dẫn đăng ký
  },
  verifyOtp: (data: { email: String; otp: string }) => {
    return axiosClient.post("/auth/verify-otp", data);
  },
};

export default authApi;
