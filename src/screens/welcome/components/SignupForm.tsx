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
import { signUpService, SignUp } from "../../../services/memberService";
import { MessageInfo } from "../../../components/MessageInfo";
import { TextInput } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import RootStore from "../../../store/RootStore";

const checkPassword = (password, repassword): boolean => {
  if (password !== null && repassword !== null) {
    return password === repassword && password.length > 5;
  } else return false;
};

type Props = {
  showSignupForm?: (boolean: boolean) => void;
  homeInfoCallBack?: (string: string) => void;
  memberToUpdate?: SignUp;
};

export const SignupForm = ({
  showSignupForm,
  memberToUpdate,
  homeInfoCallBack
}: Props) => {
  const [signUpForm, setSignUpForm] = useState<SignUp>(memberToUpdate);
  const [localInfo, setLocalInfo] = useState("");
  const [rootStore] = useState(RootStore);

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
          rootStore.memberStore.fetchMember();
          homeInfoCallBack("Compte mis à jour");
        } else {
          homeInfoCallBack(
            "Votre compte a bien été créé ! un email de confirmaton a été envoyé à " +
              response.email
          );
          showSignupForm(false);
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
    <View style={{ padding: 8 }}>
      {isLoading && <ActivityIndicator />}
      <MessageInfo message={localInfo} />

      <Card
        title={
          isUpdating ? "Modification de votre compte " : "Création d'un compte"
        }
      >
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
            defaultValue={
              isUpdating && signUpForm.email !== null ? signUpForm.email : null
            }
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
            defaultValue={
              isUpdating && signUpForm.userName ? signUpForm.userName : null
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
            onChangeText={text =>
              setSignUpForm({ ...signUpForm, repassword: text })
            }
          />
        </View>

        <Button
          title="Créer mon compte"
          onPress={() => submitNewMember(signUpForm)}
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
