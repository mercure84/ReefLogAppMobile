import React from "react";
import { WaterTest } from "../../../../services/waterTestService";
import { View, Text } from "react-native";

type Props = {
  waterTest: WaterTest;
};

export const WaterTestItem = ({ waterTest }: Props) => {
  return (
    <View>
      {waterTest.temperature ?? (
        <Text>Température : {waterTest.temperature} </Text>
      )}
    </View>
  );
};
