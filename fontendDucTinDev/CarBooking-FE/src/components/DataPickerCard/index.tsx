import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const DatePickerCard = ({ currentDate, onDateChange }) => {
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const handleSelectDate = (day) => {
    const selectedDate = new Date(year, month, day);
    if (selectedDate >= today) {
      onDateChange(selectedDate);
    }
  };

  const renderDays = () => {
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return daysArray.map((day) => {
      const selectedDate = new Date(year, month, day);
      const isPastDate = selectedDate < today;

      return (
        <TouchableOpacity
          key={day}
          style={[
            styles.dayButton,
            isPastDate && styles.pastDayButton, // Thay đổi kiểu dáng nếu là ngày quá khứ
          ]}
          onPress={() => !isPastDate && handleSelectDate(day)} // Chỉ gọi handleSelectDate nếu không phải là ngày quá khứ
          disabled={isPastDate} // Vô hiệu hóa button nếu là ngày quá khứ
        >
          <Text style={[styles.dayText, isPastDate && styles.pastDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const changeMonth = (direction) => {
    if (direction === "next") {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    } else {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth("prev")}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.monthYearText}>
          {`${year}-${month + 1 < 10 ? "0" : ""}${month + 1}`}
        </Text>
        <TouchableOpacity onPress={() => changeMonth("next")}>
          <Icon name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.daysContainer}>{renderDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayButton: {
    width: "14.28%", // 7 days in a week
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pastDayButton: {
    backgroundColor: "#f0f0f0", // Màu nền cho ngày quá khứ
  },
  pastDayText: {
    color: "#a9a9a9", // Màu chữ cho ngày quá khứ
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DatePickerCard;
