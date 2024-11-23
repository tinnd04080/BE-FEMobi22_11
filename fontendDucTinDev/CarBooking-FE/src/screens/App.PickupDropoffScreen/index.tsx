import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./style";
import { NavigationProp } from "@react-navigation/native";
import Header from "../../components/header";

interface PickupDropoffScreenProps {
  navigation: NavigationProp<any>;
  route: {
    params: {
      departure: string;
      destination: string;
      selectedDay: Date;
      selectedSeats: string[];
      totalPrice: number;
    };
  };
}

const PickupDropoffScreen: React.FC<PickupDropoffScreenProps> = ({
  navigation,
  route,
}) => {
  const [pickupMethod, setPickupMethod] = useState<string | null>(null);
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [dropoffMethod, setDropoffMethod] = useState<string | null>(null);
  const [dropoffAddress, setDropoffAddress] = useState<string>("");

  const { departure, destination, selectedDay, selectedSeats, totalPrice } =
    route.params;

  const handleContinue = () => {
    if (!pickupMethod) {
      Alert.alert("Thiếu thông tin", "Vui lòng chọn hình thức đón.");
      return;
    }
    if (pickupMethod === "Tại nhà" && !homeAddress) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập địa chỉ nhà.");
      return;
    }

    if (!dropoffMethod) {
      Alert.alert("Thiếu thông tin", "Vui lòng chọn hình thức trả.");
      return;
    }
    if (dropoffMethod === "Tại nhà" && !dropoffAddress) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập địa chỉ trả.");
      return;
    }

    navigation.navigate("PassengerInfoScreen", {
      pickup: pickupMethod,
      dropoff: dropoffMethod,
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
      <Header title="Hình thức đón/trả" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {/* Hình thức đón */}
            <Text style={styles.label}>Hình thức đón:</Text>
            <RNPickerSelect
              onValueChange={(value) => setPickupMethod(value)}
              items={[
                { label: "Đón tại bến", value: "Tại bến" },
                { label: "Đón tại nhà", value: "Tại nhà" },
              ]}
              placeholder={{
                label: "Chọn hình thức đón...",
                value: null,
              }}
              style={{
                inputIOS: styles.pickerInput,
                inputAndroid: styles.pickerInput,
              }}
            />
            {pickupMethod === "Tại nhà" && (
              <>
                <Text style={styles.label}>Địa chỉ nhà:</Text>
                <TextInput
                  style={styles.input}
                  value={homeAddress}
                  onChangeText={setHomeAddress}
                  placeholder="Nhập địa chỉ nhà"
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                  returnKeyType="done"
                  textAlign="left"
                  selectionColor="#000"
                />
              </>
            )}

            {/* Hình thức trả */}
            <Text style={styles.label}>Hình thức trả:</Text>
            <RNPickerSelect
              onValueChange={(value) => setDropoffMethod(value)}
              items={[
                { label: "Trả tại bến", value: "Tại bến" },
                { label: "Trả tại nhà", value: "Tại nhà" },
              ]}
              placeholder={{
                label: "Chọn hình thức trả...",
                value: null,
              }}
              style={{
                inputIOS: styles.pickerInput,
                inputAndroid: styles.pickerInput,
              }}
            />
            {dropoffMethod === "Tại nhà" && (
              <>
                <Text style={styles.label}>Địa chỉ nhà:</Text>
                <TextInput
                  style={styles.input}
                  value={dropoffAddress}
                  onChangeText={setDropoffAddress}
                  placeholder="Nhập địa chỉ trả"
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                  returnKeyType="done"
                  textAlign="left"
                  selectionColor="#000"
                />
              </>
            )}

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Tiếp tục</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Thông tin đã nhập:</Text>
              <Text style={styles.infoText}>
                Hình thức đón: {pickupMethod || "Chưa chọn"}
              </Text>
              {pickupMethod === "Tại nhà" && (
                <Text style={styles.infoText}>
                  Địa chỉ nhà: {homeAddress || "Chưa nhập"}
                </Text>
              )}
              <Text style={styles.infoText}>
                Hình thức trả: {dropoffMethod || "Chưa chọn"}
              </Text>
              {dropoffMethod === "Tại nhà" && (
                <Text style={styles.infoText}>
                  Địa chỉ trả: {dropoffAddress || "Chưa nhập"}
                </Text>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Thông tin chuyến đi:</Text>
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PickupDropoffScreen;
