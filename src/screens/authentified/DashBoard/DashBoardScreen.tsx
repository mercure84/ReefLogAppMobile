import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  ActivityIndicator
} from "react-native";
import { Header, Button } from "react-native-elements";
import { CustomMessage } from "../../../components/CustomMessage";
import { NewTankForm } from "./components/TankForm";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Vous n'avez aucun aquarium");
  const [rootStore, setRootStore] = useState(new RootStore());

  rootStore.memberStore.memberState === "pending"
    ? rootStore.memberStore.fetchMember()
    : null;

  const isLoading = rootStore.memberStore.memberState === "pending";
  const userName = rootStore.memberStore.member.pseudo.toUpperCase();
  const memberId = rootStore.memberStore.member.id;
  const handlePress = () => setNewTankFormVisible(true);
  return (
    <View style={styles.page}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Header
          centerComponent={
            <Text style={{ fontSize: 16 }}>Bienvenue {userName} !</Text>
          }
          backgroundColor="green"
        />
      )}

      <Button title="Créer un Aquarium" onPress={handlePress} />
      <CustomMessage display={true} message={messageInfo} />
      {isNewTankFormVisible && (
        <NewTankForm
          memberId={memberId}
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
