import { StyleSheet } from "react-native";
const buttonColor = "#E88D67";
const backgroundColor = "#F3F7EC";
const textColor = "#005C78";
const inputBackgroundColor = "#f0f0f0";
const borderColor = "#ccc";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgroundColor,
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: textColor,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: inputBackgroundColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: borderColor,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  toggle: {
    color: "#1e90ff",
    fontWeight: "600",
  },
  button: {
    backgroundColor: buttonColor,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#1e90ff",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    color: textColor,
    marginBottom: 6,
    marginTop: 10,
  },
});
