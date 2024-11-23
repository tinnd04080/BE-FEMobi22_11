import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./style";
import authApi from "../../../services/Auth/authApi";
import { StackNavigationProp } from "@react-navigation/stack"; // Thêm import này
import { RootStackParamList } from "../../App.TicketBookingScreen";

// Thêm khai báo kiểu cho navigation
type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OtpScreen",
  "LoginScreen"
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp; // Định nghĩa kiểu cho navigation
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Tên người dùng phải có ít nhất 4 ký tự")
      .required("Vui lòng nhập tên người dùng"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại chỉ chứa chữ số")
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .required("Vui lòng nhập số điện thoại"),
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    cccd: Yup.string()
      .matches(/^[0-9]+$/, "CCCD chỉ chứa chữ số")
      .min(9, "CCCD phải có ít nhất 9 chữ số")
      .required("Vui lòng nhập số CCCD"),
  });

  const handleRegister = async (values: {
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    cccd: string;
    password: string;
  }) => {
    try {
      // Gọi API đăng ký
      const response = await authApi.signUp({
        username: values.username,
        email: values.email,
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        cccd: values.cccd,
        password: values.password,
      });

      // Nếu đăng ký thành công
      Alert.alert("Thông báo", "Đăng ký thành công, vui lòng kiểm tra mã OTP.");

      // Chuyển hướng tới màn hình OTP
      navigation.navigate("OtpScreen", { email: values.email });
    } catch (error: any) {
      // Xử lý lỗi
      if (error.response) {
        Alert.alert(
          "Lỗi",
          error.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại."
        );
      } else if (error.request) {
        Alert.alert("Lỗi", "Không thể kết nối với máy chủ. Vui lòng thử lại.");
      } else {
        Alert.alert("Lỗi", "Có lỗi không xác định xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Đăng Ký</Text>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            fullName: "",
            cccd: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Tên người dùng */}
              <Text style={styles.label}>Tên người dùng</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập tên người dùng"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  style={styles.input}
                />
              </View>
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập email của bạn"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Mật khẩu */}
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập mật khẩu"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry={!isPasswordVisible}
                  style={styles.input}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Text style={styles.toggle}>
                    {isPasswordVisible ? "Ẩn" : "Hiện"}
                  </Text>
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Số điện thoại */}
              <Text style={styles.label}>Số điện thoại</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập số điện thoại"
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              {/* Họ và tên */}
              <Text style={styles.label}>Họ và tên</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập họ và tên"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  style={styles.input}
                />
              </View>
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              {/* CCCD */}
              <Text style={styles.label}>CCCD</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập số CCCD"
                  value={values.cccd}
                  onChangeText={handleChange("cccd")}
                  onBlur={handleBlur("cccd")}
                  style={styles.input}
                />
              </View>
              {touched.cccd && errors.cccd && (
                <Text style={styles.errorText}>{errors.cccd}</Text>
              )}

              {/* Nút Đăng Ký */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Đăng Ký</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Liên kết đến trang đăng nhập */}
        <TouchableOpacity
          onPress={() =>
            // Dùng values từ Formik ở trong phạm vi form
            navigation.navigate("LoginScreen")
          }
        >
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
