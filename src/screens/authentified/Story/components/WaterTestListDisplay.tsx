import React from "react";
import { WaterTest } from "../../../../services/waterTestService";
import { FlatList, Text } from "react-native";
import { WaterTestItem } from "./WaterTestItem";

type Props = {
  waterTestList: WaterTest[];
};

export const WaterTestListDisplay = ({ waterTestList }: Props) => {
  return waterTestList.length > 0 ? (
    <FlatList
      data={waterTestList}
      renderItem={({ item }) => <WaterTestItem waterTest={item} />}
      keyExtractor={item => item.id}
    />
  ) : (
    <Text>Aucun test n'est enregistré :(</Text>
  );
};
