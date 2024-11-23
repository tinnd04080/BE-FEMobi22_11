import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inputSection: {
    margin: 20,
    flex: 6,
    justifyContent: "space-evenly",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Giảm khoảng cách giữa các ô nhập
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 45, // Giữ chiều cao cố định cho ô nhập
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  inputError: {
    borderColor: "red", // Đổi màu viền khi có lỗi
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10, // Để thông báo lỗi cách đều với viền ô nhập
  },
  discountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountInputWrapper: {
    flexDirection: "row",
    flex: 7,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  discountInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  discountButton: {
    flex: 3,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 10,
  },
  discountButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedSeats: {
    fontSize: 18,
    marginVertical: 10,
    color: "#666",
  },
  details: {
    fontSize: 16,
    marginVertical: 10,
    color: "#999",
  },
  confirmSection: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoSection: {
    padding: 16,
    margin: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007BFF",
    textAlign: "right",
  },
  wrapText: {
    flexWrap: "wrap", // Cho phép xuống dòng khi văn bản quá dài
  },
  discountAppliedInput: {
    backgroundColor: "#f0f0f0", // Màu xám nhạt
    color: "#555", // Màu chữ tối
  },
});
