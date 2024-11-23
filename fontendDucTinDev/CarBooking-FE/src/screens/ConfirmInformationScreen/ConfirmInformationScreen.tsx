// src/screens/app/ConfirmInformation.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { styles } from "./style";
import Header from "../../components/header";
import { Ionicons } from "@expo/vector-icons";
import { createTicket } from "./ticketmodel"; // Import hàm API
import { getPromotionByCode } from "./ticketmodel"; // Import hàm API
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"; // Thêm import useNavigation
import { RootStackParamList } from "../App.TicketBookingScreen/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfirmInformation: React.FC = ({ route }: any) => {
  const { selectedSeats, trip, seatCapacity } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // State để lưu giá trị input
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [finalDiscountValue, setFinalDiscountValue] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  // State để kiểm tra tính hợp lệ của số điện thoại
  const [phoneValid, setPhoneValid] = useState(true);

  const validatePhoneNumber = (number: string) => {
    // Kiểm tra nếu số điện thoại trống (khi bấm vào nhưng không nhập gì)
    if (!number) {
      setPhoneValid(false);
      setPhoneNumberError("Không được bỏ trống.");
      return;
    }

    // Kiểm tra có ký tự đặc biệt không (chỉ cho phép số)
    const specialCharRegex = /[^0-9]/;
    if (specialCharRegex.test(number)) {
      setPhoneValid(false);
      setPhoneNumberError("Vui lòng không nhập ký tự đặc biệt.");
      return;
    }

    // Kiểm tra số điện thoại có đủ 10 chữ số
    if (number.length !== 10) {
      setPhoneValid(false);
      setPhoneNumberError("Số điện thoại phải có 10 chữ số.");
      return;
    }

    // Nếu tất cả các điều kiện trên đều hợp lệ
    setPhoneValid(true);
    setPhoneNumberError(null); // Xóa thông báo lỗi
  };
  const validateFullName = (name: string) => {
    if (!name.trim()) {
      setFullNameError("Họ và Tên không được bỏ trống.");
      return false;
    } else if (name.trim().length < 3) {
      setFullNameError("Họ và Tên phải có ít nhất 3 ký tự.");
      return false;
    }
    setFullNameError(null); // Không có lỗi
    return true;
  };

  // Hàm xử lý khi nhập số điện thoại
  const handlePhoneChange = (number: string) => {
    setPhoneNumber(number);
    validatePhoneNumber(number); // Kiểm tra tính hợp lệ mỗi khi người dùng thay đổi
  };
  const handleFullNameChange = (text: string) => {
    setFullName(text);
    validateFullName(text); // Kiểm tra ngay khi nhập
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ hiện tại
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút hiện tại
    const day = date.getDate().toString().padStart(2, "0"); // Ngày hiện tại
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng hiện tại
    const year = date.getFullYear(); // Năm hiện tại
    return `${hours}:${minutes} - ${day}/${month}/${year}`; // Trả về ngày giờ đầy đủ
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleDiscount = async () => {
    if (!discountCode.trim()) {
      // Kiểm tra mã giảm giá có rỗng hay không
      alert("Vui lòng nhập mã giảm giá!"); // Hiển thị thông báo yêu cầu nhập mã
      return; // Dừng thực hiện nếu mã giảm giá trống
    }

    try {
      const token = "người dùng của bạn"; // Thay bằng cách lấy token thực tế
      const promotionData = await getPromotionByCode(discountCode, token);
      console.log(promotionData);

      if (promotionData) {
        let discount = 0;
        if (promotionData.discountType === "AMOUNT") {
          discount = promotionData.discountAmount;
        } else if (promotionData.discountType === "PERCENT") {
          discount =
            (promotionData.discountAmount / 100) *
            (selectedSeats.length * trip.price);
        }

        setFinalDiscountValue(discount); // Lưu giá trị giảm giá vào state
        setIsDiscountApplied(true); // Đánh dấu đã áp dụng mã giảm giá
        console.log("Giá trị giảm giá cuối cùng: ", discount);
      }
    } catch (error: any) {
      // Kiểm tra nếu lỗi có response từ server
      if (error.response) {
        // Lỗi từ server, in ra thông báo lỗi từ server
        console.error("Lỗi từ server: ", error.response.data);
        alert(
          `Lỗi: ${
            error.response.data.message ||
            "Đã xảy ra lỗi khi áp dụng mã giảm giá."
          }`
        );
      } else if (error.request) {
        // Nếu không có phản hồi từ server (lỗi mạng, timeout, v.v.)
        console.error("Không có phản hồi từ server: ", error.request);
        alert("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        // Lỗi khác (ví dụ lỗi cú pháp hoặc lỗi không xác định)
        console.error("Lỗi không xác định: ", error.message);
        alert("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
      }
    }
  };

  const handleRemoveDiscount = () => {
    setIsDiscountApplied(false); // Hủy mã giảm giá
    setDiscountCode(""); // Xóa mã giảm giá
    setFinalDiscountValue(0); // Reset giá trị giảm giá
  };

  const validateField = (field: string, fieldName: string) => {
    if (!field.trim()) {
      return `${fieldName} không được bỏ trống.`;
    }
    return null;
  };

  const Handlesticketcreation = async () => {
    // Kiểm tra các trường và lưu thông báo lỗi vào state
    const fullNameError = validateField(fullName, "Họ và Tên");
    const phoneNumberError = validateField(phoneNumber, "Số điện thoại");

    // Cập nhật thông báo lỗi
    setFullNameError(fullNameError);
    setPhoneNumberError(phoneNumberError);

    // Nếu có lỗi, không tiếp tục gửi dữ liệu
    if (fullNameError || phoneNumberError) {
      return;
    }
    try {
      // Dữ liệu gửi tới API
      const ticketData = {
        customerPhone: phoneNumber,
        customerName: fullName,
        note,
        trip: trip._id, // ID chuyến xe
        seatNumber: selectedSeats, // Danh sách ghế
        boardingPoint: trip.route.startDistrict,
        dropOffPoint: trip.route.endDistrict,
        discountCode: isDiscountApplied ? discountCode : "", // Mã giảm giá
      };

      // Lấy token từ AsyncStorage
      const token = await AsyncStorage.getItem("userToken"); // 'userToken' là tên key đã lưu token

      // Gọi API
      const response = await createTicket(ticketData, token);
      console.log(response);

      // Điều hướng người dùng về trang chính
      navigation.navigate("CreateticketsScreen", {
        ticket: response.ticket,
      }); // Điều chỉnh theo thực tế
    } catch (error: any) {
      // Kiểm tra nếu lỗi có response từ server
      if (error.response) {
        // Lỗi từ server, in ra thông báo lỗi từ server
        console.error("Lỗi từ server: ", error.response.data);

        // Kiểm tra và hiển thị thông báo lỗi từ hệ thống
        const errorMessage =
          error.response.data.message || "Đã xảy ra lỗi khi tạo vé.";

        alert(`Lỗi: ${errorMessage}`);
      } else if (error.request) {
        // Nếu không có phản hồi từ server (lỗi mạng, timeout, v.v.)
        console.error("Không có phản hồi từ server: ", error.request);
        alert("Không thể kết nối đến server. Vui lòng thử lại.");
      } else {
        // Lỗi khác (ví dụ lỗi cú pháp hoặc lỗi không xác định)
        console.error("Lỗi không xác định: ", error.message);
        alert("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.container}>
          <Header title="Chọn ghế xe" />
          <View style={styles.inputSection}>
            <Text style={styles.inputTitle}>Họ và Tên</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={24}
                color="#FF6347"
                style={styles.icon}
              />
              <TextInput
                placeholder="Nhập Họ và Tên"
                value={fullName}
                onChangeText={handleFullNameChange}
                autoCapitalize="words"
              />
            </View>
            {fullNameError && (
              <Text style={styles.errorText}>{fullNameError}</Text>
            )}

            <Text style={styles.inputTitle}>Số điện thoại</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={24}
                color="#FF6347"
                style={styles.icon}
              />
              <TextInput
                style={[!phoneValid && styles.inputError]}
                placeholder="Nhập Số điện thoại"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
              />
            </View>
            {phoneNumberError && (
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            )}

            <Text style={styles.inputTitle}>Ghi chú</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="clipboard-outline"
                size={24}
                color="#FF6347"
                style={styles.icon}
              />
              <TextInput
                style={[{ height: 80 }]}
                placeholder="Nhập Ghi chú"
                value={note}
                onChangeText={setNote}
                multiline
              />
            </View>

            <Text style={styles.inputTitle}>Mã giảm giá</Text>
            <View style={styles.discountSection}>
              <View style={styles.discountInputWrapper}>
                <Ionicons
                  name="pricetag-outline"
                  size={24}
                  color="#FF6347"
                  style={styles.icon}
                />
                <TextInput
                  style={[
                    styles.discountInput,
                    isDiscountApplied && styles.discountAppliedInput,
                  ]}
                  placeholder="Nhập mã giảm giá"
                  value={discountCode}
                  onChangeText={(text) => setDiscountCode(text.toUpperCase())}
                  editable={!isDiscountApplied}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.discountButton,
                  { backgroundColor: isDiscountApplied ? "red" : "#005C78" },
                ]}
                onPress={
                  isDiscountApplied ? handleRemoveDiscount : handleDiscount
                }
              >
                <Text style={[styles.discountButtonText, { color: "white" }]}>
                  {isDiscountApplied ? "Hủy mã" : "Áp dụng mã"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.heading}>Thông tin chuyến đi</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Thời gian xuất phát:</Text>
              <Text style={styles.detailText}>
                {formatDateTime(trip.departureTime)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Chuyến xe:</Text>
              <Text style={styles.detailText}>
                {trip.route.startProvince} - {trip.route.endProvince}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Điểm xuất phát:</Text>
              <Text
                style={[styles.detailText, styles.wrapText]}
                numberOfLines={2}
              >
                {trip.route.startDistrict}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Điểm đến:</Text>
              <Text style={styles.detailText}>{trip.route.endDistrict}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Số ghế đã chọn:</Text>
              <Text style={styles.detailText}>{selectedSeats.join(", ")}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Tổng tiền thanh toán:</Text>
              <Text style={styles.detailText}>
                {formatCurrency(
                  selectedSeats.length * trip.price - finalDiscountValue
                )}{" "}
                VND
              </Text>
            </View>
          </View>

          <View style={styles.confirmSection}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                Handlesticketcreation();
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConfirmInformation;
