import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./style";
import Header from "../../components/header";
import { useNavigation } from "@react-navigation/native"; // Thêm import useNavigation
import { string } from "yup";
import { StackNavigationProp } from "@react-navigation/stack";
// Định nghĩa kiểu cho props của màn hình TicketBookingScreen
interface TicketBookingScreenProps {
  route: {
    params: {
      trips: any[]; // Thêm trips vào kiểu dữ liệu của params
      selectedDay: Date;
      departure: string;
      destination: string;
    };
  };
}

// Định nghĩa kiểu cho các tham số của SeatSelectionScreen
interface SeatSelectionScreenParams {
  ticketPrice: number;
  selectedDay: Date;
  departure: string;
  destination: string;
}

// Định nghĩa kiểu cho stack navigation
export type RootStackParamList = {
  TicketBookingScreen: undefined;
  SeatSelectionScreen: { /* tripId: string */ trip: any };
  OtpScreen: { email: string };
  LoginScreen: undefined;
  ConfirmInformation: {
    // Cập nhật kiểu tham số cho màn hình ConfirmInformation
    selectedSeats: string[]; // Mảng các ghế đã chọn
    trip: any; // Hoặc thay 'any' bằng kiểu dữ liệu thực tế của trip
    seatCapacity: number; // Sức chứa ghế
  };
  CreateticketsScreen: {
    // Thông tin màn hình thành công
    ticket: {
      code: string; // Mã vé
      customerName: string; // Tên khách hàng
      customerPhone: string; // Số điện thoại khách hàng
      trip: {
        route: {
          startPoint: string; // Điểm bắt đầu
          endPoint: string; // Điểm kết thúc
        };
      };
      boardingPoint: string; // Điểm đón
      dropOffPoint: string; // Điểm trả
      seatNumber: string[]; // Danh sách ghế
      totalAmount: number; // Tổng tiền
      status: string; // Trạng thái vé
    };
  };
};

const TicketBookingScreen: React.FC<TicketBookingScreenProps> = ({ route }) => {
  const { trips, selectedDay } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi ISO
    const hours = date.getUTCHours().toString().padStart(2, "0"); // Lấy giờ và đảm bảo 2 chữ số
    const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Lấy phút và đảm bảo 2 chữ số
    return `${hours}:${minutes}`; // Trả về giờ và phút
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
  const handleSelectTrip = (/* tripId: string */ trip: any) => {
    navigation.navigate("SeatSelectionScreen", { trip });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Chọn tuyến xe" />
      <View style={styles.dateDisplayContainer}>
        <Text style={styles.currentDateText}>
          Ngày khởi hành:{" "}
          {new Date(trips[0].departureTime).toLocaleDateString("vi-VN")}
        </Text>
        <Text style={styles.routeDisplayText}>
          Tuyến xe: {trips[0].route.startProvince} -{" "}
          {trips[0].route.endProvince}
        </Text>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.customButtonText}>Chọn ngày khác</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDay}
          mode="date"
          display="default"
          minimumDate={new Date()}
          // onChange={handleDateChange}
        />
      )}

      <FlatList
        data={trips}
        renderItem={({ item }) => (
          <View style={styles.ticket}>
            <Text style={styles.ticketInfo}>
              Giờ khởi hành: {formatTime(item.departureTime)}{" "}
            </Text>
            <Text style={styles.ticketInfo}>
              Thời gian đến dự kiến: {formatDateTime(item.arrivalTime)}{" "}
            </Text>
            <Text style={styles.ticketPrice}>
              Giá vé: {formatCurrency(item.price)} / ghế
            </Text>
            <Text style={styles.ticketType}>
              Loại xe: {item.bus.busTypeName}{" "}
            </Text>
            <Text style={styles.availableSeats}>Ghế trống: </Text>
            <Text style={styles.totalSeats}>
              Tổng số ghế: {item.bus.seatCapacity}
            </Text>
            <Text style={styles.totalSeats}>id chuyến xe: {item._id}</Text>
            <TouchableOpacity
              style={styles.selectTripButton}
              onPress={() => handleSelectTrip(item)} // Đặt hàm vào đúng vị trí
            >
              <Text style={styles.selectTripButtonText}>Chọn Chuyến</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ticketContainer}
      />
    </SafeAreaView>
  );
};

export default TicketBookingScreen;
