import React from "react";
import { WaterTest } from "../../../../services/waterTestService";
import { FlatList, Text, View } from "react-native";
import { WaterTestItem } from "./WaterTestItem";

type Props = {
  waterTestList: WaterTest[];
};

export const WaterTestListDisplay = ({ waterTestList }: Props) => {
  console.log("WTLIst = " + waterTestList.toString());

  return (
    <View>
      <FlatList
        style={{ marginBottom: 64 }}
        data={waterTestList}
        renderItem={({ item }) => <WaterTestItem waterTest={item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
        scrollEnabled={true}
      />
    </View>
  );
};
