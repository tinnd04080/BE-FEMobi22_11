import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { fetchSeatsForTrip } from "../controllers/../../screens/SeatSelectionScreen/SeatController";
import Header from "../../components/header";
import { styles } from "./style";
import { RootStackParamList } from "../App.TicketBookingScreen/index";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native"; // Thêm import useNavigation

interface Seat {
  seatNumber: string;
  status: string;
}

const SeatSelectionScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Lưu danh sách ghế đã chọn
  const [seatCapacity, setSeatCapacity] = useState<number>(0); // Lưu seatCapacity
  // Set cứng tripId
  // const tripId = "6737040ba5ab759d34287390";
  const { trip } = route.params;
  const tripId = trip._id;
  useEffect(() => {
    const loadSeats = async () => {
      try {
        console.log("id chuyến xe:", tripId); // In ra tripId
        const fetchedSeats = await fetchSeatsForTrip(tripId);
        //console.log("Dữ liệu trả về từ API:", fetchedSeats);
        // Kiểm tra nếu fetchedSeats có trường "seats" và là mảng hợp lệ
        if (Array.isArray(fetchedSeats.seats)) {
          setSeats(fetchedSeats.seats); // Lấy mảng ghế từ trường "seats"
          setSeatCapacity(fetchedSeats.bus.seatCapacity); // Lấy seatCapacity
        } else {
          console.error(
            "Fetched seats is not a valid array:",
            fetchedSeats.seats
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading seats:", error);
        setLoading(false);
      }
    };

    loadSeats();
  }, [tripId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Hàm để xử lý chọn ghế
  const toggleSeatSelection = (seatNumber: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber];

      console.log("Ghế đã chọn:", newSelectedSeats.join(", "));
      return newSelectedSeats;
    });
  };

  // Hàm vẽ sơ đồ ghế cho loại 36 chỗ
  const render36SeatLayout = (seats: Seat[]) => {
    const rows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];

    seats.forEach((seat, index) => {
      const isSelected = selectedSeats.includes(seat.seatNumber);

      const seatView = (
        <TouchableOpacity
          key={index}
          style={[
            styles.seat,
            seat.status === "EMPTY"
              ? styles.availableSeat
              : seat.status === "SOLD"
              ? styles.soldSeat
              : styles.unavailableSeat,
            isSelected && styles.selectedSeat,
          ]}
          onPress={() => {
            if (seat.status === "EMPTY") {
              toggleSeatSelection(seat.seatNumber);
            }
          }}
          disabled={seat.status === "SOLD"}
        >
          <Text
            style={[
              styles.seatText,
              seat.status === "EMPTY" && !isSelected
                ? styles.availableSeatText
                : seat.status === "SOLD"
                ? styles.soldSeatText
                : isSelected
                ? styles.selectedSeatText
                : {},
            ]}
          >
            {seat.seatNumber}
          </Text>
        </TouchableOpacity>
      );

      currentRow.push(seatView);

      // Tạo hàng mới khi đủ 3 ghế
      if ((index + 1) % 3 === 0 || index === seats.length - 1) {
        rows.push(
          <View style={styles.row} key={rows.length}>
            {currentRow}
          </View>
        );
        currentRow = []; // Reset currentRow để tạo hàng mới
      }
    });

    return rows;
  };

  // Hàm vẽ sơ đồ ghế cho loại 24 chỗ
  const render24SeatLayout = (seats: Seat[]) => {
    const rows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];

    seats.forEach((seat, index) => {
      const isSelected = selectedSeats.includes(seat.seatNumber);

      const seatView = (
        <TouchableOpacity
          key={index}
          style={[
            styles.seat,
            seat.status === "EMPTY"
              ? styles.availableSeat
              : seat.status === "SOLD"
              ? styles.soldSeat
              : styles.unavailableSeat,
            isSelected && styles.selectedSeat,
          ]}
          onPress={() => {
            if (seat.status === "EMPTY") {
              toggleSeatSelection(seat.seatNumber);
            }
          }}
          disabled={seat.status === "SOLD"}
        >
          <Text
            style={[
              styles.seatText,
              seat.status === "EMPTY" && !isSelected
                ? styles.availableSeatText
                : seat.status === "SOLD"
                ? styles.soldSeatText
                : isSelected
                ? styles.selectedSeatText
                : {},
            ]}
          >
            {seat.seatNumber}
          </Text>
        </TouchableOpacity>
      );

      currentRow.push(seatView);

      // Tạo hàng mới khi đủ 2 ghế (mỗi hàng 2 ghế)
      if ((index + 1) % 2 === 0 || index === seats.length - 1) {
        rows.push(
          <View style={styles.row} key={rows.length}>
            {currentRow}
          </View>
        );
        currentRow = []; // Reset currentRow để tạo hàng mới
      }
    });

    return rows;
  };

  // Hàm vẽ sơ đồ ghế cho loại 16 chỗ
  const render16SeatLayout = (seats: Seat[]) => {
    const rows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];

    seats.forEach((seat, index) => {
      const isSelected = selectedSeats.includes(seat.seatNumber);

      const seatView = (
        <TouchableOpacity
          key={index}
          style={[
            styles.seat,
            seat.status === "EMPTY"
              ? styles.availableSeat
              : seat.status === "SOLD"
              ? styles.soldSeat
              : styles.unavailableSeat,
            isSelected && styles.selectedSeat,
          ]}
          onPress={() => {
            if (seat.status === "EMPTY") {
              toggleSeatSelection(seat.seatNumber);
            }
          }}
          disabled={seat.status === "SOLD"}
        >
          <Text
            style={[
              styles.seatText,
              seat.status === "EMPTY" && !isSelected
                ? styles.availableSeatText
                : seat.status === "SOLD"
                ? styles.soldSeatText
                : isSelected
                ? styles.selectedSeatText
                : {},
            ]}
          >
            {seat.seatNumber}
          </Text>
        </TouchableOpacity>
      );

      currentRow.push(seatView);

      // Tạo hàng mới khi đủ 4 ghế (mỗi hàng có 4 ghế)
      if ((index + 1) % 4 === 0 || index === seats.length - 1) {
        rows.push(
          <View style={styles.row} key={rows.length}>
            {currentRow}
          </View>
        );
        currentRow = []; // Reset currentRow để tạo hàng mới
      }
    });

    return rows;
  };

  // Hàm để render sơ đồ ghế tùy thuộc vào seatCapacity
  const renderSeatLayout = (seats: Seat[]) => {
    switch (seatCapacity) {
      case 36:
        return (
          <View style={styles.container}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.seatContainer36}>
                <View style={styles.blockContainer36}>
                  {/* Khối A */}
                  <View style={styles.block}>
                    <View style={styles.grayBox}>
                      <Text style={styles.driverText}>Tài xế</Text>
                    </View>
                    {render36SeatLayout(seats.slice(0, seats.length / 2))}
                    <Text style={styles.blockTitle}>Tầng 1</Text>
                  </View>
                  {/* Đường kẻ dọc */}
                  <View style={styles.verticalDivider} />
                  {/* Khối B */}
                  <View style={styles.block}>
                    <View style={styles.grayBox}></View>
                    {render36SeatLayout(seats.slice(seats.length / 2))}
                    <Text style={styles.blockTitle}>Tầng 2</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        );

      case 24:
        return (
          <View style={styles.container}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.seatContainer24}>
                <View style={styles.blockContainer24}>
                  {/* Khối A */}
                  <View style={styles.block}>
                    <View style={styles.grayBox}>
                      <Text style={styles.driverText}>Tài xế</Text>
                    </View>
                    {render24SeatLayout(seats.slice(0, seats.length / 2))}
                    <Text style={styles.blockTitle}>Tầng 1</Text>
                  </View>
                  {/* Đường kẻ dọc */}
                  <View style={styles.verticalDivider} />
                  {/* Khối B */}
                  <View style={styles.block}>
                    <View style={styles.grayBox}></View>
                    {render24SeatLayout(seats.slice(seats.length / 2))}
                    <Text style={styles.blockTitle}>Tầng 2</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        );

      case 16:
        return (
          <ScrollView
            contentContainerStyle={[
              styles.seatContainer16,
              styles.centeredContainer,
            ]}
          >
            <View style={styles.blockContainer16}>
              {/* Khối A */}
              <View style={styles.block}>
                <Text style={styles.blockTitle}></Text>
                {render16SeatLayout(seats.slice(0))}
              </View>
            </View>
          </ScrollView>
        );

      default:
        return <Text>Không tìm thấy ghế trên chuyến</Text>;
    }
  };

  const goToConfirmInformation = () => {
    // Kiểm tra nếu người dùng chưa chọn ghế
    if (selectedSeats.length === 0) {
      // Hiển thị thông báo với tiêu đề "Thông báo"
      // Hiển thị thông báo cho người dùng
      alert("Thông báo: Vui lòng chọn ghế trước khi tiếp tục!");
      return; // Không thực hiện điều hướng
    }
    // Truyền các thông tin cần thiết qua navigation
    navigation.navigate("ConfirmInformation", {
      selectedSeats,
      trip,
      seatCapacity,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Chọn ghế xe" />
      {loading ? <Text>Đang tải dữ liệu...</Text> : renderSeatLayout(seats)}

      {/* Hiển thị các ô màu với chú thích */}
      <View style={styles.colorLegendContainer}>
        <View style={styles.colorBox}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#D70000" }]}
          />
          <Text style={styles.colorLabel}>Ghế đang chọn</Text>
        </View>
        <View style={styles.colorBox}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#005C78" }]}
          />
          <Text style={styles.colorLabel}>Ghế còn trống</Text>
        </View>
        <View style={styles.colorBox}>
          <View
            style={[styles.colorIndicator, { backgroundColor: "#8D8D8D" }]}
          />
          <Text style={styles.colorLabel}>Ghế đã bán</Text>
        </View>
      </View>

      {/* Hiển thị danh sách ghế đã chọn */}

      <View style={styles.totalAmountContainer}>
        <View style={styles.selectedSeatsContainer}>
          <View style={styles.selectedSeatsBoxContainer}>
            <View style={styles.selectedSeatsGrid}>
              <Text style={styles.selectedSeatsText}>Ghế đã chọn {""}:</Text>
              {selectedSeats.map((seat, index) => (
                <View key={index} style={styles.selectedSeatBox}>
                  <Text style={styles.selectedSeatText}>{seat}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Thanh phân tách */}
        <View style={styles.separator} />

        {/* Hiển thị "Giá tạm tính" ở góc trái */}
        <Text style={styles.labelText}>Giá tạm tính :</Text>

        {/* Hiển thị phương thức tính toán ở giữa */}
        <Text style={styles.calculationText}>
          {selectedSeats.length} ghế <Text style={styles.seatListText}>x</Text>{" "}
          {formatCurrency(trip.price)}{" "}
          <Text style={styles.seatListText}>=</Text>{" "}
          {formatCurrency(selectedSeats.length * trip.price)} VNĐ
        </Text>
      </View>

      <Text>id chuyến xe: {tripId}</Text>
      {/* Nút bấm "Xác nhận đặt ghế" */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={goToConfirmInformation}
        >
          <Text style={styles.buttonText}>Xác nhận đặt ghế</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeatSelectionScreen;
