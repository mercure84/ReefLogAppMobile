import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ReefButton } from "../../../../components/ReefButton";

export const Fishes = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.buttonContainer}>
        <ReefButton
          size="medium"
          title="Mes poissons"
          onPress={() => navigation.navigate("fishes")}
        />
      </View>

      <Text>Je maintiens 0 pensionnaires</Text>
      <Text>Dernier recensement : </Text>
    </>
  );
};

type Style = {
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  buttonContainer: {
    marginTop: 32,
    alignSelf: "center",
    flexDirection: "row",
  },
});
