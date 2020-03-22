import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";
import { signUpService, SignUpForm } from "../../../services/memberService";
import { MessageInfo } from "./MessageInfo";
import { TextInput } from "react-native-gesture-handler";
import { Card } from "react-native-elements";

const checkPassword = (password, repassword): boolean => {
  return password === repassword && password.length > 5;
};

export const SignupForm = ({ homeInfoCallBack, showSignupForm }) => {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>();
  const [isPasswordOk, setPasswordOK] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const submitNewMember = async (signUpForm: SignUpForm) => {
    setLoading(true);
    const response = await signUpService(signUpForm);
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
    <View style={{ padding: 8 }}>
      {isLoading && <ActivityIndicator />}

      {!isPasswordOk && signUpForm.repassword.length > 0 ? (
        <MessageInfo message="Mots de passe différents ou inférieurs à 6 caractères" />
      ) : null}

      <Card title="Création d'un compte">
        <View style={styles.input}>
          <Text>Mon email</Text>
          <TextInput
            style={styles.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            maxLength={30}
            autoCompleteType="email"
            placeholder="email@email.fr"
            onChangeText={text => setSignUpForm({ ...signUpForm, email: text })}
          />
        </View>
        <View style={styles.input}>
          <Text>Mon pseudo</Text>
          <TextInput
            style={styles.textInput}
            textContentType="nickname"
            maxLength={12}
            autoCompleteType="off"
            placeholder="pseudo"
            onChangeText={text =>
              setSignUpForm({ ...signUpForm, userName: text })
            }
          />
        </View>
        <View style={styles.input}>
          <Text>Mon password</Text>
          <TextInput
            style={styles.textInput}
            textContentType="newPassword"
            secureTextEntry={true}
            maxLength={12}
            autoCompleteType="off"
            placeholder="mot de passe"
            onChangeText={text => {
              setSignUpForm({ ...signUpForm, password: text });
              signUpForm.password !== undefined &&
              signUpForm.repassword !== undefined
                ? setPasswordOK(checkPassword(text, signUpForm.repassword))
                : null;
            }}
          />
        </View>
        <View style={styles.input}>
          <Text>Confirmer le mdp </Text>
          <TextInput
            style={styles.textInput}
            textContentType="newPassword"
            secureTextEntry={true}
            maxLength={12}
            autoCompleteType="off"
            placeholder="mot de passe"
            onChangeText={text => {
              setSignUpForm({ ...signUpForm, repassword: text });
              signUpForm.password !== undefined &&
              signUpForm.repassword !== undefined
                ? setPasswordOK(checkPassword(text, signUpForm.password))
                : null;
            }}
          />
        </View>

        <Button
          title="Créer mon compte"
          onPress={() => (isPasswordOk ? submitNewMember(signUpForm) : null)}
        />
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
