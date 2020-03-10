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
import { ScrollView } from "react-native-gesture-handler";

const StoryScreen = observer(() => {
  const navigation = useNavigation();
  const [rootStore, setRootStore] = useState(RootStore);

  if (rootStore.waterTestStore.waterTestState === "pending") {
    rootStore.waterTestStore.fetchWaterTestList();
  }
  const isTestsLoading = rootStore.waterTestStore.waterTestState === "pending";
  const dataWaterTestList = rootStore.waterTestStore.waterTestListData;
  console.log("lenght of Data waterList " + dataWaterTestList.length);
  console.log("Data waterList " + dataWaterTestList);

  console.log(
    "Etat du store waterTest :  " + rootStore.waterTestStore.waterTestState
  );

  return (
    <View style={styles.page}>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mon journal</Text>}
        backgroundColor="green"
      />
      <ScrollView>
        <Button
          title="Ajouter un test de mon eau"
          onPress={() => navigation.navigate("addTests")}
        />
        {isTestsLoading ? (
          <ActivityIndicator />
        ) : (
          <WaterTestListDisplay waterTestList={dataWaterTestList} />
        )}
      </ScrollView>
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

export default StoryScreen;
