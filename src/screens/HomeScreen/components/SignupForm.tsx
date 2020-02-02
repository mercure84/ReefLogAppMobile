import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { signUpService } from "../../../services/apiServices";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isPasswordOk, setPasswordOK] = useState(true);

  const checkPassword = () => {
    console.log(password);
    console.log(repassword);
    password === repassword
      ? password.length > 5
        ? setPasswordOK(true)
        : setPasswordOK(false)
      : setPasswordOK(false);

    console.log(isPasswordOk);
  };

  return (
    <View style={{ padding: 50 }}>
      {!isPasswordOk && repassword.length > 0 && (
        <Text style={{ color: "red" }}>
          Vos mots de passe de correspondent pas, la taille doit être supérieure
          à 6 caractères !
        </Text>
      )}
      <Text>Mon email : </Text>
      <TextInput
        textContentType="emailAddress"
        keyboardType="email-address"
        maxLength={30}
        autoCompleteType="email"
        placeholder="email@email.fr"
        onChangeText={text => setEmail(text)}
      />
      <Text>Mon pseudo : </Text>
      <TextInput
        textContentType="nickname"
        maxLength={12}
        autoCompleteType="off"
        placeholder="pseudo"
        onChangeText={text => setUsername(text)}
      />
      <Text>Choisir un mot de passe</Text>
      <TextInput
        textContentType="newPassword"
        secureTextEntry={true}
        maxLength={12}
        autoCompleteType="off"
        placeholder="mot de passe"
        onChangeText={text => setPassword(text)}
      />
      <Text>Confirmer votre mot de passe </Text>
      <TextInput
        textContentType="newPassword"
        secureTextEntry={true}
        maxLength={12}
        autoCompleteType="off"
        placeholder="mot de passe"
        onChangeText={text => setRepassword(text)}
        onBlur={() => checkPassword()}
      />

      <Button
        title="Créer mon compte"
        onPress={() => (
          checkPassword(), signUpService(email, username, password, repassword)
        )}
      />
    </View>
  );
};
