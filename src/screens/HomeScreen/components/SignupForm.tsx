import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { signUpService } from "../../../services/apiServices";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MessageInfo } from "./MessageInfo";

const checkPassword = (password, repassword): boolean => {
  return password === repassword && password.length > 5;
};

export const SignupForm = ({ homeInfoCallBack, showSignupForm }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isPasswordOk, setPasswordOK] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const submitNewMember = async (pEmail, pUsername, pPassword, pRepassword) => {
    setLoading(true);
    const response = await signUpService(
      pEmail,
      pUsername,
      pPassword,
      pRepassword
    );
    setLoading(false);
    console.log("réponse status = " + response.role);
    if (response.role === "USER") {
      homeInfoCallBack(
        "Votre compte a bien été créé ! un email de confirmaton a été envoyé à " +
          response.email
      );
      showSignupForm(false);
    } else {
      homeInfoCallBack("Un problème est survenu : " + response.message);
    }
  };

  return (
    <View style={{ padding: 50 }}>
      {isLoading && <ActivityIndicator />}

      {!isPasswordOk && repassword.length > 0 ? (
        <MessageInfo message="Mots de passe différents ou inférieurs à 6 caractères" />
      ) : null}

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
        onChangeText={text => (
          setPassword(text), setPasswordOK(checkPassword(text, repassword))
        )}
      />
      <Text>Confirmer votre mot de passe </Text>
      <TextInput
        textContentType="newPassword"
        secureTextEntry={true}
        maxLength={12}
        autoCompleteType="off"
        placeholder="mot de passe"
        onChangeText={text => (
          setRepassword(text), setPasswordOK(checkPassword(password, text))
        )}
      />
      <Button
        title="Créer mon compte"
        onPress={() =>
          isPasswordOk
            ? submitNewMember(email, username, password, repassword)
            : null
        }
      />
    </View>
  );
};
