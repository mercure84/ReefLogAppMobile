import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { signUpService } from "../../../services/apiServices";

const checkPassword = (password, repassword): boolean => {
  return password === repassword && password.length > 5;
};

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isPasswordOk, setPasswordOK] = useState(true);

  const [isLoading, setLoading] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(true);
  const [info, setInfo] = useState();

  const submitNewMember = async (pEmail, pUsername, pPassword, pRepassword) => {
    setLoading(true);
    const response = await signUpService(
      pEmail,
      pUsername,
      pPassword,
      pRepassword
    );
    console.log("réponse status = " + response.status);
    response.role === "USER"
      ? setInfo(
          "Votre compte a bien été créé ! un email de confirmaton a été envoyé à " +
            response.email
        )
      : setInfo("Un problème est survenu : " + response.message);
    setInfoVisible(true);
    setLoading(false);
  };

  return (
    <View style={{ padding: 50 }}>
      {isLoading && <ActivityIndicator />}

      {!isPasswordOk && repassword.length > 0 && (
        <Text style={{ color: "red" }}>
          Vos mots de passe de correspondent pas, la taille doit être supérieure
          à 6 caractères !
        </Text>
      )}

      {isInfoVisible && <Text>{info}</Text>}

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
