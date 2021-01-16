import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { ReefButton } from "../../../components/ReefButton";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { loginService } from "../../../services/memberService";
import { storeData } from "../../../services/storageDevice";
import { useNavigation } from "@react-navigation/native";
import { WelcomeElement } from "../WelcomeScreen";

type Props = {
  toggleWelcomeComponents: (welcomeElement: WelcomeElement) => void;
};

export const LoginForm = ({ toggleWelcomeComponents }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const submitLogin = async (pEmail: string, pPassword: string) => {
    setLoading(true);
    const response = await loginService(pEmail, pPassword);
    setLoading(false);

    if (response.token != null) {
      toggleWelcomeComponents(WelcomeElement.DEFAULT);
      storeData("token", "Bearer " + response.token);
      storeData("emailUser", email);
      navigation.navigate("AuthentOk");
    } else {
      console.error("Un problème est survenu : " + response.message);
    }
  };
  const handlePassWordRecover = () =>
    toggleWelcomeComponents(WelcomeElement.PASSRECOVER);
  const handleSignup = () => toggleWelcomeComponents(WelcomeElement.SIGNUP);

  return (
    <View>
      {isLoading && <ActivityIndicator />}
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
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="newPassword"
          secureTextEntry={true}
          maxLength={12}
          autoCompleteType="off"
          placeholder="Mot de passe"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        onPress={handlePassWordRecover}
        style={{ alignSelf: "center", margin: 8 }}
      >
        <Text>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <View style={{ alignSelf: "center", flexDirection: "row", margin: 8 }}>
        <ReefButton
          size="medium"
          title="Connexion"
          onPress={() => submitLogin(email, password)}
        />
        <ReefButton
          size="medium"
          title="Pas de compte ?"
          onPress={handleSignup}
        />
      </View>
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
    alignSelf: "center",
  },
  textInput: {
    textAlign: "center",
    height: 40,
    width: 320,
  },
});
