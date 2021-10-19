import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { blueCB } from "../../../../components/colors";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { TypeTest } from "../../../../store/AlertStore";
import RootStore from "../../../../store/RootStore";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

type dataLine = {
  date: moment.Moment;
  value: number;
};

const minMaxDefault = { minY: 0, maxY: 0 };

export const GraphScreen = observer(() => {
  const { graphStore } = RootStore;
  const [waterTest, setWaterTest] = useState<TypeTest | null>(
    TypeTest.ALCALINITY
  );
  const [data, setData] = useState<dataLine[]>([]);
  const [minMaxY, setMinMaxY] = useState<{ minY: number; maxY: number }>({
    minY: 0,
    maxY: 0,
  });

  useEffect(() => {
    const getGraph = async (test: TypeTest | null) => {
      if (test && graphStore.fetchState === "pending") {
        await graphStore.fetchGraph(test);
      }
    };
    getGraph(waterTest);
  }, [waterTest, graphStore.fetchState]);

  const isGraphLoading = graphStore.fetchState !== "done";
  const graphData = graphStore.graphData;

  useEffect(() => {
    let myData: dataLine[] = [];
    let minValue = 0;
    let maxValue = 0;
    if (graphData?.measures && graphData.measures.length > 0) {
      minValue = graphData.measures[0].value;
      graphData.measures.map((measure) => {
        const dateToNumber = moment(measure.date);
        minValue = measure.value < minValue ? measure.value : minValue;
        maxValue = measure.value > maxValue ? measure.value : maxValue;

        myData.push({ date: dateToNumber, value: measure.value });
      });
      setData(myData);
      setMinMaxY({
        minY: minValue - 1,
        maxY: maxValue + 1,
      });
    }
  }, [graphData]);

  return (
    <View>
      <Header
        containerStyle={{ backgroundColor: blueCB }}
        leftComponent={<GoBackButton />}
        centerComponent={<ReefHeaderTitle title="GRAPHIQUES" />}
      />
      <Picker
        style={{ height: 50, width: 200 }}
        mode="dropdown"
        selectedValue={waterTest ?? TypeTest.ALCALINITY}
        onValueChange={(itemValue) => {
          graphStore.clear();
          setMinMaxY(minMaxDefault);
          setWaterTest(itemValue as TypeTest);
        }}
      >
        <Picker.Item label={TypeTest.ALCALINITY} value={TypeTest.ALCALINITY} />
        <Picker.Item label={TypeTest.AMMONIAC} value={TypeTest.AMMONIAC} />
        <Picker.Item label={TypeTest.CALCIUM} value={TypeTest.CALCIUM} />
        <Picker.Item label={TypeTest.MAGNESIUM} value={TypeTest.MAGNESIUM} />
        <Picker.Item label={TypeTest.NITRATES} value={TypeTest.NITRATES} />
        <Picker.Item label={TypeTest.NITRITES} value={TypeTest.NITRITES} />
        <Picker.Item label={TypeTest.PH} value={TypeTest.PH} />
        <Picker.Item label={TypeTest.PHOSPHATES} value={TypeTest.PHOSPHATES} />
        <Picker.Item label={TypeTest.SALINITY} value={TypeTest.SALINITY} />
        <Picker.Item label={TypeTest.SILICATES} value={TypeTest.SILICATES} />
        <Picker.Item
          label={TypeTest.TEMPERATURE}
          value={TypeTest.TEMPERATURE}
        />
      </Picker>

      {isGraphLoading && <ReefActivityIndicator />}
      {graphData && graphData?.measures.length < 2 ? (
        <Text>Pas de données suffisantes pour dessiner un graphique</Text>
      ) : (
        <View style={{ height: "70%", padding: 8 }}>
          {/*           <YAxis
            data={data}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            formatLabel={(value) => `${value}`}
            numberOfTicks={graphData?.measures.length ?? 5}
          /> */}
          <LineChart
            style={{
              flex: 1,
            }}
            data={data}
            yAccessor={({ item }) => item.value}
            xAccessor={({ item }) => item.date}
            xScale={scale.scaleTime}
            contentInset={{ top: 10, bottom: 10 }}
            curve={shape.curveLinear}
            yMin={minMaxY.minY}
            yMax={minMaxY.maxY}
            svg={{ stroke: "rgb(55, 65, 244)" }}
          >
            <Grid />
          </LineChart>
          <View style={{ height: 200 }}>
            <XAxis
              data={data}
              svg={{
                fill: "black",
                fontSize: 8,
                fontWeight: "bold",
                rotation: 45,
                translateY: 10,
              }}
              xAccessor={({ item }) => item.date}
              scale={scale.scaleTime}
              numberOfTicks={graphData?.measures.length ?? 5}
              style={{ height: 150 }}
              contentInset={{ left: 10, right: 10 }}
              formatLabel={(value) => moment(value).format("DD MM YY")}
            />
          </View>
        </View>
      )}
    </View>
  );
});
