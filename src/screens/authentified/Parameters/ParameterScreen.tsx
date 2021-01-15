import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import mailIcon from "../../../assets/icons/mail.png";
import { disconnect } from "../../../services/rootService";
import RootStore from "../../../store/RootStore";
import { handleSuggestEmail } from "../../../utils/helpers";

const ParameterScreen = () => {
  const navigation = useNavigation();
  const hasATank = RootStore.tankStore.tankList.length > 0;


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
        {hasATank && <ReefButton
          title="Alertes"
          onPress={() => navigation.navigate("myAlerts")}
        />}
        <ReefButton
          title="Outils"
          onPress={() => navigation.navigate("myTools")}
        />
        <ReefButton
          title="Se déconnecter"
          onPress={() => (disconnect(), navigation.navigate("Signout"))}
        />

        <ReefButton
          icon={mailIcon}
          title="Mail à l'admin"
          onPress={() => handleSuggestEmail()}
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
    justifyContent: "space-around"
  }
});

export default ParameterScreen;
