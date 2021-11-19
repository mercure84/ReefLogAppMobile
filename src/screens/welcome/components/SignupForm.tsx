import React, { useCallback, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { signUpService, SignUp } from "../../../services/memberService";
import { ReefButton } from "../../../components/ReefButton";

import { TextInput } from "react-native-gesture-handler";
import RootStore from "../../../store/RootStore";
import { WelcomeElement } from "../WelcomeScreen";
import { Text } from "react-native-elements";
import { InfoModal } from "../../../components/InfoModal";

type Props = {
  showSignupForm?: (boolean: boolean) => void;
  memberToUpdate?: SignUp;
  toggleWelcomeComponents?: (welcomeElement: WelcomeElement) => void;
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
  const isUpdating = memberToUpdate !== undefined;
  const [isLoading, setLoading] = useState(false);
  const [isModalInfoVisible, showModalInfo] = useState(false);
  const [message, setMessage] = useState("");

  const checkSamePassword = (password: string, repassword: string): boolean => {
    if (password !== null && repassword !== null) {
      return password === repassword && password.length > 5;
    } else return false;
  };

  const { password, repassword, email, userName } = signUpForm;

  const showInfo = (message: string): void => {
    setMessage(message);
    showModalInfo(true);
  };

  const handlePressOK = () => {
    showModalInfo(false);
    if (toggleWelcomeComponents) {
      toggleWelcomeComponents(WelcomeElement.LOGIN);
    }
  };

  const submitNewMember = useCallback(
    async (signUpForm: SignUp) => {
      setLocalInfo("");
      const isFormValid =
        checkSamePassword(password, repassword) &&
        password.length > 5 &&
        userName.length > 3 &&
        email.length > 4;
      if (isFormValid) {
        setLoading(true);
        const response = await signUpService(signUpForm, isUpdating);
        setLoading(false);
        if (response.role === "USER") {
          if (isUpdating) {
            RootStore.memberStore.fetchMember();
          } else {
            showInfo(
              "Votre compte vient d'être créé, une confirmation a été envoyée à votre adresse mail : " +
                email
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
          "Il y a un souci avec votre formulaire ! vérifiez vos mots de passe."
        );
      }
    },
    [signUpForm]
  );

  const signedByOAuth = RootStore.memberStore.googleToken !== "";

  return (
    <View>
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}

      <View>
        <Text style={styles.textInfo}>{localInfo}</Text>
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="emailAddress"
          keyboardType="email-address"
          maxLength={30}
          autoComplete="email"
          placeholder="E-mail"
          onChangeText={(text) => setSignUpForm({ ...signUpForm, email: text })}
          defaultValue={isUpdating && email !== null ? email : ""}
          editable={!isLoading}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="nickname"
          maxLength={12}
          autoComplete="off"
          placeholder="Pseudo"
          onChangeText={(text) =>
            setSignUpForm({ ...signUpForm, userName: text })
          }
          defaultValue={isUpdating && userName ? userName : ""}
          editable={!isLoading}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="newPassword"
          secureTextEntry={true}
          maxLength={12}
          autoComplete="off"
          placeholder="Mot de passe"
          onChangeText={(text) => {
            setSignUpForm({ ...signUpForm, password: text });
          }}
          editable={!isLoading}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          textContentType="newPassword"
          secureTextEntry={true}
          maxLength={12}
          autoComplete="off"
          placeholder="Confirmation du mot de passe"
          onChangeText={(text) =>
            setSignUpForm({ ...signUpForm, repassword: text })
          }
          editable={!isLoading}
        />
      </View>

      {password !== "" && password.length < 6 && (
        <View>
          <Text style={styles.textInfo}>
            Le mot de passe doit comporter au moins 6 caractères
          </Text>
        </View>
      )}

      {signedByOAuth && (
        <View>
          <Text style={styles.textInfo}>
            Vous ne pouvez pas modifier votre profil car vous êtes authentifié
            par un service tiers.
          </Text>
        </View>
      )}

      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          margin: 8,
        }}
      >
        {isUpdating ? (
          <ReefButton
            size="medium"
            title="Enregistrer"
            onPress={() => submitNewMember(signUpForm)}
            disabled={isLoading || signedByOAuth}
          />
        ) : (
          <>
            <ReefButton
              size="medium"
              title="Créer mon compte"
              onPress={() => submitNewMember(signUpForm)}
              disabled={isLoading}
            />
            <ReefButton
              size="medium"
              title="Déjà enregistré ?"
              onPress={() => {
                if (toggleWelcomeComponents) {
                  toggleWelcomeComponents(WelcomeElement.LOGIN);
                }
              }}
              disabled={isLoading}
            />
          </>
        )}
      </View>
      <InfoModal
        isModaleVisible={isModalInfoVisible}
        message={message}
        OKButtonFunction={handlePressOK}
        onHide={handlePressOK}
      />
    </View>
  );
};

type Style = {
  input: ViewStyle;
  textInput: TextStyle;
  textInfo: TextStyle;
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
  textInfo: {
    fontSize: 12,
    textAlign: "center",
    color: "red",
  },
});
