import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  ActivityIndicator
} from "react-native";
import { Header, Button } from "react-native-elements";
import { MessageInfo } from "../../../components/MessageInfo";
import { NewTankForm } from "./aquarium/TankForm";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";
import { MainTankItem } from "./aquarium/MainTankItem";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [isTankItemVisible, setTankItemVisible] = useState(true);
  const [messageInfo, setMessageInfo] = useState("");
  const [rootStore] = useState(RootStore);
  const navigation = useNavigation();

  if (rootStore.memberStore.memberState === "pending") {
    rootStore.memberStore.fetchMember();
  }
  if (rootStore.tankStore.tankState === "pending") {
    rootStore.tankStore.fetchTankList();
  }

  const isMemberLoading = rootStore.memberStore.memberState === "pending";
  const isTankLoading = rootStore.tankStore.tankState === "pending";
  const member = rootStore.memberStore.member;
  const tankList = rootStore.tankStore.tankList.slice();
  const newTankPress = () => setNewTankFormVisible(true);
  const populationPress = () => navigation.navigate("handlePopulation");
  const equipmentPress = () => navigation.navigate("handleEquipment");
  const toggleTankForm = () => {
    setTankItemVisible(!isTankItemVisible);
    setNewTankFormVisible(!isNewTankFormVisible);
  };

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
      <MessageInfo message={messageInfo} />

      {isTankLoading ? (
        <ActivityIndicator />
      ) : (
        isTankItemVisible && (
          <MainTankItem editFunction={toggleTankForm} tankList={tankList} />
        )
      )}

      {tankList.length === 0 && (
        <Button title="Créer un Aquarium" onPress={newTankPress} />
      )}

      {isNewTankFormVisible && (
        <NewTankForm
          memberId={member.id}
          infoCallBack={setMessageInfo}
          showFormCallback={toggleTankForm}
          tankToSave={tankList[0] ?? null}
        />
      )}

      {tankList[0] !== null && (
        <Button title="Mes pensionnaires" onPress={populationPress} />
      )}
      {tankList[0] !== null && (
        <Button title="Mon équipement" onPress={equipmentPress} />
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
