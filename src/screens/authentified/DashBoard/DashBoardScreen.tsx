import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  ActivityIndicator,
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
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { Notifications } from "./notifications/Notifications";
import { Member } from "../../../services/memberService";
import { Tank } from "../../../store/TankStore";
import { Alert } from "../../../store/AlertStore";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [isTankItemVisible, setTankItemVisible] = useState(true);
  const [messageInfo, setMessageInfo] = useState("");
  const [isMemberLoading, setMemberLoading] = useState(true);
  const [isTankLoading, setTankLoading] = useState(true);
  const [isNotificationsLoading, setNotificationsLoading] = useState(true);
  const [member, setMember] = useState<Member>(undefined);
  const [tankList, setTankList] = useState<Tank[]>([]);
  const [notifications, setNotifications] = useState<Alert[]>([]);

  const navigation = useNavigation();

  const { memberStore, tankStore, alertStore } = RootStore;

  useEffect(() => {
    if (memberStore.memberState === "done") {
      setMember(memberStore.member);
      setMemberLoading(false);
      if (tankStore.tankState !== "done") {
        tankStore.fetchTankList();
      } else {
        setTankList(tankStore.tankList);
        setTankLoading(false);
      }
      if (alertStore.notificationsState !== "done") {
        alertStore.fetchNotifications();
      } else {
        setNotifications(alertStore.notifications);
        setNotificationsLoading(false);
      }
    } else {
      memberStore.fetchMember();
    }
  }, [
    memberStore.memberState,
    tankStore.tankState,
    alertStore.notificationsState,
  ]);

  const newTankPress = () => setNewTankFormVisible(true);
  const populationPress = () => navigation.navigate("handlePopulation");
  const equipmentPress = () => navigation.navigate("handleEquipment");
  const toggleTankForm = () => {
    setTankItemVisible(!isTankItemVisible);
    setNewTankFormVisible(!isNewTankFormVisible);
  };

  return (
    <View style={styles.page}>
      <Header centerComponent={<ReefHeaderTitle title="TABLEAU DE BORD" />} />
      <MessageInfo message={messageInfo} />
      {isMemberLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 16 }}>
          Bienvenue {member?.userName.toLocaleUpperCase()} !
        </Text>
      )}

      {isTankLoading && <ActivityIndicator />}

      {tankList.length > 0 && !isNewTankFormVisible && (
        <>
          {isNotificationsLoading ? (
            <ActivityIndicator />
          ) : (
            <Notifications notifications={notifications} />
          )}

          <MainTankItem editFunction={toggleTankForm} tank={tankList[0]} />
          <TankPicture />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <ReefButton title="Mes pensionnaires" onPress={populationPress} />
            <ReefButton title="Mon équipement" onPress={equipmentPress} />
          </View>
        </>
      )}

      {tankList.length === 0 && (
        <>
          <Text>Vous n'avez pas d'aquarium : créez en un !</Text>
          <ReefButton title="Créer un Aquarium" onPress={newTankPress} />
        </>
      )}

      {isNewTankFormVisible && member && (
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
    alignItems: "center",
  },
});

export default DashboardScreen;
