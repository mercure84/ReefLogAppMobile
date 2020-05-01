import React, { useState } from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ReefButton } from "../../../components/ReefButton";
import { getPasswordRecover } from "../../../services/memberService";
import { MessageInfo } from "../../../components/MessageInfo";

export const PassWordRecoverForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleOnPress = () => {
    getPasswordRecover(email);
    setMessage(
      "Nous allons vérifier qu votre email est enresgitré dans notre base et vous renvoyer un lien pour réinitialiser votre mot de passe :)"
    );
  };

  return (
    <Card>
      <View>
        <MessageInfo message={message} />
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
