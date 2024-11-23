import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },

  seatLayout: { padding: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#3F6B72",
  },
  seatContainer: { flexDirection: "row", justifyContent: "space-around" },
  driverArea: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  driverText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  seatsBlock: { flexDirection: "column", alignItems: "center" },
  row: { flexDirection: "row", justifyContent: "center", marginVertical: 5 },
  availableSeat: {
    backgroundColor: "#FFC107",
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3F6B72",
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 2,
  },
  seatText: { fontSize: 12, fontWeight: "bold", color: "#3F6B72" },
  soldSeat: {
    backgroundColor: "#3F6B72",
    borderColor: "#3F6B72",
  },
  selectedSeat: { backgroundColor: "#8BC34A", borderColor: "#8BC34A" },
  containerCircle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  driverBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  driverSeat: {
    backgroundColor: "#ccc",
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
  },

  summary: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 3,
    marginTop: 10,
  },
  summaryText: { fontSize: 16, marginVertical: 5, color: "#3F6B72" },
  continueButton: {
    backgroundColor: "#3F6B72",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  continueButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
