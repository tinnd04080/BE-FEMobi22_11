import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Header from "../../components/header";
import { styles } from "./style";

interface RouteParams {
  pickup: string;
  dropoff: string;
  homeAddress: string;
  dropoffAddress: string;
  departure: string;
  destination: string;
  selectedDay: Date;
  selectedSeats: string[];
  totalPrice: number;
}

interface PassengerInfoScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: RouteParams }, "params">;
}

const PassengerInfoScreen: React.FC<PassengerInfoScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    pickup,
    dropoff,
    homeAddress,
    dropoffAddress,
    departure,
    destination,
    selectedDay,
    selectedSeats,
    totalPrice,
  } = route.params;

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Họ và tên không được để trống.");
      return false;
    }
    if (!phone.trim() || phone.length < 10 || !/^\d+$/.test(phone)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại phải có ít nhất 10 ký tự và chỉ chứa số."
      );
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ.");
      return false;
    }
    if (note.length > 200) {
      Alert.alert("Lỗi", "Ghi chú không được vượt quá 200 ký tự.");
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      return;
    }
    navigation.navigate("PaymentScreen", {
      name,
      phone,
      email,
      note,
      pickup,
      dropoff,
      homeAddress,
      dropoffAddress,
      departure,
      destination,
      selectedDay,
      selectedSeats,
      totalPrice,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Xác nhận thông tin" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Họ và tên:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ và tên"
            placeholderTextColor="#aaa"
            autoCapitalize="words"
          />
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Nhập số điện thoại"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Ghi chú (Tối đa 200 ký tự):</Text>
          <TextInput
            style={styles.input}
            value={note}
            onChangeText={(text) => setNote(text.slice(0, 200))}
            placeholder="Nhập ghi chú"
            placeholderTextColor="#aaa"
            multiline
            maxLength={200}
          />
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Thông tin đã nhập:</Text>
            <Text style={styles.infoText}>
              Họ và tên: {name || "Chưa nhập"}
            </Text>
            <Text style={styles.infoText}>
              Số điện thoại: {phone || "Chưa nhập"}
            </Text>
            <Text style={styles.infoText}>Email: {email || "Chưa nhập"}</Text>
            <Text style={styles.infoText}>Ghi chú: {note || "Không có"}</Text>
            <Text style={styles.infoText}>Hình thức đón: {pickup}</Text>
            {pickup === "Tại nhà" && (
              <Text style={styles.infoText}>Địa chỉ nhà: {homeAddress}</Text>
            )}
            <Text style={styles.infoText}>Hình thức trả: {dropoff}</Text>
            {dropoff === "Tại nhà" && (
              <Text style={styles.infoText}>Địa chỉ trả: {dropoffAddress}</Text>
            )}
            <Text style={styles.infoText}>Điểm khởi hành: {departure}</Text>
            <Text style={styles.infoText}>Điểm đến: {destination}</Text>
            <Text style={styles.infoText}>
              Ngày: {selectedDay.toLocaleDateString("vi-VN")}
            </Text>
            <Text style={styles.infoText}>
              Ghế đã chọn: {selectedSeats.join(", ")}
            </Text>
            <Text style={styles.infoText}>Tổng giá: {totalPrice} VNĐ</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PassengerInfoScreen;
