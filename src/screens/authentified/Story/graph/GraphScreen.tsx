import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { AreaChart, Grid, LineChart, XAxis } from "react-native-svg-charts";
import { blueCB } from "../../../../components/colors";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { TypeTest } from "../../../../store/AlertStore";
import RootStore from "../../../../store/RootStore";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import moment from "moment";

type dataLine = {
  date: number;
  value: number;
};

export const GraphScreen = observer(() => {
  const { graphStore } = RootStore;
  const [waterTest, setWaterTest] = useState<TypeTest | null>(
    TypeTest.ALCALINITY
  );
  const [data, setData] = useState<dataLine[]>([]);

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

  useEffect(() => {
    let myData: dataLine[] = [];
    if (graphData?.measures) {
      graphData.measures.map((measure) => {
        const dateToNumber = moment(measure.date);
        console.log("Date To Number  = ", dateToNumber);

        myData.push({ date: dateToNumber, value: measure.value });
      });
      console.log("My Data = ", myData);
      setData(myData);
    }
  }, [graphData]);

  return (
    <View>
      <Header
        containerStyle={{ backgroundColor: blueCB }}
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="GRAPHIQUES" />}
      />

      {isGraphLoading && <ReefActivityIndicator />}
      <Text>MES DONNEES DE GRAPHIQUE POUR ALCALINITY =</Text>
      {data && (
        <>
          <LineChart
            style={{
              height: "70%",
              width: "90%",
              padding: 8,
              alignSelf: "center",
            }}
            data={data}
            yAccessor={({ item }) => item.value}
            xAccessor={({ item }) => item.date}
            xScale={scale.scaleTime}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveLinear}
            numberOfTicks={5}
            yMin={0}
            yMax={15}
            svg={{ stroke: "rgb(55, 65, 244)" }}
          >
            <Grid />
          </LineChart>
          <XAxis
            data={data}
            svg={{
              fill: "black",
              fontSize: 8,
              fontWeight: "bold",
              rotation: 20,
              originY: 30,
              y: 5,
            }}
            xAccessor={({ item }) => item.date}
            scale={scale.scaleTime}
            numberOfTicks={10}
            style={{
              marginHorizontal: -15,
              height: 20,
              width: "90%",
              padding: 8,
              alignSelf: "center",
            }}
            contentInset={{ left: 10, right: 25 }}
            formatLabel={(value) => moment(value).format("Do MM YY")}
          />
        </>
      )}
    </View>
  );
});
