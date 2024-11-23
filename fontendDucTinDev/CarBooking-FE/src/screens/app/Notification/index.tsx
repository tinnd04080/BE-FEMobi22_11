import { Image, SafeAreaView, Text, View } from "react-native";
import { styles } from "./style";
import { FlashList } from "@shopify/flash-list";
import Header from "../../../components/headerApp";

interface Notifications {
  date: string;
  status: string;
  route: string;
  time: string;
  seats: string;
  success: boolean;
}

const notifications: Notifications[] = [
  {
    date: "Thứ 6, 10/04/2024",
    status: "Đặt vé thành công",
    route: "Đà Nẵng - Quảng Ngãi",
    time: "17:00, Thứ 6, 10/04/2024",
    seats: "A12, A13",
    success: true,
  },
  {
    date: "Thứ 7, 11/04/2024",
    status: "Đặt vé thất bại",
    route: "Sài Gòn - Quy Nhơn",
    time: "17:00, Thứ 7, 11/04/2024",
    seats: "B7",
    success: false,
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: { item: Notifications }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <View
        style={[
          styles.notificationBox,
          item.success ? styles.successBox : styles.failedBox,
        ]}
      >
        <Image
          source={
            item.success
              ? require("../../../assets/pass.png")
              : require("../../../assets/false.png")
          }
          style={styles.icon}
        />
        <View style={styles.infoContainer}>
          <Text style={item.success ? styles.successText : styles.failedText}>
            {item.status}
          </Text>
          <Text style={styles.route}>Tuyến: {item.route}</Text>
          <Text style={styles.time}>Thời gian: {item.time}</Text>
          <Text style={styles.seats}>Ghế: {item.seats}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notification" />
      <FlashList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={50}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
