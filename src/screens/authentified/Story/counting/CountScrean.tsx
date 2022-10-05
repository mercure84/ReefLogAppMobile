import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
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
import Moment from "moment";

export const CountScreen = observer(() => {
  const { darkColor } = useContext(ThemeContext).theme.theme;
  const { fishStore } = RootStore;
  const [fishes, setFishes] = useState<Fish[]>();

  useEffect(() => {
    const getFishes = async () => {
      if (
        fishStore.updateState === "done" &&
        fishStore.fetchState === "pending"
      ) {
        await fishStore.fetchFishes();
      }
      setFishes(fishStore.fishesData);
    };
    getFishes();
  }, [fishStore.fetchState]);

  const isFishLoading = fishStore.fetchState !== "done";

  const changeFishPresence = (fishId: Fish["id"]) => {
    if (fishes) {
      const myFishToUpdate = fishes.find((fish) => fish.id === fishId);
      const index = fishes.findIndex((fish) => fish === myFishToUpdate);
      if (myFishToUpdate) {
        myFishToUpdate.isPresent = !myFishToUpdate.isPresent;
        let updatesFishes = [...fishes];
        updatesFishes[index] = myFishToUpdate;
        setFishes(updatesFishes);
      }
    }
  };

  return (
    <>
      {isFishLoading && <ReefActivityIndicator />}
      <FlatList
        ListHeaderComponent={
          <>
            <Header
              containerStyle={{ backgroundColor: darkColor }}
              leftComponent={<GoBackButton />}
              centerComponent={<ReefHeaderTitle title="Recensement" />}
            />
            <Text style={{ marginHorizontal: 8 }}>
              {`Recencer la population en date du ${Moment(new Date())
                .format("ll")
                .toString()}`}
            </Text>
          </>
        }
        data={fishes}
        renderItem={({ item }: { item: Fish }) => (
          <FishSelectItem fish={item} changePresence={changeFishPresence} />
        )}
        keyExtractor={({ id }) => id.toString()}
        ListEmptyComponent={() => <Text>Aucun enregistrement</Text>}
        scrollEnabled={true}
        ListFooterComponent={<ReefButton title={"Valider le recensement"} />}
      />
    </>
  );
});
