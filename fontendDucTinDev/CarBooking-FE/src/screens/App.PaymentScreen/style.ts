import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  selectPaymentLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  paymentMethodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  paymentMethodText: {
    fontSize: 16,
    color: "#333",
  },
  ticketDetailsContainer: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  ticketDetailsLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ticketContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  qrCodePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 16,
  },
  qrCodeText: {
    fontSize: 14,
    color: "#888888",
  },
  ticketInfo: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
    color: "#1E90FF",
  },
  routeInfo: {
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
    paddingTop: 8,
  },
  routeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F8F8F8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  paymentNote: {
    fontSize: 12,
    color: "#FF4500",
    textAlign: "center",
  },
});
