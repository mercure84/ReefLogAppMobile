import React from "react";
import { View, Text, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export const LoginForm = () => (
  <View>
    <Text>Mon email : </Text>
    <TextInput placeholder="email@email.fr" />
    <Text>Mon mot de passe</Text>
    <TextInput placeholder="mot de pass" />
    <Button title="Connexion" onPress={null} />
    <TouchableOpacity>
      <Text>Mot de passe oublié ?</Text>
    </TouchableOpacity>
  </View>
);
