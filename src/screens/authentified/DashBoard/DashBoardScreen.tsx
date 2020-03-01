import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  ActivityIndicator
} from "react-native";
import { Header, Button } from "react-native-elements";
import { CustomMessage } from "../../../components/CustomText";
import { NewTankForm } from "./components/TankForm";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Vous n'avez aucun aquarium");
  const [rootStore] = useState(() => new RootStore());

  rootStore.memberStore.memberState === "pending"
    ? rootStore.memberStore.fetchMember()
    : null;

  //   rootStore.memberStore.memberState === "done" &&
  //   rootStore.memberStore.tankState === "pending"
  //   ? dataTankStore.fetchTankList()
  //   : null;

  // dataTankStore.tankState === "done"
  //   ? console.log("Une liste d'aquariums a été trouvée :)")
  //   : null;

  return (
    <View style={styles.page}>
      {rootStore.memberStore.memberState === "pending" ? (
        <ActivityIndicator />
      ) : (
        <Header
          centerComponent={
            <Text style={{ fontSize: 16 }}>
              Bienvenue {rootStore.memberStore.member.pseudo.toUpperCase()} !
            </Text>
          }
          backgroundColor="green"
        />
      )}

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
