import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";

type Props = {
  minValue: number;
  maxValue: number;
  value: number;
  onChange: (number: number) => void;
};

export const NumericStepper = ({
  minValue,
  maxValue,
  value,
  onChange,
}: Props) => {
  const handleMinus = () => {
    if (value > minValue) {
      onChange(value - 1);
    }
  };

  const handlePlus = () => {
    if (value < maxValue) {
      onChange(value + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleMinus()}>
        <View style={styles.leftButton}>
          <Text>-</Text>
        </View>
      </TouchableOpacity>
      <Text>{value}</Text>
      <TouchableOpacity onPress={() => handlePlus()}>
        <View style={styles.rightButton}>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

type Style = {
  leftButton: ViewStyle;
  container: ViewStyle;
  rightButton: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  leftButton: {
    backgroundColor: "green",
    width: 16,
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  rightButton: {
    backgroundColor: "red",
    width: 16,
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  container: {
    flexDirection: "row",
  },
});
