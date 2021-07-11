import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { View, FlatList, Text, ViewStyle, StyleSheet } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { ReefButton } from "../../../../components/ReefButton";
import { Header } from "react-native-elements";
import { WaterTestItem } from "./WaterTestItem";
import RootStore from "../../../../store/RootStore";
import { WaterTestFormModal } from "./WaterTestFormModal";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { blueCB } from "../../../../components/colors";

export const WaterTestScreen = observer(() => {
  const [isWaterTestFormVisible, setWaterTestFormVisible] = useState(false);

  const { waterTestStore } = RootStore;

  useEffect(() => {
    const getWaterTests = async () => {
      if (
        waterTestStore.updateState === "done" &&
        waterTestStore.fetchState === "pending"
      ) {
        await waterTestStore.fetchWaterTests();
      }
    };
    getWaterTests();
  }, [waterTestStore.fetchState]);

  const isTestsLoading = RootStore.waterTestStore.fetchState !== "done";
  const waterTests = waterTestStore.waterTestListData;

  const HeaderComponent = () => {
    return (
      <View>
        <Header
          leftComponent={<GoBackButton />}
          containerStyle={{ backgroundColor: blueCB }}
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
        {isTestsLoading && <ReefActivityIndicator />}

        <FlatList
          ListHeaderComponent={<HeaderComponent />}
          data={waterTests}
          renderItem={({ item }) => <WaterTestItem waterTest={item} />}
          keyExtractor={({ id }) => id.toString()}
          ListEmptyComponent={<Text>Aucun enregistrement</Text>}
          scrollEnabled={true}
        />
      </View>

      {isWaterTestFormVisible && (
        <WaterTestFormModal
          showForm={setWaterTestFormVisible}
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
