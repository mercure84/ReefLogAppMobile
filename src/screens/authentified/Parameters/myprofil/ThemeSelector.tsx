import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../../../../../App";
import { myThemes } from "../../../../components/colors";
import { ReefButton } from "../../../../components/ReefButton";
import RootStore from "../../../../store/RootStore";

export const ThemeSelector = () => {
  const { setTheme, theme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(
    RootStore.memberStore.member?.themeColor
  );

  const changeTheme = (themeNumber: number) => {
    setSelectedTheme(themeNumber);
    setTheme(myThemes[themeNumber]);
  };

  const saveTheme = () => {
    return null;
  };

  return (
    <View style={{ padding: 4, alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>
        Changer les couleurs de l'application
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <ReefButton
          title="C. bicolor"
          size="small"
          onPress={() => changeTheme(0)}
        ></ReefButton>
        <ReefButton
          title="N. armatus"
          size="small"
          onPress={() => changeTheme(1)}
        ></ReefButton>
        <ReefButton
          title="A. ocellaris"
          size="small"
          onPress={() => changeTheme(2)}
        ></ReefButton>
        <ReefButton
          title="N. decora"
          size="small"
          onPress={() => changeTheme(3)}
        ></ReefButton>
      </View>
      <View>
        <ReefButton
          title="Sauvegarder le thème"
          size="medium"
          onPress={() => saveTheme()}
        ></ReefButton>
      </View>
    </View>
  );
};
