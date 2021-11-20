import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import { Header } from "react-native-elements";
import { ThemeContext } from "../../../../../App";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { getMasseVolumique } from "../../../../utils/helpers";

export const ToolsScreen = () => {
  const [salinity, setSalinity] = useState(0);
  const [temperature, setTemperature] = useState(25);

  const resultat = getMasseVolumique(salinity, temperature, 0);
  const { darkColor } = useContext(ThemeContext).theme;
  return (
    <View style={styles.page}>
      <Header
        leftComponent={<GoBackButton />}
        containerStyle={{ backgroundColor: darkColor }}
        centerComponent={<ReefHeaderTitle title="OUTILS" />}
      />

      <View style={styles.container}>
        <Text style={styles.subtitle}>Calcul de salinité</Text>

        <Text>Saisissez la salinité de votre eau (ppt) :</Text>
        <TextInput
          style={styles.textInput}
          maxLength={6}
          keyboardType="decimal-pad"
          onChangeText={(text) => setSalinity(parseFloat(text))}
        />
        <Text>Indiquez la température (°C)</Text>

        <TextInput
          style={styles.textInput}
          maxLength={6}
          keyboardType="decimal-pad"
          defaultValue={"25"}
          onChangeText={(text) => setTemperature(parseFloat(text))}
        />

        <Text>Equivalent masse volumique (g/L aéromètre JBL) :</Text>
        <Text style={styles.result}>{resultat}</Text>
      </View>
    </View>
  );
};

type Style = {
  page: ViewStyle;
  container: ViewStyle;
  textInput: TextStyle;
  subtitle: TextStyle;
  result: TextStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
  container: {
    padding: 8,
  },
  textInput: {
    backgroundColor: "#DADBDD",
    borderRadius: 4,
    marginBottom: 8,
    width: "30%",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  result: {
    color: "red",
    padding: 16,
  },
});
