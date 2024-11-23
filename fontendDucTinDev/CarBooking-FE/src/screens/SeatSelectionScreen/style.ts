import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555555	",
  },
  seatContainer36: {
    margin: 20,
    backgroundColor: "#f8f8f8", // Cái này cho 36 chỗ ngồi
    elevation: 1,
    borderRadius: 10,
  },
  seatContainer24: {
    padding: 10,
    margin: 20,
    elevation: 1,
    backgroundColor: "#e8e8e8", // Cái này cho 24 chỗ ngồi
  },
  seatContainer16: {
    padding: 10,
    margin: 20,
    elevation: 1,
    backgroundColor: "#d8d8d8", // Cái này cho 16 chỗ ngồi
  },
  blockContainer36: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch", // Đảm bảo chiều cao của đường kẻ đồng bộ với các khối
  },
  blockContainer24: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blockContainer16: {
    flexDirection: "column",
    justifyContent: "center", // Trung tâm cho 16 chỗ ngồi
  },
  block: {
    width: "48%",
    marginBottom: 10,
  },
  verticalDivider: {
    width: 2, // Chiều rộng của đường kẻ
    backgroundColor: "#ccc", // Màu sắc của đường kẻ
    marginHorizontal: 5, // Khoảng cách giữa đường kẻ và các khối
    marginVertical: 10,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 0,
  },
  colorLabel: {
    fontSize: 14,
    color: "#333",
  },
  selectedSeatsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005C78",
    lineHeight: 32,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  seat: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5, // Thêm bo góc cho ghế
  },
  seatText: {
    fontSize: 14,
  },
  availableSeat: {
    backgroundColor: "#005C78", // Màu nền cho ghế trống
  },
  soldSeat: {
    backgroundColor: "#d6d6d6", // Màu nền cho ghế đã bán (xám)
  },
  unavailableSeat: {
    backgroundColor: "#d6d8db", // Màu nền cho ghế không thể chọn (ví dụ: đã bị hủy)
  },
  selectedSeat: {
    backgroundColor: "#ff3b30", // Màu nền cho ghế đã chọn (đỏ)
    borderColor: "#ff1f1f", // Đường viền đỏ cho ghế đã chọn
    borderWidth: 2,
  },
  availableSeatText: {
    color: "#fff", // Màu chữ trắng cho ghế trống
  },
  soldSeatText: {
    color: "#000", // Màu chữ đen cho ghế đã bán
  },

  driverText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  grayBox: {
    backgroundColor: "#D9D9D9", // Màu xám
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },

  colorLegendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10, // Khoảng cách trên dưới
    marginHorizontal: 10,
    paddingHorizontal: 10, // Khoảng cách bên trái và phải
  },
  colorBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 5, // Để tạo hình tròn cho các ô màu
    marginRight: 5, // Khoảng cách giữa ô màu và chú thích
  },
  buttonContainer: {
    alignItems: "center", // Canh giữa nút
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "#005C78", // Màu nút
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // Màu chữ trên nút
    fontSize: 16,
    fontWeight: "bold",
  },
  totalAmountContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    elevation: 2,
  },

  seatListText: {
    color: "#005C78", // Màu đen cho danh sách ghế
  },
  separator: {
    height: 1, // Chiều cao đường phân cách
    backgroundColor: "#ccc", // Màu xám nhẹ cho thanh phân cách
    marginVertical: 10, // Tạo khoảng cách giữa các phần
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left", // Căn góc trái
    marginBottom: 5,
    color: "#005C78",
  },
  calculationText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left", // Căn giữa
    color: "#880000",
  },
  selectedSeatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Cho phép các ô ghế xuống dòng khi không đủ chỗ
    gap: 8, // Khoảng cách giữa các ô ghế
    justifyContent: "flex-start", // Căn lề trái cho các ô ghế
    width: "100%", // Đảm bảo container chiếm hết chiều rộng của phần tử cha
    alignItems: "center",
  },
  selectedSeatBox: {
    width: 30, // Kích thước ô vuông
    height: 30,
    backgroundColor: "#ff3b30", // Màu nền đỏ
    justifyContent: "center",
    alignItems: "center", // Căn giữa nội dung
    borderRadius: 5, // Bo góc nhẹ
  },
  selectedSeatText: {
    color: "#fff", // Màu chữ trắng
    fontWeight: "bold",
    fontSize: 14,
  },
  selectedSeatsContainer: {
    flexDirection: "row", // Đặt các phần tử nằm ngang
    alignItems: "center", // Căn giữa các phần tử theo chiều dọc
  },
  selectedSeatsBoxContainer: {
    flexDirection: "row", // Sắp xếp các phần tử theo chiều dọc
    alignItems: "flex-start", // Căn lề trái
    width: "100%", // Đảm bảo chiếm hết chiều rộng
  },
});
