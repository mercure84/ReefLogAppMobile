import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react";
import { FlatList, Text } from "react-native";
import { Header } from "react-native-elements";
import { ThemeContext } from "../../../../../App";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ReefButton } from "../../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { Fish } from "../../../../store/FishStore";
import RootStore from "../../../../store/RootStore";
import { FishSelectItem } from "./FishSelectItem";

export const CountScreen = observer(() => {
  const { darkColor } = useContext(ThemeContext).theme.theme;
  const { fishStore } = RootStore;

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

  return (
    <>
      {isFishLoading && <ReefActivityIndicator />}
      <FlatList
        ListHeaderComponent={
          <Header
            containerStyle={{ backgroundColor: darkColor }}
            leftComponent={<GoBackButton />}
            centerComponent={<ReefHeaderTitle title="Recensement" />}
          />
        }
        data={fishes}
        renderItem={({ item }: { item: Fish }) => (
          <FishSelectItem fish={item} callback={() => null} />
        )}
        keyExtractor={({ id }) => id.toString()}
        ListEmptyComponent={() => <Text>Aucun enregistrement</Text>}
        scrollEnabled={true}
        ListFooterComponent={<ReefButton title={"Valider le recensement"} />}
      />
    </>
  );
});
