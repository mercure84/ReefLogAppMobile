import React, { useState } from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ReefButton } from "../../../components/ReefButton";
import { getPasswordRecover } from "../../../services/memberService";
import { MessageInfo } from "../../../components/MessageInfo";

type Props = {
  showRecoverForm: (boolean: boolean) => void;
  homeInfoCallBack: (text: string) => void;
};

export const PassWordRecoverForm = ({
  homeInfoCallBack,
  showRecoverForm,
}: Props) => {
  const [email, setEmail] = useState("");

  const handleOnPress = () => {
    getPasswordRecover(email);
    homeInfoCallBack(
      "Nous allons vérifier que votre email est enresgitré dans notre base et vous renvoyer un lien pour réinitialiser votre mot de passe :)"
    );
    showRecoverForm(false);
  };

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
