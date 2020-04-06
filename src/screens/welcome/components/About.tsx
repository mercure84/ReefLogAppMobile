import React from "react";
import { Text, View, Image } from "react-native";
import {
  version as app_version,
  name as app_name,
} from "../../../../package.json";

import aboutImage from "../../../assets/about.png";
import mailIcon from "../../../assets/icons/mail.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import email from "react-native-email";

export const handleEmail = () => {
  const recipient = ["julien.marcesse@gmail.com"];
  email(recipient, {
    subject: "Une suggestion sur votre appli ReefLog",
  }).catch(console.error);
};

export const About = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <Image
        source={aboutImage}
        style={{
          width: 256,
          height: 128,
          borderRadius: 16,
          margin: 8,
        }}
      />
      <Text style={{ textAlign: "center" }}>
        Application développée par Julien Marcesse
      </Text>

      <TouchableOpacity onPress={handleEmail}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Image
            source={mailIcon}
            style={{ height: 32, width: 32, margin: 8 }}
          />
          <Text style={{ textAlign: "center", color: "blue" }}>
            Pour toute question / suggestion :{"\n"}julien.marcesse@gmail.com
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={{ textAlign: "center" }}>Technologies utilisées</Text>
      <Text>Front End : React Native</Text>
      <Text>Back End : Spring Boot</Text>
      <Text style={{ color: "orange" }}>
        Version de l'appli : {app_name} {app_version}
      </Text>
    </View>
  );
};
