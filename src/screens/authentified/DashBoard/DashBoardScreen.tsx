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
import { Member } from "../../../services/memberServices";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Vous n'avez aucun aquarium");
  const [rootStore, setRootStore] = useState(new RootStore());
  const [member, setMember] = useState<Member>();

  rootStore.memberStore.memberState === "pending"
    ? rootStore.memberStore.fetchMember()
    : null;

  console.log("etat du store member : " + rootStore.memberStore.memberState);

  /*   rootStore.tankStore.tankState === "pending"
    ? rootStore.tankStore.fetchTankList()
    : null;
 */
  /* console.log("etat du store tank : " + rootStore.tankStore.tankState);

  if (rootStore.tankStore.tankState === "done") {
  } */
  const isMemberLoading = rootStore.memberStore.memberState === "pending";
  //const isTankLoading = rootStore.tankStore.tankState === "pending";
  // const userName = rootStore.memberStore.member.userName.toUpperCase();
  //const memberId = rootStore.memberStore.member.id;

  //const mainTank: Tank = rootStore.tankStore.tankList[0];

  const handlePress = () => setNewTankFormVisible(true);
  return (
    <View style={styles.page}>
      {isMemberLoading ? (
        <ActivityIndicator />
      ) : (
        <Header
          centerComponent={
            <Text style={{ fontSize: 16 }}>Bienvenue membre !</Text>
          }
          backgroundColor="green"
        />
      )}

      {/*       {false ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={{ fontSize: 16 }}>Aquarium : {mainTank.name} !</Text>
          <Text style={{ fontSize: 16 }}>Volume : {mainTank.rawVolume} !</Text>

          <Text style={{ fontSize: 16 }}>
            Maintenance : {mainTank.typeOfMaintenance} !
          </Text>

          <Text style={{ fontSize: 16 }}>
            Population : {mainTank.mainPopulation} !
          </Text>
        </View>
      )}
 */}
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
