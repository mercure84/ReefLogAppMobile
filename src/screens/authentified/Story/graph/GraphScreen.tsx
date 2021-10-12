import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { blueCB } from "../../../../components/colors";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { TypeTest } from "../../../../store/AlertStore";
import RootStore from "../../../../store/RootStore";

export const GraphScreen = observer(() => {
  const { graphStore } = RootStore;
  const [waterTest, setWaterTest] = useState<TypeTest | null>(
    TypeTest.ALCALINITY
  );
  useEffect(() => {
    const getGraph = async (test: TypeTest | null) => {
      if (test && graphStore.fetchState === "pending") {
        console.log("Fetching here");
        await graphStore.fetchGraph(test);
      }
    };
    getGraph(waterTest);
  }, [waterTest, graphStore.fetchState]);
  const isGraphLoading = graphStore.fetchState !== "done";
  const graphData = graphStore.graphData;

  return (
    <View>
      <Header
        containerStyle={{ backgroundColor: blueCB }}
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="GRAPHIQUES" />}
      />

      {isGraphLoading && <ReefActivityIndicator />}
      <Text>MES DONNEES DE GRAPHIQUE POUR ALCALINITY =</Text>
      <Text>{graphData?.measures[0].date}</Text>
    </View>
  );
});
