import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { loginService } from "../../../services/apiServices";
import { storeData } from "../../../services/storageDevice";

export const LoginForm = ({ homeInfoCallBack, showLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submitLogin = async (pEmail, pPassword) => {
    setLoading(true);
    const response = await loginService(pEmail, pPassword);
    setLoading(false);

    if (response.token != null) {
      homeInfoCallBack("Vous êtes connecté !");
      showLoginForm(false);
      storeData("id_token", response.token);
    } else {
      homeInfoCallBack("Un problème est survenu : " + response.message);
    }
  };

  return (
    <View style={{ padding: 50 }}>
      {isLoading && <ActivityIndicator />}

      <Text>Mon email : </Text>
      <TextInput
        textContentType="emailAddress"
        keyboardType="email-address"
        maxLength={30}
        autoCompleteType="email"
        placeholder="email@email.fr"
        onChangeText={text => setEmail(text)}
      />
      <Text>Mon mot de passe</Text>
      <TextInput
        textContentType="newPassword"
        secureTextEntry={true}
        maxLength={12}
        autoCompleteType="off"
        placeholder="mot de passe"
        onChangeText={text => setPassword(text)}
      />
      <Button title="Connexion" onPress={() => submitLogin(email, password)} />
      <TouchableOpacity>
        <Text>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};
