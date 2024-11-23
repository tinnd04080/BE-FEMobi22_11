import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  dateDisplayContainer: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  currentDateText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  routeDisplayText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  customButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  customButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  ticketContainer: {
    padding: 16,
  },
  ticket: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketInfo: {
    fontSize: 16,
    color: "#333",
  },
  ticketPrice: {
    fontSize: 16,
    color: "#e74c3c",
    marginTop: 8,
  },
  ticketType: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  availableSeats: {
    fontSize: 14,
    color: "#2ecc71",
    marginTop: 4,
  },
  totalSeats: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  selectTripButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  selectTripButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
