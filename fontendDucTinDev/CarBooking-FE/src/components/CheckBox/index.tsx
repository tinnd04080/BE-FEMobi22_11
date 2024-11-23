import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./style";

interface CheckboxProps {
  label: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheckbox = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
      <View style={styles.checkbox}>
        {checked ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={24}
            color="#FF8C01"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="#aaa"
          />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
