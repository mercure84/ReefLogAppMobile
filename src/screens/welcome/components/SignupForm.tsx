import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { signUpService, SignUp } from "../../../services/memberService";
import { ReefButton } from "../../../components/ReefButton";

import { MessageInfo } from "../../../components/MessageInfo";
import { TextInput } from "react-native-gesture-handler";
import RootStore from "../../../store/RootStore";
import { WelcomeElement } from "../WelcomeScreen";

const checkPassword = (password: string, repassword: string): boolean => {
  if (password !== null && repassword !== null) {
    return password === repassword && password.length > 5;
  } else return false;
};

type Props = {
  showSignupForm?: (boolean: boolean) => void;
  memberToUpdate?: SignUp;
  toggleWelcomeComponents?: (element: WelcomeElement) => void;
};

const initNewSignUp: SignUp = {
  idToUpdate: undefined,
  email: "",
  password: "",
  repassword: "",
  userName: "",
};

export const SignupForm = ({
  showSignupForm,
  memberToUpdate,
  toggleWelcomeComponents,
}: Props) => {
  const [signUpForm, setSignUpForm] = useState<SignUp>(
    memberToUpdate ?? initNewSignUp
  );
  const [localInfo, setLocalInfo] = useState("");

  const isUpdating = memberToUpdate !== null;
  const [isLoading, setLoading] = useState(false);

  const submitNewMember = async (signUpForm: SignUp) => {
    if (checkPassword(signUpForm.password, signUpForm.repassword)) {
      setLoading(true);
      const response = await signUpService(signUpForm, isUpdating);
      setLoading(false);
      console.log("réponse status = " + response.role);
      if (response.role === "USER") {
        if (isUpdating) {
          RootStore.memberStore.fetchMember();
        } else {
          console.log(
            "Votre compte a bien été créé ! un email de confirmation a été envoyé à " +
              response.email
          );
          if (showSignupForm) {
            showSignupForm(false);
          }
        }
      } else {
        setLocalInfo("Un problème est survenu : " + response.message);
      }
    } else {
      setLocalInfo(
        "Il y a un souci avec votre formulaire ! vérifiez vos mots de passe"
      );
    }
  };

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
          onChangeText={(text) => setSignUpForm({ ...signUpForm, email: text })}
          defaultValue={
            isUpdating && signUpForm.email !== null ? signUpForm.email : ""
          }
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="nickname"
          maxLength={12}
          autoCompleteType="off"
          placeholder="Pseudo"
          onChangeText={(text) =>
            setSignUpForm({ ...signUpForm, userName: text })
          }
          defaultValue={
            isUpdating && signUpForm.userName ? signUpForm.userName : ""
          }
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
          onChangeText={(text) => {
            setSignUpForm({ ...signUpForm, password: text });
          }}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="newPassword"
          secureTextEntry={true}
          maxLength={12}
          autoCompleteType="off"
          placeholder="Confirmation du mot de passe"
          onChangeText={(text) =>
            setSignUpForm({ ...signUpForm, repassword: text })
          }
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          margin: 8,
        }}
      >
        <ReefButton
          size="medium"
          title="Créer mon compte"
          onPress={() => submitNewMember(signUpForm)}
        />
        <ReefButton
          size="medium"
          title="Déjà enregistré ?"
          onPress={() =>
            toggleWelcomeComponents
              ? toggleWelcomeComponents(WelcomeElement.LOGIN)
              : undefined
          }
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
