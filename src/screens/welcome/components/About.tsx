import React from "react";
import { Text, View, Image } from "react-native";
import {
  version as app_version,
  name as app_name
} from "../../../../package.json";

import aboutImage from "../../../assets/about.png";
import springImage from "../../../assets/spring.png";

import reactImage from "../../../assets/react.png";

export const About = () => {
  return (
    <View
      style={{ paddingBottom: 32, paddingHorizontal: 16, alignItems: "center" }}
    >
      <Text style={{ textAlign: "center" }}>
        Application développée par Julien Marcesse
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <Image
          source={aboutImage}
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            margin: 8
          }}
        />
        <Text style={{ textAlign: "center", color: "blue" }}>
          Pour toute question / suggestion :{"\n"}julien.marcesse@gmail.com
        </Text>
      </View>

      <Text style={{ textAlign: "center" }}>Technologies utilisées</Text>
      <Text>Front End : React Native</Text>
      <Text>Back End : Spring Boot</Text>
      <Text style={{ color: "orange" }}>
        Version de l'appli : {app_name} {app_version}
      </Text>
    </View>
  );
};
