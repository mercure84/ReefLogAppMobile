import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleSheet
} from "react-native";
import { ReefButton } from "../../../components/ReefButton";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { loginService } from "../../../services/memberService";
import { storeData } from "../../../services/storageDevice";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";

export const LoginForm = ({ homeInfoCallBack, showLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const submitLogin = async (pEmail, pPassword) => {
    setLoading(true);
    const response = await loginService(pEmail, pPassword);
    setLoading(false);

    if (response.token != null) {
      homeInfoCallBack("Vous êtes connecté !");
      showLoginForm(false);
      storeData("token", "Bearer " + response.token);
      storeData("emailUser", email);
      navigation.navigate("AuthentOk");
      homeInfoCallBack(null);
    } else {
      homeInfoCallBack("Un problème est survenu : " + response.message);
    }
  };

  return (
    <View style={{ padding: 8 }}>
      {isLoading && <ActivityIndicator />}
      <Card>
        <View style={styles.input}>
          <Text>Mon email : </Text>
          <TextInput
            style={styles.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            maxLength={30}
            autoCompleteType="email"
            placeholder="email@email.fr"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.input}>
          <Text>Mon mot de passe</Text>
          <TextInput
            style={styles.textInput}
            textContentType="newPassword"
            secureTextEntry={true}
            maxLength={12}
            autoCompleteType="off"
            placeholder="mot de passe"
            onChangeText={text => setPassword(text)}
          />
        </View>
        <ReefButton
          title="Connexion"
          onPress={() => submitLogin(email, password)}
        />
        <TouchableOpacity>
          <Text>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </Card>
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
    paddingVertical: 2
  },
  textInput: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "65%",
    borderRadius: 5
  }
});
