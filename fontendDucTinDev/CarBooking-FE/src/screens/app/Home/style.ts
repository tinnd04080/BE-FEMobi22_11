import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    backgroundColor: "#005C78",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerImage: {
    width: 200,
    height: 200,
  },
  searchContainer: {
    flexDirection: "column",
    padding: 16,
    marginTop: -40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 16,
    elevation: 5,
  },
  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#005C78",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
  },
  inputText: {
    fontSize: 16,
    color: "#666",
  },
  searchButton: {
    backgroundColor: "#007A8A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
    paddingHorizontal: 10,
  },
  routeCard: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  routeTouchable: {
    flex: 1,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#005C78",
  },
  routePrice: {
    fontSize: 16,
    color: "#007A8A",
    fontWeight: "500",
  },
  routeDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  provinceItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  provinceText: {
    fontSize: 18,
  },
});

export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    color: "#666",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    color: "#666",
    paddingRight: 30, // Để dành chỗ cho mũi tên
  },
};
