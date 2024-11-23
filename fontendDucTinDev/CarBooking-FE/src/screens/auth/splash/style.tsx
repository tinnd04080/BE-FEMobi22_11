import { StyleSheet } from "react-native";

const buttonColor = "#E88D67";
const backgroundColor = "#F3F7EC";
const backgroundSplash = "#006989";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundSplash,
    padding: 20,
    paddingTop: 80,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 75,
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle2: {
    fontSize: 24,
    color: "red",
    marginBottom: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loading: {
    marginBottom: 20,
  },
});
