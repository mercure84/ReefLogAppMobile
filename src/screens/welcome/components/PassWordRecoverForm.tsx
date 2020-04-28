import React, { useState } from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ReefButton } from "../../../components/ReefButton";

export const PassWordRecoverForm = () => {
  const [email, setEmail] = useState("");

  const handleOnPress = () => console.warn("Fix Me");

  return (
    <Card>
      <View>
        <Text>Saisissez votre email </Text>
        <TextInput
          textContentType="emailAddress"
          keyboardType="email-address"
          maxLength={30}
          autoCompleteType="email"
          placeholder="email@email.fr"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <ReefButton
        title="Réinitialiser mon mot de passe"
        onPress={handleOnPress}
      />
    </Card>
  );
};
