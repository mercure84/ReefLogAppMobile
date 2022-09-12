import { StyleSheet, ViewStyle } from "react-native";

export type AllStyle = {
  buttonContainer: ViewStyle;
};

export const styles = StyleSheet.create<AllStyle>({
  buttonContainer: {
    marginTop: 16,
    alignSelf: "center",
    flexDirection: "row",
  },
});
