import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,

} from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../store/RootStore";
import { observer } from "mobx-react";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { WaterTestItem } from "./waterTest/WaterTestItem";

export const StoryScreen = observer(() => {
  const navigation = useNavigation();
  if (RootStore.waterTestStore.waterTestState === "pending") {
    RootStore.waterTestStore.fetchWaterTestList();

  }

  const isWaterTestLoading = RootStore.waterTestStore.waterTestState === "pending"

  const hasATank = RootStore.tankStore.tankList.length > 0;

  return (
    <>
      <Header
        centerComponent={<ReefHeaderTitle title="MON JOURNAL" />}
        backgroundColor="white"
        backgroundImage={require("../../../assets/story.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />
      <View style={styles.page}>

        {hasATank ? <><ReefButton
          title="Mes Tests"
          onPress={() => navigation.navigate("waterTests")}
        />
          <ReefButton
            title="Mes évènements"
            onPress={() => navigation.navigate("events")}
          />
          <ReefButton
            title="Recensement"
            onPress={() => navigation.navigate("counting")}
          />
        </> : <Text>Créer d'abord un Aquarium avant de consulter cette page !</Text>}

        {isWaterTestLoading ? <ActivityIndicator /> : RootStore.waterTestStore.waterTestList.length > 0 && <>
          <Text>
            Mon dernier test enregistré :
        </Text>

          <WaterTestItem waterTest={RootStore.waterTestStore.waterTestList[0]} />
        </>}

      </View>
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
