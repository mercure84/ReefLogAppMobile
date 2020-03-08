import React, { useState } from "react";
import { Tank } from "../../../../services/tankServices";
import { View, Text } from "react-native";

type Props = {
  tankList: Tank[];
};

export const MainTankDisplay = ({ tankList }: Props) => {
  return tankList.length > 0 ? (
    <View>
      <Text style={{ fontSize: 16 }}>Aquarium : {tankList[0].name}</Text>
      <Text style={{ fontSize: 16 }}>
        Volume : {tankList[0].rawVolume} litres
      </Text>

      <Text style={{ fontSize: 16 }}>
        Maintenance : {tankList[0].typeOfMaintenance}
      </Text>

      <Text style={{ fontSize: 16 }}>
        Population : {tankList[0].mainPopulation}
      </Text>
    </View>
  ) : null;
};
