import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { ThemeContext } from "../../../../../App";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefButton } from "../../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { FishCardItem } from "./FishCardItem";
import { FishFormModal } from "./FishFormModal";

export const FishListScreen = () => {
  const { darkColor } = useContext(ThemeContext).theme.theme;

  const [fishes, setFishes] = useState([]);
  const [isFishFormVisible, setFishFormVisible] = useState(false);

  const HeaderComponent = () => {
    return (
      <>
        <Header
          containerStyle={{ backgroundColor: darkColor }}
          leftComponent={<GoBackButton />}
          centerComponent={<ReefHeaderTitle title="Mes Poissons" />}
        />
        <Text>Mes poissons : </Text>
        <ReefButton
          title={"Ajouter"}
          size="medium"
          onPress={() => setFishFormVisible(true)}
        />
      </>
    );
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={<HeaderComponent />}
        data={fishes}
        renderItem={({ item }) => <FishCardItem />}
        keyExtractor={({ id }) => id.toString()}
        ListEmptyComponent={<Text>Aucun enregistrement</Text>}
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
