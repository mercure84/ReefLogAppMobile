import React from "react";
import { Header } from "react-native-elements";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";
import { SocialTankItem } from "./components/SocialTankItem";

export const SocialScreen = observer(() => {
  if (RootStore.socialStore.socialState === "pending") {
    RootStore.socialStore.fetchSocialTanks();
  }

  const isSocialTanksLoading = RootStore.socialStore.socialState === "pending";
  const dataSocialsTanks = RootStore.socialStore.socialTanksData;

  return (
    <>
      <Header
        centerComponent={<ReefHeaderTitle title="COMMUNAUTE" />}
        backgroundColor="white"
        backgroundImage={require("../../../assets/social.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />
      <View style={styles.page}>
        {isSocialTanksLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{ marginBottom: 64 }}
            data={dataSocialsTanks}
            renderItem={({ item }) => (
              <SocialTankItem tank={item} editFunction={null} />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
            scrollEnabled={true}
          />
        )}
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
