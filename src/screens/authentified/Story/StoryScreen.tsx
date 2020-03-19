import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ViewStyle,
  ActivityIndicator
} from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../store/RootStore";
import { observer } from "mobx-react";
import { WaterTestListDisplay } from "./components/WaterTestListDisplay";

const StoryScreen = observer(() => {
  const navigation = useNavigation();
  const [rootStore, setRootStore] = useState(RootStore);

  if (rootStore.waterTestStore.waterTestState === "pending") {
    rootStore.waterTestStore.fetchWaterTestList();
  }
  const isTestsLoading = rootStore.waterTestStore.waterTestState === "pending";
  const dataWaterTestList = rootStore.waterTestStore.waterTestListData;

  return (
    <View style={styles.page}>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mon journal</Text>}
        backgroundColor="green"
      />
      <Button
        title="Ajouter un test de mon eau"
        onPress={() => navigation.navigate("addTests")}
      />
      {isTestsLoading ? (
        <ActivityIndicator />
      ) : (
        <WaterTestListDisplay waterTestList={dataWaterTestList} />
      )}
    </View>
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
