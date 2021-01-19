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
import { Alert } from "../../../store/AlertStore";
import { TankFormModal } from "./aquarium/TankFormModal";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [isTankItemVisible, setTankItemVisible] = useState(true);
  const [isMemberLoading, setMemberLoading] = useState(true);
  const [isTankLoading, setTankLoading] = useState(true);
  const [member, setMember] = useState<Member>(undefined);
  const [tankList, setTankList] = useState<Tank[]>([]);

  const { memberStore, tankStore } = RootStore;

  useEffect(() => {
    if (memberStore.memberState === "done") {
      setMember(memberStore.member);
      setMemberLoading(false);
      if (tankStore.tankState === "done") {
        setTankList(tankStore.tankList);
        setTankLoading(false);
      } else {
        tankStore.fetchTankList();
      }
    } else {
      memberStore.fetchMember();
    }
  }, [memberStore.member, tankStore.tankList]);

  const newTankPress = () => setNewTankFormVisible(true);
  const toggleTankForm = () => {
    setTankItemVisible(!isTankItemVisible);
    setNewTankFormVisible(!isNewTankFormVisible);
  };

  return (
    <View style={styles.page}>
      <Header centerComponent={<ReefHeaderTitle title="TABLEAU DE BORD" />} />

      {isMemberLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 16 }}>
          Bienvenue {member?.userName.toLocaleUpperCase()} !
        </Text>
      )}

      {isTankLoading ? (
        <ActivityIndicator />
      ) : (
        tankList?.length > 0 && (
          <MainTankItem editFunction={toggleTankForm} tank={tankList[0]} />
        )
      )}

      {tankList?.length === 0 && (
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
