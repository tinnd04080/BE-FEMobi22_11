import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ticketContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fff",
  },
  qrCode: {
    borderWidth: 1,
    borderColor: "#000",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  qrText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ticketInfo: {
    marginBottom: 16,
  },
  ticketText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  paymentStatus: {
    color: "#ff9933",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  ticketPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
