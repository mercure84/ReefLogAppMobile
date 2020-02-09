import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { loginService } from "../../../services/apiServices";

export const LoginForm = ({ homeInfoCallBack, showLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submitLogin = async (pEmail, pPassword) => {
    setLoading(true);
    const response = await loginService(pEmail, pPassword);
    console.log("réponse = " + response);
    if (response.status === "200") {
      homeInfoCallBack("Connexion OK " + response.message);
      showLoginForm(false);
    } else {
      homeInfoCallBack("Un problème est survenu : " + response.message);
    }
    setLoading(false);
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
