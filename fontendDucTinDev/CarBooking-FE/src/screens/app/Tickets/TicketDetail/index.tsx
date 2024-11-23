import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./style";

interface Ticket {
  time: string;
  date: string;
  route: string;
  code: string;
  price: string;
  status: "Chờ thanh toán" | "Đã thanh toán" | "Hủy";
}

type TicketDetailScreenRouteProp = RouteProp<
  { TicketDetail: { ticket: Ticket } },
  "TicketDetail"
>;

interface TicketDetailScreenProps {
  route: TicketDetailScreenRouteProp;
}

const TicketDetailScreen: React.FC<TicketDetailScreenProps> = ({ route }) => {
  const { ticket } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chi tiết vé</Text>

      <View style={styles.ticketContainer}>
        <View style={styles.qrCode}>
          <Text style={styles.qrText}>QR CODE</Text>
        </View>

        <View style={styles.ticketInfo}>
          <Text style={styles.ticketText}>
            Mã vé: <Text style={styles.boldText}>{ticket.code}</Text>
          </Text>
          <Text style={styles.ticketText}>
            Ngày khởi hành:{" "}
            <Text style={styles.boldText}>
              {ticket.time} {ticket.date}
            </Text>
          </Text>
          <Text style={styles.paymentStatus}>{ticket.status}</Text>
          <Text style={styles.ticketPrice}>{ticket.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default TicketDetailScreen;
