import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  ActivityIndicator
} from "react-native";
import { Header } from "react-native-elements";
import { MessageInfo } from "../../../components/MessageInfo";
import { NewTankForm } from "./aquarium/TankForm";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";
import { MainTankItem } from "./aquarium/MainTankItem";
import { useNavigation } from "@react-navigation/native";
import { TankPicture } from "./aquarium/TankPicture";
import { ReefButton } from "../../../components/ReefButton";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [isTankItemVisible, setTankItemVisible] = useState(true);
  const [messageInfo, setMessageInfo] = useState("");
  const navigation = useNavigation();

  if (RootStore.memberStore.memberState === "pending") {
    RootStore.memberStore.fetchMember();
  }
  if (RootStore.tankStore.tankState === "pending") {
    RootStore.tankStore.fetchTankList();
  }

  const isMemberLoading = RootStore.memberStore.memberState === "pending";
  const isTankLoading = RootStore.tankStore.tankState === "pending";
  const member = RootStore.memberStore.member;
  const tankList = RootStore.tankStore.tankList.slice();
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

      {isTankLoading && <ActivityIndicator />}

      {tankList.length > 0 && !isNewTankFormVisible && (
        <>
          <MainTankItem editFunction={toggleTankForm} tankList={tankList} />
          <TankPicture />
          <ReefButton title="Mes pensionnaires" onPress={populationPress} />
          <ReefButton title="Mon équipement" onPress={equipmentPress} />
        </>
      )}

      {tankList.length === 0 && (
        <>
          <Text>Vous n'avez pas d'aquarium : créez en un !</Text>
          <ReefButton title="Créer un Aquarium" onPress={newTankPress} />
        </>
      )}

      {isNewTankFormVisible && (
        <NewTankForm
          memberId={member.id}
          infoCallBack={setMessageInfo}
          showFormCallback={toggleTankForm}
          tankToSave={tankList[0] ?? null}
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
