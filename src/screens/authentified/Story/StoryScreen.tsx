import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../store/RootStore";
import { observer } from "mobx-react";
import { WaterTestItem } from "./waterTest/WaterTestItem";
import { ReefButton } from "../../../components/ReefButton";

const StoryScreen = observer(() => {
  const navigation = useNavigation();
  if (RootStore.waterTestStore.waterTestState === "pending") {
    RootStore.waterTestStore.fetchWaterTestList();
  }
  const isTestsLoading = RootStore.waterTestStore.waterTestState === "pending";
  const dataWaterTestList = RootStore.waterTestStore.waterTestListData;

  return (
    <>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mon journal</Text>}
        backgroundColor="green"
      />
      <ReefButton
        title="Nouveau test"
        onPress={() => navigation.navigate("addTests")}
      />
      <View style={styles.page}>
        {isTestsLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{ marginBottom: 64 }}
            data={dataWaterTestList}
            renderItem={({ item }) => <WaterTestItem waterTest={item} />}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
            scrollEnabled={true}
          />
        )}
      </View>
    </>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch"
  }
});

export default StoryScreen;
