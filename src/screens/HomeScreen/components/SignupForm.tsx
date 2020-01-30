import React from "react";
import { View, Text, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export const SignupForm = () => (
  <View>
    <Text>Mon email : </Text>
    <TextInput placeholder="email@email.fr" />
    <Text>Mon pseudo : </Text>
    <TextInput placeholder="pseudo" />
    <Text>Choisir un mot de passe</Text>
    <TextInput placeholder="mot de passe" />
    <Text>Confirmer votre mot de passe </Text>
    <TextInput placeholder="mot de passe" />
    <Button title="Créer mon compte" onPress={null} />
  </View>
);
