import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../../../components/headerApp";

interface Ticket {
  time: string;
  date: string;
  route: string;
  code: string;
  price: string;
  status: "Chờ thanh toán" | "Đã thanh toán" | "Hủy";
}

const tickets: Ticket[] = [
  {
    time: "06:00",
    date: "24/09/2024",
    route: "Hà Nội - Đà Nẵng",
    code: "MD18302",
    price: "480.000Đ",
    status: "Chờ thanh toán",
  },
  {
    time: "08:00",
    date: "24/09/2024",
    route: "Quảng Bình - Đà Nẵng",
    code: "MD18303",
    price: "170.000Đ",
    status: "Hủy",
  },
  {
    time: "15:00",
    date: "24/09/2024",
    route: "Hồ Chí Minh - Đà Nẵng",
    code: "MD18304",
    price: "480.000Đ",
    status: "Đã thanh toán",
  },
];

const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  const getStatusStyle = () => {
    switch (ticket.status) {
      case "Chờ thanh toán":
        return styles.pending;
      case "Đã thanh toán":
        return styles.paid;
      case "Hủy":
        return styles.cancelled;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity style={styles.ticketContainer}>
      <View style={styles.leftSection}>
        <Text style={styles.time}>{ticket.time}</Text>
        <Text style={styles.date}>{ticket.date}</Text>
        <Text style={styles.route}>{ticket.route}</Text>
      </View>
      <View style={styles.rightSection}>
        <View style={[styles.statusContainer, getStatusStyle()]}>
          <Text style={styles.statusText}>{ticket.status}</Text>
        </View>
        <Text style={styles.code}>{ticket.code}</Text>
        <Text style={styles.price}>{ticket.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MyTicketsScreen: React.FC = (navigation) => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (ticket: Ticket) => {
    // navigation.navigate("TicketDetail", { ticket });
  };

  const renderItem = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <TicketItem ticket={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Ticket" />
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.code + item.time}
        style={{ marginHorizontal: 10, marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default MyTicketsScreen;
