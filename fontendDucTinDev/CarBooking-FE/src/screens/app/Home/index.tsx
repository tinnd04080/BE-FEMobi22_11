import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  Alert,
} from "react-native";
import { styles, pickerSelectStyles } from "./style";
import { provinces, popularRoutes } from "../../../data/data";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import busRoute from "../../../services/BusRoutes/busRouteApi";
import tripApi from "../../../services/Trips/tripApi";
interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Animation effect on load
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle date selection
  const handleConfirmDate = (date: Date) => {
    setDepartureDate(date);
    setDatePickerVisible(false);
  };

  // Handle search button press
  const handleSearch = async () => {
    try {
      const response = await tripApi.getTripsByRoute(
        departure,
        destination,
        departureDate
      );

      if (response && response.trips) {
        // In dữ liệu đã lấy được từ API ra console
        console.log("Trips data fetched:", response.trips);
        navigation.navigate("TicketBookingScreen", {
          trips: response.trips,
          selectedDay: departureDate,
          departure: departure,
          destination: destination,
        });
      } else {
        Alert.alert("Không tìm thấy chuyến đi phù hợp.");
      }
    } catch (error) {
      console.error("Lỗi khi tìm chuyến đi:", error);
      Alert.alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  // Render header content
  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/image2.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchCard}>
          {/* Departure picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Điểm khởi hành</Text>
            <RNPickerSelect
              onValueChange={(value) => setDeparture(value)}
              items={provinces.map((province) => ({
                label: province,
                value: province,
              }))}
              placeholder={{ label: "Chọn điểm khởi hành", value: null }}
              style={pickerSelectStyles}
              value={departure}
            />
          </View>

          {/* Destination picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Điểm đến</Text>
            <RNPickerSelect
              onValueChange={(value) => setDestination(value)}
              items={provinces.map((province) => ({
                label: province,
                value: province,
              }))}
              placeholder={{ label: "Chọn điểm đến", value: null }}
              style={pickerSelectStyles}
              value={destination}
            />
          </View>

          {/* Date picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ngày khởi hành</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={styles.inputText}>
                {`${departureDate.getDate()}/${
                  departureDate.getMonth() + 1
                }/${departureDate.getFullYear()}`}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Tìm chuyến đi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Các tuyến phổ biến</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={popularRoutes}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Animated.View style={[styles.routeCard, { opacity: fadeAnim }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log(`${item.title} pressed`)}
              style={styles.routeTouchable}
            >
              <Text style={styles.routeTitle}>{item.title}</Text>
              <Text style={styles.routePrice}>{item.price}</Text>
              <Text style={styles.routeDetails}>{item.details}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
        locale="vi_VN"
        minimumDate={new Date()}
      />
    </View>
  );
};

export default HomeScreen;
