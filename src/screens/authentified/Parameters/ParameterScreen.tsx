import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import mailIcon from "../../../assets/icons/mail.png";
import { logout } from "../../../services/rootService";
import RootStore from "../../../store/RootStore";
import { handleSuggestEmail } from "../../../utils/helpers";
import { blueCB } from "../../../components/colors";

const ParameterScreen = () => {
  const navigation = useNavigation();
  const hasATank = RootStore.tankStore.tankList.length > 0;

  const logoutOnpress = async () => {
    await logout();
    navigation.navigate("Logout");
  };

  return (
    <>
      <Header
        containerStyle={{ backgroundColor: blueCB }}
        centerComponent={<ReefHeaderTitle title="MES PARAMETRES" />}
      />
      <View style={styles.buttonContainer}>
        <ReefButton
          title="Mon profil"
          onPress={() => navigation.navigate("myProfil")}
        />
        {hasATank && (
          <ReefButton
            title="Mes Alertes"
            onPress={() => navigation.navigate("myAlerts")}
          />
        )}
        <ReefButton
          title="Outils"
          onPress={() => navigation.navigate("myTools")}
        />
        <ReefButton title="Se déconnecter" onPress={logoutOnpress} />

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
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ParameterScreen;
