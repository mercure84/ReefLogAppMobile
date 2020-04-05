import React from "react";
import { Text, View } from "react-native";
import {
  version as app_version,
  name as app_name
} from "../../../../package.json";

export const About = () => {
  return (
    <View style={{ padding: 16, alignItems: "center" }}>
      <Text>
        Application développée par Julien Marcesse dans le cadre de son parcours
        Openclassrooms "Développeur d'Application Java"
      </Text>
      <Text>Pour toute question / suggestion : julien.marcesse@gmail.com</Text>
      <Text>Technologies utilisées</Text>
      <Text>Front End : React Native</Text>
      <Text>Back End : Spring Boot</Text>
      <Text>
        Version de l'appli : {app_name} {app_version}
      </Text>
    </View>
  );
};
