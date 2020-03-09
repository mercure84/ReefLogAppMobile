import React from "react";
import { WaterTest } from "../../../../services/waterTestService";
import { View, Text } from "react-native";

type Props = {
  waterTest: WaterTest;
};

export const WaterTestItem = ({ waterTest }: Props) => {
  return (
    <View>
      {waterTest.dateTime ?? <Text>Date : {waterTest.dateTime} </Text>}
      {waterTest.temperature ?? <Text>Date : {waterTest.temperature} </Text>}
      {waterTest.salinity ?? <Text>Date : {waterTest.salinity} </Text>}
      {waterTest.alcalinity ?? <Text>Date : {waterTest.alcalinity} </Text>}
      {waterTest.calcium ?? <Text>Date : {waterTest.calcium} </Text>}
    </View>
  );
};
