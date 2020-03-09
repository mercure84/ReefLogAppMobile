import React from "react";
import { WaterTest } from "../../../../services/waterTestService";
import { FlatList, Text, View } from "react-native";
import { WaterTestItem } from "./WaterTestItem";
import { observer } from "mobx-react";

type Props = {
  waterTestList: WaterTest[];
};

export const WaterTestListDisplay = observer(({ waterTestList }: Props) => {
  console.log(
    "Test d'une donnée de waterTestList = " + waterTestList[0].temperature
  );

  const data = waterTestList;
  console.log(
    data[0].temperature +
      "   " +
      data[1].temperature +
      "   " +
      data[2].temperature
  );
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <WaterTestItem waterTest={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Aucun test n'est enregistré :(</Text>}
      />
    </View>
  );
});
