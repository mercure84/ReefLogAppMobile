import React from "react";
import {
  View,
  Text,
  ViewStyle,
  ImageStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { Fish, SexType } from "../../../../store/FishStore";

export const FishSelectItem = ({
  fish,
  callback,
}: {
  fish: Fish;
  callback: () => void;
}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.item}></View>
        </View>

        <View>
          <Text style={styles.date}>{fish.name}</Text>

          {fish.sex !== SexType.UNDEFINED && <Text>Sexe : {fish.sex}</Text>}
          <Text>Taile : {fish.size}</Text>
          {fish.note && <Text>Notes : {fish.note}</Text>}
        </View>
      </View>
    </>
  );
};

type Style = {
  mainContainer: ViewStyle;
  header: ViewStyle;
  icon: ImageStyle;
  item: ViewStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Style>({
  mainContainer: {
    borderColor: "grey",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  item: {
    flex: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    height: 32,
    width: 32,
  },
  date: {
    fontWeight: "bold",
  },
});
