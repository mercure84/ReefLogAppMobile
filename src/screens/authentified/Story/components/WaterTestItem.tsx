import React from "react";
import { WaterTest } from "../../../../services/waterTestService";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { LoginForm } from "src/screens/welcome/components/LoginForm";

type Props = {
  waterTest: WaterTest;
};

export const WaterTestItem = ({ waterTest }: Props) => {
  //console.log("ammonium = " + waterTest.ammoniac);
  return (
    <Card>
      <Text>Date : {waterTest.date}</Text>
      {waterTest.temperature !== null ? (
        <Text>Température : {waterTest.temperature} °C </Text>
      ) : null}
      {waterTest.salinity !== null ? (
        <Text>Salinité : {waterTest.salinity} ppt</Text>
      ) : null}
      {waterTest.alcalinity !== null ? (
        <Text>KH : {waterTest.alcalinity} </Text>
      ) : null}
      {waterTest.calcium !== null ? (
        <Text>Calcium : {waterTest.calcium} ppm</Text>
      ) : null}
      {waterTest.magnesium !== null ? (
        <Text>Magnesium : {waterTest.magnesium} ppm </Text>
      ) : null}
      {waterTest.ammoniac !== null ? (
        <Text>NH4 : {waterTest.ammoniac} ppm</Text>
      ) : null}
      {waterTest.nitrates !== null ? (
        <Text>NO3 : {waterTest.nitrates} ppm</Text>
      ) : null}
      {waterTest.nitrites !== null ? (
        <Text>NO2 : {waterTest.nitrites} ppm</Text>
      ) : null}
      {waterTest.silicates !== null ? (
        <Text>Silicates : {waterTest.silicates} ppm </Text>
      ) : null}
      {waterTest.ph !== null ? <Text>pH : {waterTest.ph} </Text> : null}
    </Card>
  );
};
