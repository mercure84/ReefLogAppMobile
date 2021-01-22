import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Text,
  ActivityIndicator,
} from "react-native";
import { Header } from "react-native-elements";
import { observer } from "mobx-react";
import RootStore from "../../../store/RootStore";
import { MainTankItem } from "./aquarium/MainTankItem";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { Member } from "../../../services/memberService";
import { Tank } from "../../../store/TankStore";
import { TankFormModal } from "./aquarium/TankFormModal";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [isTankItemVisible, setTankItemVisible] = useState(true);
  const [member, setMember] = useState<Member>(undefined);
  const [tankList, setTankList] = useState<Tank[]>([]);

  const { memberStore, tankStore } = RootStore;

  useEffect(() => {
    if (memberStore.memberState !== "done") {
      memberStore.fetchMember();
    } else {
      setMember(memberStore.member);
    }
  }, [memberStore.memberState]);

  useEffect(() => {
    if (member && tankStore.fetchState !== "done") {
      tankStore.fetchTankList();
    } else {
      setTankList(tankStore.tankList);
    }
  }, [member, tankStore.fetchState]);

  const isLoading =
    memberStore.memberState === "pending" && tankStore.fetchState === "pending";
  const newTankPress = () => setNewTankFormVisible(true);
  const toggleTankForm = () => {
    setTankItemVisible(!isTankItemVisible);
    setNewTankFormVisible(!isNewTankFormVisible);
  };

  return (
    <View style={styles.page}>
      <Header centerComponent={<ReefHeaderTitle title="TABLEAU DE BORD" />} />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={{ fontSize: 16 }}>
          Bienvenue {member?.userName.toLocaleUpperCase()} !
        </Text>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        tankList?.length > 0 && (
          <MainTankItem editFunction={toggleTankForm} tank={tankList[0]} />
        )
      )}

      {!isLoading && tankList?.length === 0 && (
        <>
          <Text>Vous n'avez pas d'aquarium : créez en un !</Text>
          <ReefButton title="Créer un Aquarium" onPress={newTankPress} />
        </>
      )}

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
