import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import Button from "../../../components/Button/button";
import authApi from "../../../services/Auth/authApi";
import { styles } from "./style";

const OtpScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");

  // Xử lý khi người dùng nhấn nút "Xác Minh"
  const handleVerifyOtp = async () => {
    const data = { email: email, otp: otp };

    try {
      // Gọi API xác minh OTP
      const response = await authApi.verifyOtp(data);
      console.log("OTP xác minh thành công:", response.data);

      // Hiển thị thông báo và chuyển hướng người dùng
      Alert.alert("Thông báo", "Xác minh OTP thành công.");
      navigation.navigate("LoginScreen"); // Chuyển đến màn hình chính sau khi xác minh thành công
    } catch (error) {
      console.error("Lỗi xác minh OTP:", error);
      // Hiển thị thông báo lỗi nếu OTP không hợp lệ
      Alert.alert("Lỗi", "OTP không hợp lệ, vui lòng thử lại.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Xác Minh OTP</Text>
      <Text style={styles.subtitle}>
        Vui lòng nhập mã OTP đã được gửi đến địa chỉ email: {email}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
      </View>
      <Button title="Xác Minh" onPress={handleVerifyOtp} />
    </ScrollView>
  );
};

export default OtpScreen;
