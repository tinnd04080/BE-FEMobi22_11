import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./style";
import LoginScreen from "../SignIn";

const SplashScreen: React.FC = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      return navigation.replace("LoginScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MutliRide Booking</Text>
      <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />
      <Image
        source={require("../../../assets/logoSplash.png")}
        style={styles.logo}
      />
      <View style={styles.footer}>
        <Text style={styles.subtitle}>Sản phẩm được phát triển bởi</Text>
        <Text style={styles.subtitle2}>Nhóm 2</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
