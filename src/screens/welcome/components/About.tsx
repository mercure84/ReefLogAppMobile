import React from "react";
import { Text, View } from "react-native";
import {
  version as app_version,
  name as app_name,
} from "../../../../package.json";

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
        alignSelf: "center"
      }}
    >
      <Text style={{ textAlign: "center" }}>
        Application développée par Julien Marcesse
      </Text>
      <TouchableOpacity onPress={handleEmail}>
        <Text style={{ textAlign: "center", color: "blue" }}>
          Pour toute question / suggestion :{"\n"}julien.marcesse@gmail.com
          </Text>
      </TouchableOpacity>
      <Text style={{ color: "orange" }}>
        Version de l'appli : {app_name} {app_version}
      </Text>
    </View>
  );
};
