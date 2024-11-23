import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { styles } from "./style";
import Header from "../../components/header";

interface Seat {
  id: string;
  isSold: boolean;
  isSelected: boolean;
}

const items = [
  { color: "#3F6B72", text: "Đã bán" },
  { color: "#FFC107", text: "Còn trống" },
  { color: "#8BC34A", text: "Đang chọn" },
];

const initialSeats: Seat[][] = [
  [
    { id: "A2", isSold: false, isSelected: false },
    { id: "A1", isSold: false, isSelected: false },
  ],
  [
    { id: "A4", isSold: false, isSelected: false },
    { id: "A3", isSold: false, isSelected: false },
  ],
  [
    { id: "A6", isSold: true, isSelected: false },
    { id: "A5", isSold: false, isSelected: false },
  ],
  [
    { id: "A8", isSold: false, isSelected: false },
    { id: "A7", isSold: false, isSelected: false },
  ],
  [
    { id: "A10", isSold: false, isSelected: false },
    { id: "A9", isSold: false, isSelected: false },
  ],
  [
    { id: "A12", isSold: false, isSelected: false },
    { id: "A11", isSold: false, isSelected: false },
  ],
];

const upperSeats: Seat[][] = [
  [
    { id: "B2", isSold: false, isSelected: false },
    { id: "B1", isSold: false, isSelected: false },
  ],
  [
    { id: "B4", isSold: true, isSelected: false },
    { id: "B3", isSold: false, isSelected: false },
  ],
  [
    { id: "B6", isSold: false, isSelected: false },
    { id: "B5", isSold: false, isSelected: false },
  ],
  [
    { id: "B8", isSold: false, isSelected: false },
    { id: "B7", isSold: false, isSelected: false },
  ],
  [
    { id: "B10", isSold: false, isSelected: false },
    { id: "B9", isSold: false, isSelected: false },
  ],
  [
    { id: "B12", isSold: false, isSelected: false },
    { id: "B11", isSold: false, isSelected: false },
  ],
];

const SeatSelectionScreen = ({ route, navigation }) => {
  const { ticketPrice, selectedDay, departure, destination } = route.params;

  const [seats, setSeats] = useState(initialSeats);
  const [upperRowSeats, setUpperRowSeats] = useState(upperSeats);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleSeatSelection = (
    row: number,
    seatIndex: number,
    isUpperRow: boolean = false
  ) => {
    const seat = isUpperRow
      ? upperRowSeats[row][seatIndex]
      : seats[row][seatIndex];

    if (seat.isSold) return;

    const updatedSeats = isUpperRow
      ? upperRowSeats.map((r, rIndex) =>
          rIndex === row
            ? r.map((s, sIndex) =>
                sIndex === seatIndex ? { ...s, isSelected: !s.isSelected } : s
              )
            : r
        )
      : seats.map((r, rIndex) =>
          rIndex === row
            ? r.map((s, sIndex) =>
                sIndex === seatIndex ? { ...s, isSelected: !s.isSelected } : s
              )
            : r
        );

    isUpperRow ? setUpperRowSeats(updatedSeats) : setSeats(updatedSeats);

    const seatId = isUpperRow
      ? upperRowSeats[row][seatIndex].id
      : seats[row][seatIndex].id;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });

    setTotalPrice((prev) => {
      const newTotal = seat.isSelected
        ? prev - ticketPrice
        : prev + ticketPrice;
      return newTotal < 0 ? 0 : newTotal;
    });
  };

  useEffect(() => {
    setTotalPrice(selectedSeats.length * ticketPrice);
  }, [selectedSeats]);

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất một ghế.");
      return;
    }

    navigation.navigate("PickupDropoffScreen", {
      selectedSeats: selectedSeats,
      totalPrice: totalPrice,
      selectedDay: selectedDay,
      departure: departure,
      destination: destination,
    });
  };

  const renderSeats = (seatData: Seat[][], isUpperRow = false) =>
    seatData.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((seat, seatIndex) => (
          <TouchableOpacity
            key={seat.id}
            style={[
              styles.seat,
              seat.isSold
                ? styles.soldSeat
                : seat.isSelected
                ? styles.selectedSeat
                : styles.availableSeat,
            ]}
            onPress={() => toggleSeatSelection(rowIndex, seatIndex, isUpperRow)}
            disabled={seat.isSold}
          >
            <Text style={styles.seatText}>{seat.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));

  return (
    <View style={styles.container}>
      <Header title="Chọn ghế ngồi" />

      <ScrollView contentContainerStyle={styles.seatLayout}>
        <View style={styles.seatContainer}>
          <View style={styles.driverArea}>
            <Text style={styles.sectionTitle}>Tầng dưới</Text>
            <View style={styles.driverSeat}>
              <Text style={styles.seatText}>Khu tài xế</Text>
            </View>
            <View style={styles.seatsBlock}>{renderSeats(seats)}</View>
          </View>
          <View style={styles.driverArea}>
            <Text style={styles.sectionTitle}>Tầng trên</Text>
            <View style={styles.driverSeat}>
              <Text style={styles.seatText}>Cửa ra vào</Text>
            </View>
            <View style={styles.seatsBlock}>
              {renderSeats(upperRowSeats, true)}
            </View>
          </View>
        </View>

        <View style={styles.containerCircle}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={[styles.circle, { backgroundColor: item.color }]} />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Ghế đã chọn: {selectedSeats.join(", ")}
        </Text>
        <Text style={styles.summaryText}>
          Tổng tiền: {totalPrice.toLocaleString("vi-VN")} Đ
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SeatSelectionScreen;
