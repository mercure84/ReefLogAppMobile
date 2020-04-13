import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../store/RootStore";
import { observer } from "mobx-react";
import { WaterTestItem } from "./waterTest/WaterTestItem";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";

export const StoryScreen = observer(() => {
  const navigation = useNavigation();
  if (RootStore.waterTestStore.waterTestState === "pending") {
    RootStore.waterTestStore.fetchWaterTestList();
  }
  const isTestsLoading = RootStore.waterTestStore.waterTestState === "pending";
  const dataWaterTestList = RootStore.waterTestStore.waterTestListData;

  const hasATank = RootStore.tankStore.tankList.length > 0;

  return (
    <>
      <Header
        centerComponent={<ReefHeaderTitle title="MON JOURNAL" />}
        backgroundColor="white"
        backgroundImage={require("../../../assets/story.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />
      {hasATank ? <><ReefButton
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
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
                scrollEnabled={true}
              />
            )}
        </View></> : <Text>Créer d'abord un Aquarium avant de consulter cette page !</Text>}
    </>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
});
