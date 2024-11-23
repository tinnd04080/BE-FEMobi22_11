import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Header from "../../components/header";
import { styles } from "./style";

interface PaymentScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<
    {
      params: {
        name: string;
        phone: string;
        email: string;
        pickup: string;
        dropoff: string;
        departure: string;
        destination: string;
        selectedDay: Date;
        selectedSeats: string[];
        totalPrice: number;
      };
    },
    any
  >;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route, navigation }) => {
  const {
    name,
    phone,
    email,
    pickup,
    dropoff,
    departure,
    destination,
    selectedDay,
    selectedSeats,
    totalPrice,
  } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header title="Thanh toán" />
      <View style={styles.container}>
        <Text style={styles.selectPaymentLabel}>
          Hãy chọn phương thức thanh toán
        </Text>
        <TouchableOpacity
          style={styles.paymentMethodButton}
          onPress={() => navigation.navigate("BankTransferScreen")}
        >
          <Text style={styles.paymentMethodText}>Chuyển khoản</Text>
        </TouchableOpacity>

        <View style={styles.ticketDetailsContainer}>
          <Text style={styles.ticketDetailsLabel}>Chi tiết vé</Text>
          <View style={styles.ticketContent}>
            <View style={styles.qrCodePlaceholder}>
              <Text style={styles.qrCodeText}>QR CODE</Text>
            </View>
            <View style={styles.ticketInfo}>
              <Text style={styles.infoText}>Mã vé: MD12302</Text>
              <Text style={styles.infoText}>
                Ngày khởi hành: {selectedDay.toLocaleDateString("vi-VN")}{" "}
                {selectedDay.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text style={styles.infoText}>
                Chờ thanh toán:{" "}
                <Text style={styles.price}>
                  {totalPrice.toLocaleString("vi-VN")}Đ
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>
              Điểm khởi hành: <Text style={styles.boldText}>{departure}</Text>
            </Text>
            <Text style={styles.routeText}>
              Điểm đến: <Text style={styles.boldText}>{destination}</Text>
            </Text>
            <Text style={styles.routeText}>
              Vị trí:{" "}
              <Text style={styles.boldText}>{selectedSeats.join(", ")}</Text>
            </Text>
            <Text style={styles.routeText}>
              Họ và tên: <Text style={styles.boldText}>{name}</Text>
            </Text>
            <Text style={styles.routeText}>
              Số điện thoại: <Text style={styles.boldText}>{phone}</Text>
            </Text>
            <Text style={styles.routeText}>
              Email: <Text style={styles.boldText}>{email}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalPrice}>
            {totalPrice.toLocaleString("vi-VN")}Đ
          </Text>
        </View>
        <Text style={styles.paymentNote}>
          Thanh toán trong 59 phút 00 giây. Vé sẽ tự động hủy nếu không thanh
          toán.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
