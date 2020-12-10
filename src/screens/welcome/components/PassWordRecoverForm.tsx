import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ReefButton } from "../../../components/ReefButton";
import { getPasswordRecover } from "../../../services/memberService";

type Props = {
  showRecoverForm: (boolean: boolean) => void;
  toggleWelcomeComponents: (string: string) => void;

};

export const PassWordRecoverForm = ({
  showRecoverForm,
  toggleWelcomeComponents
}: Props) => {
  const [email, setEmail] = useState("");

  const handleOnPress = () => {
    getPasswordRecover(email);
    showRecoverForm(false);
  };

  const handleCancel = () => toggleWelcomeComponents("defaultButtons");
  return (
    <View>
      <View>
        <Text>Saisissez votre email </Text>
        <TextInput
          textContentType="emailAddress"
          keyboardType="email-address"
          maxLength={30}
          autoCompleteType="email"
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <ReefButton
        title="Réinitialiser mon mot de passe"
        onPress={handleOnPress}
      />
      <ReefButton
        title="Annuler"
        onPress={handleCancel}
      />
    </View>
  );
};
