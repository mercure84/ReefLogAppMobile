import React, { useState } from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import { Header, Button } from "react-native-elements";
import { CustomMessage } from "../../../components/CustomText";
import { NewTankForm } from "./components/TankForm";

const DashboardScreen = () => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Vous n'avez aucun aquarium");

  return (
    <View style={styles.page}>
      <Header
        centerComponent={
          <Text style={{ fontSize: 24 }}>Bienvenu cher X X </Text>
        }
        backgroundColor="green"
      />
      <Button
        title="Créer un Aquarium"
        onPress={() => setNewTankFormVisible(true)}
      />
      <CustomMessage display={true} message={messageInfo} />
      {isNewTankFormVisible && (
        <NewTankForm
          infoCallBack={setMessageInfo}
          showFormCallback={setNewTankFormVisible}
        />
      )}
    </View>
  );
};

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

export default DashboardScreen;
