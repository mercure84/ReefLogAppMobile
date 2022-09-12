import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
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
import { observer } from "mobx-react";
import { Fish } from "../../../../store/FishStore";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../../components/styles";

export const FishListScreen = observer(() => {
  const { darkColor } = useContext(ThemeContext).theme.theme;
  const { fishStore } = RootStore;

  const [isFishFormVisible, setFishFormVisible] = useState(false);
  const navigation = useNavigation();

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
        <View style={styles.buttonContainer}>
          <ReefButton
            title="Ajouter"
            size="medium"
            onPress={() => setFishFormVisible(true)}
          />
          <ReefButton
            title="Recenser"
            size="medium"
            onPress={() => navigation.navigate("counting")}
          />
        </View>
      </>
    );
  };
  console.log("JULIEN FISHES ====> ", fishes);

  return (
    <View>
      {isFishLoading && <ReefActivityIndicator />}
      <FlatList
        ListHeaderComponent={<HeaderComponent />}
        data={fishes}
        renderItem={({ item }: { item: Fish }) => <FishItem fish={item} />}
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
});
