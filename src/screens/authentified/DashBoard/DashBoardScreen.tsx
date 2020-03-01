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
import memberStore from "../../../store/memberStore";

const DashboardScreen = observer(() => {
  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("Vous n'avez aucun aquarium");
  const [dataMemberStore] = useState(() => new memberStore());

  dataMemberStore.memberState === "pending"
    ? dataMemberStore.fetchMember()
    : null;

  return (
    <View style={styles.page}>
      {dataMemberStore.memberState === "pending" ? (
        <ActivityIndicator />
      ) : (
        <Header
          centerComponent={
            <Text style={{ fontSize: 16 }}>
              Bienvenue {dataMemberStore.member.pseudo.toUpperCase()} !
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
