import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { ThemeContext } from "../../../../../App";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ReefButton } from "../../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import RootStore from "../../../../store/RootStore";
import { FishItem } from "./FishItem";
import { FishFormModal } from "./FishFormModal";

export const FishListScreen = () => {
  const { darkColor } = useContext(ThemeContext).theme.theme;
  const { fishStore } = RootStore;

  const [isFishFormVisible, setFishFormVisible] = useState(false);

  useEffect(() => {
    const getFishes = async () => {
      if (
        fishStore.updateState === "done" &&
        fishStore.fetchState === "pending"
      ) {
        await fishStore.fetchFishes();
      }
    };
    getFishes();
  }, [fishStore.fetchState]);

  const isFishLoading = fishStore.fetchState !== "done";
  const fishes = fishStore.fishesData;
  const HeaderComponent = () => {
    return (
      <>
        <Header
          containerStyle={{ backgroundColor: darkColor }}
          leftComponent={<GoBackButton />}
          centerComponent={<ReefHeaderTitle title="Mes Poissons" />}
        />
        <ReefButton
          title="Ajouter"
          size="medium"
          onPress={() => setFishFormVisible(true)}
        />
      </>
    );
  };
  console.log("JULIEN FISHES ====> ", fishes);

  return (
    <View>
      {isFishLoading && <ReefActivityIndicator />}
      <FlatList
        ListHeaderComponent={<HeaderComponent />}
        data={null}
        renderItem={({ item }) => <FishItem fish={item} />}
        keyExtractor={({ id }) => id.toString()}
        ListEmptyComponent={() => <Text>Aucun enregistrement</Text>}
        scrollEnabled={true}
      />

      {isFishFormVisible && (
        <FishFormModal
          showForm={setFishFormVisible}
          fishToSave={null}
          visible={isFishFormVisible}
        />
      )}
    </View>
  );
};
