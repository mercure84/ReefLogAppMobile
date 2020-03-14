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
import { MainTankDisplay } from "./components/MainTankDisplay";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");
  const [rootStore, setRootStore] = useState(RootStore);

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

  const member = rootStore.memberStore.member;
  const tankList = rootStore.tankStore.tankList.slice();
  const newTankPress = () => setNewTankFormVisible(true);

  return (
    <View style={styles.page}>
      {isMemberLoading ? (
        <ActivityIndicator />
      ) : (
        <Header
          centerComponent={
            <Text style={{ fontSize: 16 }}>
              Bienvenue {member.userName.toLocaleUpperCase()} !
            </Text>
          }
          backgroundColor="green"
        />
      )}
      <CustomMessage display={true} message={messageInfo} />

      {isTankLoading ? (
        <ActivityIndicator />
      ) : (
        <MainTankDisplay tankList={tankList} />
      )}

      {tankList.length === 0 && (
        <Button title="Créer un Aquarium" onPress={newTankPress} />
      )}
      {isNewTankFormVisible && (
        <NewTankForm
          memberId={member.id}
          infoCallBack={setMessageInfo}
          showFormCallback={setNewTankFormVisible}
          tankToSave={null}
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
    alignItems: "center"
  }
});

export default DashboardScreen;
