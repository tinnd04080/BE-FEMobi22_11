import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { getTicket } from "../../screens/CreateticketsScreen/showticket";
import { Image } from "react-native"; // Đảm bảo nhập đúng Image từ react-native

const SuccessScreen = ({ route }: any) => {
  const { ticket } = route.params;
  const idticket = ticket._id; //"674064e71ba977f5828b3b04"
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State cho RefreshControl
  const [error, setError] = useState<string | null>(null);
  const token = "your-auth-token";

  console.log("Dữ liệu trả về", ticketData);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await getTicket(idticket, token);
      setTicketData(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Không thể tải thông tin vé.");
      setLoading(false);
    }
  };

  // Xử lý khi kéo để làm mới
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await getTicket(idticket, token);
      setTicketData(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải lại thông tin vé.");
    } finally {
      setRefreshing(false);
    }
  }, [idticket, token]);

  useEffect(() => {
    fetchTicket();
  }, [idticket, token]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!ticketData) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Dữ liệu vé không hợp lệ</Text>
      </View>
    );
  }

  // Các hàm định dạng
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const formatLicensePlate = (licensePlate: string) => {
    // Biểu thức chính quy để chia biển số thành các phần
    const regex = /^(\d{2})([a-zA-Z])(\d{3})(\d{2})$/;
    const regexFourDigit = /^(\d{2})([a-zA-Z])(\d{4})$/; // Đối với biển số có 4 chữ số

    const match = licensePlate.match(regex);
    const matchFourDigit = licensePlate.match(regexFourDigit);

    if (match) {
      // Định dạng cho trường hợp biển số có 3 chữ số sau
      return `${match[1]}${match[2].toUpperCase()}-${match[3]}.${match[4]}`;
    } else if (matchFourDigit) {
      // Định dạng cho trường hợp biển số có 4 chữ số sau
      return `${matchFourDigit[1]}${matchFourDigit[2].toUpperCase()}-${
        matchFourDigit[3]
      }`;
    }

    // Nếu không khớp với bất kỳ định dạng nào, trả về biển số gốc
    return licensePlate;
  };
  // Hàm xử lý hiển thị tình trạng vé
  const getStatusText = (status: string) => {
    switch (status) {
      case "INITIAL":
        return "CHƯA THANH TOÁN";
      case "PAID":
        return "ĐÃ THANH TOÁN";
      case "CANCELED":
        return "VÉ BỊ HỦY";
      case "PAYMENT_FAILED":
        return "THANH TOÁN THẤT BẠI";
      default:
        return "Tình trạng không xác định";
    }
  };

  // Hàm xử lý màu sắc của tình trạng vé
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "#00796b"; // Màu xanh dương cho đã thanh toán
      case "INITIAL":
        return "#ffa000"; // Màu cam cho chưa thanh toán
      case "CANCELED":
        return "#d32f2f"; // Màu đỏ cho bị hủy
      case "PAYMENT_FAILED":
        return "#f44336"; // Màu đỏ cho thất bại thanh toán
      default:
        return "#000000"; // Màu đen mặc định
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.ticketBox}>
        {/* Tiêu đề chính */}
        <Text style={styles.mainTitle}>Chi tiết vé được đặt</Text>

        {/* Phần 1: Thông tin về nhà xe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin về nhà xe</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mã vé:</Text>
            <Text style={styles.valueHighlight}>{ticketData.code}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Chuyến xe:</Text>
            <Text style={styles.value}>
              {ticketData.trip.route.startProvince} -{" "}
              {ticketData.trip.route.endProvince}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Điểm xuất phát:</Text>
            <Text style={styles.value}>
              {ticketData.trip.route.startDistrict}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Điểm đến:</Text>
            <Text style={styles.value}>
              {ticketData.trip.route.endDistrict}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thời gian xuất phát:</Text>
            <Text style={styles.value}>
              {formatDateTime(ticketData.trip.departureTime)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thời gian dự kiến đến:</Text>
            <Text style={styles.value}>
              {formatDateTime(ticketData.trip.arrivalTime)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vị trí ghế:</Text>
            <View style={styles.seatContainer}>
              <Text style={styles.seatText}>
                {ticketData.seatNumber.join(", ")}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Biển số xe:</Text>
            <Text style={styles.value}>
              {formatLicensePlate(ticketData.bus.licensePlate)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tình trạng vé:</Text>
            <Text
              style={[
                styles.value,
                { color: getStatusColor(ticketData.status) },
              ]}
            >
              {getStatusText(ticketData.status)}
            </Text>
          </View>
        </View>

        {/* Đoạn đường gạch nét đứt với logo */}
        <View style={styles.dashedLineContainer}>
          <Image
            source={require("../../../assets/logo1_DaTachNen2.png")} // Thay thế bằng đường dẫn tới logo của bạn
            style={styles.watermarkLogo}
          />
          <View style={styles.dashedLine}></View>
        </View>

        {/* Phần 2: Thông tin khách hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tên khách hàng:</Text>
            <Text style={styles.value}>{ticketData.customerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{ticketData.customerPhone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ghi chú:</Text>
            <Text style={styles.value}>{ticketData.note || "Không có"}</Text>
          </View>
        </View>

        {/* Phần 3: Chi phí chuyến xe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi phí chuyến xe</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tổng tiền cần thanh toán:</Text>
            <Text style={styles.valueHighlight}>
              {formatCurrency(ticketData.totalAmount)} VND
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  ticketBox: {
    backgroundColor: "#fff",
    borderRadius: 20, // Bo góc cho hộp
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // Cho Android
    borderWidth: 1,
    borderColor: "#26c6da", // Màu viền
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  valueHighlight: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#26c6da", // Màu xanh dương nổi bật
  },
  seatContainer: {
    backgroundColor: "#e0f7fa", // Màu ghế
    padding: 10,
    borderRadius: 12, // Bo góc cho ghế
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  seatText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00796b", // Màu chữ ghế
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  dashedLineContainer: {
    flexDirection: "row", // Để các phần (logo và đường nét đứt) nằm ngang
    alignItems: "center", // Căn giữa các phần theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    marginVertical: 10, // Khoảng cách giữa các phần
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderStyle: "dashed",
    flex: 1, // Để đường nét đứt có thể kéo dài ra hết không gian
    marginHorizontal: 10, // Khoảng cách giữa logo và đường nét đứt
  },
  watermarkLogo: {
    width: 300, // Chiều rộng của logo
    height: 300, // Chiều cao của logo
    position: "absolute", // Để logo chèn vào giữa đường gạch đứt
    opacity: 0.2,
  },
});

export default SuccessScreen;
