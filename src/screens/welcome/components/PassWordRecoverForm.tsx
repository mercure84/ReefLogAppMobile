import React, { useState } from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ReefButton } from "../../../components/ReefButton";
import { getPasswordRecover } from "../../../services/memberService";
import { WelcomeElement } from "../WelcomeScreen";

type Props = {
  toggleWelcomeComponents: (element: WelcomeElement) => void;
};

export const PassWordRecoverForm = ({ toggleWelcomeComponents }: Props) => {
  const [email, setEmail] = useState("");

  const handleOnPress = () => {
    getPasswordRecover(email);
  };

  const handleCancel = () => toggleWelcomeComponents(WelcomeElement.DEFAULT);
  return (
    <View>
      <View>
        <Text>Saisissez votre email </Text>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            maxLength={30}
            autoCompleteType="email"
            placeholder="E-mail"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <ReefButton
        title="Réinitialiser mon mot de passe"
        onPress={handleOnPress}
      />
      <ReefButton title="Retour" onPress={handleCancel} />
    </View>
  );
};

type Style = {
  input: ViewStyle;
  textInput: TextStyle;
};

const styles = StyleSheet.create<Style>({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    width: 320,
  },
});
