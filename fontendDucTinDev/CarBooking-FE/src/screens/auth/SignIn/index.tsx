import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import authApi from "../../../services/Auth/authApi";
import Checkbox from "../../../components/CheckBox";
import { styles } from "./style";
import Button from "../../../components/Button/button";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");

      if (savedEmail) setEmail(savedEmail);
      if (savedPassword) setPassword(savedPassword);
    };

    loadCredentials();
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const validateInputs = () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email.");
      return false;
    }
    if (!password) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await authApi.signIn({ email, password });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem("token", token);

        // Nếu chọn nhớ mật khẩu, lưu thông tin đăng nhập
        if (rememberMe) {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
        } else {
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("password");
        }

        Alert.alert("Thành công", "Đăng nhập thành công!");
        // Điều hướng đến màn hình chính hoặc bất kỳ màn hình nào sau khi đăng nhập
        navigation.navigate("MainTabs");
      } else {
        Alert.alert("Lỗi", "Đăng nhập không thành công.");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      Alert.alert("Lỗi", "Thông tin đăng nhập không chính xác.");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Quên mật khẩu?",
      "Vui lòng liên hệ với bộ phận hỗ trợ để lấy lại mật khẩu."
    );
    // Có thể thêm điều hướng đến màn hình quên mật khẩu nếu có
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng Nhập</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={{ color: "#007BFF" }}>
              {isPasswordVisible ? "Ẩn" : "Hiện"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            label="Nhớ mật khẩu"
            isChecked={rememberMe}
            onChange={setRememberMe}
          />
        </View>

        <Button title="Đăng Nhập" onPress={handleLogin} style={styles.button} />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.link}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
