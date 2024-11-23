import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  ticketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    justifyContent: "center",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#005C78",
  },
  date: {
    fontSize: 14,
    color: "#6c757d",
  },
  route: {
    fontSize: 16,
    color: "#495057",
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  pending: {
    backgroundColor: "#ffea00",
  },
  paid: {
    backgroundColor: "#28a745",
  },
  cancelled: {
    backgroundColor: "#dc3545",
  },
  code: {
    fontSize: 14,
    color: "#6c757d",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#005C78",
  },
});
