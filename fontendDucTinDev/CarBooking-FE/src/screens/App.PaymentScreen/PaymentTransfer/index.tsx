import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./style";
import Header from "../../../components/header";

const BankTransferScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F9F5" }}>
      <Header title="Banking" />

      <View style={styles.container}>
        <Text style={styles.instructionText}>
          Vui lòng chuyển khoản đến tài khoản bên dưới
        </Text>

        {/* First Transfer Info Block */}
        <View style={styles.infoBlock}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Thông tin chuyển khoản</Text>
            <Text style={styles.infoText}>0985688245 | 265858-4858589</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <Icon name="copy-outline" size={20} color="#3C738F" />
          </TouchableOpacity>
        </View>

        {/* Second Transfer Info Block */}
        <View style={styles.infoBlock}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>BIDV - Chi nhánh Bình Định</Text>
            <Text style={styles.infoText}>85450000485694</Text>
            <Text style={styles.infoText}>Công ty TNHH electronic SKY</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <Icon name="copy-outline" size={20} color="#3C738F" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BankTransferScreen;
