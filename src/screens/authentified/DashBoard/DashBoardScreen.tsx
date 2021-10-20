import React, { useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";
import { Header } from "react-native-elements";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";
import { MainTankItem } from "./aquarium/MainTankItem";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { Member } from "../../../services/memberService";
import { Tank } from "../../../store/TankStore";
import { TankFormModal } from "./aquarium/TankFormModal";
import { Alert } from "../../../store/AlertStore";
import { Notifications } from "./notifications/Notifications";
import { ReefActivityIndicator } from "../../../components/ReefActivityIndicator";
import { blueCB } from "../../../components/colors";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [isTankItemVisible, setTankItemVisible] = useState(true);
  const [member, setMember] = useState<Member>();
  const [tankList, setTankList] = useState<Tank[]>([]);
  const [notifications, setNotifications] = useState<Alert[]>([]);

  const { memberStore, tankStore, alertStore } = RootStore;

  useEffect(() => {
    const getMember = async () => {
      if (memberStore.fetchState === "pending") {
        await memberStore.fetchMember();
      }
      if (memberStore.fetchState === "done") {
        setMember(memberStore.member);
      }
    };
    getMember();
  }, [memberStore.fetchState]);

  useEffect(() => {
    const getTank = async () => {
      if (member && tankStore.fetchState === "pending") {
        await tankStore.fetchTankList();
      }
      if (tankStore.fetchState === "done") setTankList(tankStore.tankList);
    };
    getTank();
  }, [member, tankStore.fetchState]);

  useEffect(() => {
    const getNotifications = async () => {
      if (
        member &&
        tankList &&
        alertStore.notificationsFetchState === "pending"
      ) {
        await alertStore.fetchNotifications();
      }
      if (alertStore.fetchState === "done") {
        setNotifications(alertStore.notifications);
      }
    };
    getNotifications();
  }, [tankList, alertStore.notificationsFetchState]);

  const isMemberLoading = memberStore.fetchState === "pending";
  const isTankLoading = tankStore.fetchState === "pending";
  const isNotifLoading = alertStore.notificationsFetchState === "pending";
  const newTankPress = () => setNewTankFormVisible(true);
  const toggleTankForm = () => {
    setTankItemVisible(!isTankItemVisible);
    setNewTankFormVisible(!isNewTankFormVisible);
  };

  return (
    <View style={styles.page}>
      <Header
        containerStyle={{ backgroundColor: blueCB }}
        centerComponent={<ReefHeaderTitle title="TABLEAU DE BORD" />}
      />

      {isMemberLoading ? (
        <ReefActivityIndicator />
      ) : (
        <Text style={{ fontSize: 16 }}>
          Bienvenue {member?.userName?.toLocaleUpperCase()} !
        </Text>
      )}

      {isTankLoading ? (
        <ReefActivityIndicator />
      ) : (
        tankList?.length > 0 && (
          <MainTankItem editFunction={toggleTankForm} tank={tankList[0]} />
        )
      )}

      {!isTankLoading && tankList?.length === 0 && (
        <>
          <Text>Vous n'avez pas d'aquarium : créez en un !</Text>
          <ReefButton title="Créer un Aquarium" onPress={newTankPress} />
        </>
      )}

      {!isNotifLoading && <Notifications notifications={notifications} />}

      {isNewTankFormVisible && (
        <TankFormModal
          showFormCallback={toggleTankForm}
          tankToSave={tankList[0] ?? null}
          visible={isNewTankFormVisible}
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
