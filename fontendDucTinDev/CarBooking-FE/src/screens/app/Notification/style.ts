import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#2f5061",
    color: "white",
    textAlign: "center",
    borderRadius: 8,
    marginBottom: 12,
  },
  notificationContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 4,
  },
  notificationBox: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: "white",
  },
  successBox: {
    borderColor: "#4caf50",
    borderWidth: 2,
  },
  failedBox: {
    borderColor: "#f44336",
    borderWidth: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  successText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
  failedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f44336",
  },
  route: {
    fontSize: 14,
    marginVertical: 2,
    color: "#343a40",
  },
  time: {
    fontSize: 12,
    color: "#6c757d",
  },
  seats: {
    fontSize: 12,
    color: "#6c757d",
  },
});
