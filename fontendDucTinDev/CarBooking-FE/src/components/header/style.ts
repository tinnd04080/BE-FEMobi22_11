import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: Platform.OS === "android" ? 30 : 0, // Dành cho Android để tránh camera
    height: Platform.OS === "android" ? 80 : 60, // Điều chỉnh chiều cao tuỳ thuộc vào nền tảng
    backgroundColor: "#fff",
    elevation: 2, // Đổ bóng cho header (Android)
  },
  rightButton: {
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1,
  },
});
