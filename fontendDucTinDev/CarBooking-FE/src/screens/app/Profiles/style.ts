import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#007bff",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  managementSection: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  managementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#007bff", // Màu sắc của đường kẻ
    marginVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
  },
  termsSection: {
    width: "100%",
    marginVertical: 20,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  logoutButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#d9534f",
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
