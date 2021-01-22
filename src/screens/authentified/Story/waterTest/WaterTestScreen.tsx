import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { ReefButton } from "../../../../components/ReefButton";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { WaterTestItem } from "./WaterTestItem";
import RootStore from "../../../../store/RootStore";
import { WaterTestFormModal } from "./WaterTestFormModal";

export const WaterTestScreen = observer(() => {
  const [isWaterTestFormVisible, setWaterTestFormVisible] = useState(false);

  const { waterTestStore } = RootStore;

  if (waterTestStore.fetchState === "pending") {
    waterTestStore.fetchWaterTestList();
  }

  const isTestsLoading = RootStore.waterTestStore.fetchState === "pending";
  const dataWaterTestList = RootStore.waterTestStore.waterTestListData;

  const HeaderComponent = () => {
    return (
      <View>
        <Header
          leftComponent={<GoBackButton />}
          centerComponent={<ReefHeaderTitle title="MES TESTS" />}
        />

        <View style={{ alignSelf: "center" }}>
          <ReefButton
            size="medium"
            title="Nouveau Test"
            onPress={() => setWaterTestFormVisible(true)}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.page}>
        {isTestsLoading && <ActivityIndicator />}

        <FlatList
          ListHeaderComponent={<HeaderComponent />}
          data={dataWaterTestList}
          renderItem={({ item }) => <WaterTestItem waterTest={item} />}
          keyExtractor={({ id }) => id.toString()}
          ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
          scrollEnabled={true}
        />
      </View>

      {isWaterTestFormVisible && (
        <WaterTestFormModal
          toggleForm={setWaterTestFormVisible}
          waterTestToSave={null}
          visible={isWaterTestFormVisible}
        />
      )}
    </View>
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
