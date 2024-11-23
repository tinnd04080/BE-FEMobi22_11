import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#3C738F",
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F7F9F5",
  },
  instructionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 8,
    backgroundColor: "#E6E6E6",
    borderRadius: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  copyButton: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 3, // Adding shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
