import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../../../../App";
import { myThemes } from "../../../../components/colors";
import { ReefButton } from "../../../../components/ReefButton";
import RootStore from "../../../../store/RootStore";

export const ThemeSelector = () => {
  const { setTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(
    RootStore.memberStore.member?.themeColor
  );

  const changeTheme = (themeNumber: number) => {
    setSelectedTheme(themeNumber);
    setTheme(myThemes[themeNumber]);
  };

  const saveTheme = async () => {
    if (selectedTheme || selectedTheme === 0) {
      await RootStore.memberStore.saveThemeMember(selectedTheme);
    }
  };

  return (
    <View style={{ padding: 4, alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>
        Changer les couleurs de l'application
      </Text>
      <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
        <ReefButton
          title="Centropyge bicolor"
          size="medium"
          onPress={() => changeTheme(0)}
        ></ReefButton>
        <ReefButton
          title="Neocirrithes armatus"
          size="medium"
          onPress={() => changeTheme(1)}
        ></ReefButton>
        <ReefButton
          title="Amphiprion ocellaris"
          size="medium"
          onPress={() => changeTheme(2)}
        ></ReefButton>
        <ReefButton
          title="Nemateleotris decora"
          size="medium"
          onPress={() => changeTheme(3)}
        ></ReefButton>
        <ReefButton
          title="Pterapogon kauderni"
          size="medium"
          onPress={() => changeTheme(4)}
        ></ReefButton>
      </View>
      <View style={{ marginTop: 16 }}>
        <ReefButton
          title="Sauvegarder le thème"
          size="medium"
          onPress={() => saveTheme()}
        ></ReefButton>
      </View>
    </View>
  );
};
