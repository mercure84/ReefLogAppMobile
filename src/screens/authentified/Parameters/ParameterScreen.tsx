import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeData } from "../../../services/storageDevice";
import { Header } from "react-native-elements";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";

export const disconnect = () => {
  removeData("token");
};

const ParameterScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        centerComponent={<ReefHeaderTitle title="MES PARAMETRES" />}
        backgroundColor="white"
        backgroundImage={require("../../../assets/parameters.png")}
        backgroundImageStyle={{ opacity: 0.8 }}
      />
      <View style={styles.buttonContainer}>
        <ReefButton
          title="Mon profil"
          onPress={() => navigation.navigate("myProfil")}
        />
        <ReefButton
          title="Alertes"
          onPress={() => navigation.navigate("myAlerts")}
        />
        <ReefButton
          title="Outils"
          onPress={() => navigation.navigate("myTools")}
        />
        <ReefButton
          title="Se déconnecter"
          onPress={() => (disconnect(), navigation.navigate("Signout"))}
        />
      </View>
    </>
  );
};
type Style = {
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  buttonContainer: {
    padding: 32,
    height: "60%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

export default ParameterScreen;
