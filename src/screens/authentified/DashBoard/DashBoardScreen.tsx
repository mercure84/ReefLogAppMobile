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

  if (rootStore.memberStore.memberState === "pending") {
    rootStore.memberStore.fetchMember();
  }
  console.log("etat du store member : " + rootStore.memberStore.memberState);

  if (rootStore.tankStore.tankState === "pending") {
    rootStore.tankStore.fetchTankList();
  }

  console.log("etat du store tank : " + rootStore.tankStore.tankState);

  const isMemberLoading = rootStore.memberStore.memberState === "pending";
  const isTankLoading = rootStore.tankStore.tankState === "pending";

  const handlePress = () => setNewTankFormVisible(true);
  return (
    <View style={styles.page}>
      {isMemberLoading ? (
        <ActivityIndicator />
      ) : (
        <Header
          centerComponent={
            <Text style={{ fontSize: 16 }}>
              Bienvenue {rootStore.memberStore.member.userName} !
            </Text>
          }
          backgroundColor="green"
        />
      )}

      {isTankLoading ? (
        <ActivityIndicator />
      ) : rootStore.tankStore.tankList.length > 0 ? (
        <View>
          <Text style={{ fontSize: 16 }}>
            Aquarium : {rootStore.tankStore.tankList[0].name}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Volume : {rootStore.tankStore.tankList[0].rawVolume} litres
          </Text>

          <Text style={{ fontSize: 16 }}>
            Maintenance : {rootStore.tankStore.tankList[0].typeOfMaintenance}
          </Text>

          <Text style={{ fontSize: 16 }}>
            Population : {rootStore.tankStore.tankList[0].mainPopulation}
          </Text>
        </View>
      ) : null}

      <Button title="Créer un Aquarium" onPress={handlePress} />
      <CustomMessage display={true} message={messageInfo} />
      {isNewTankFormVisible && (
        <NewTankForm
          memberId={91}
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
