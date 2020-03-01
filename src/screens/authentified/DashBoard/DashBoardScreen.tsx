import React, { useState } from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import { Header, Button } from "react-native-elements";
import { CustomMessage } from "../../../components/CustomText";
import { NewTankForm } from "./components/TankForm";
import { observer } from "mobx-react";
import memberStore from "../../../store/memberStore";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Vous n'avez aucun aquarium");
  const [store] = useState(() => new memberStore());

  return (
    <View style={styles.page}>
      <Header
        centerComponent={
          <Text style={{ fontSize: 24 }}>
            Bienvenu cher {store.member.pseudo} {store.token}
          </Text>
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
});

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
