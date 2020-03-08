import React, { useState } from "react";
import { Tank } from "../../../../services/tankServices";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type Props = {
  tankList: Tank[];
};

export const MainTankDisplay = ({ tankList }: Props) => {
  return tankList.length > 0 ? (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{tankList[0].name}</Text>
      <Text style={styles.detailText}>
        Volume : {tankList[0].rawVolume} litres
      </Text>

      <Text style={styles.detailText}>
        Maintenance : {tankList[0].typeOfMaintenance}
      </Text>

      <Text style={styles.detailText}>
        Population : {tankList[0].mainPopulation}
      </Text>

      <Text style={styles.detailText}>
        Décantation : {tankList[0].sumpVolume} litres
      </Text>
    </View>
  ) : null;
};

type Style = {
  container: ViewStyle;
  mainTitle: TextStyle;
  detailText: TextStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: "grey",
    padding: 8,
    margin: 16,
    borderRadius: 15
  },
  mainTitle: {
    fontSize: 24,
    margin: 8
  },
  detailText: {
    fontSize: 16,
    textAlign: "center"
  }
});
