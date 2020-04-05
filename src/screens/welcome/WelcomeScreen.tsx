import React, { useState } from "react";

import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { MessageInfo } from "../../components/MessageInfo";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  Button,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { About } from "./components/About";

interface Props {
  displayLoginForm: boolean;
  displaySignupForm: boolean;
}

const HomeScreen = ({ displayLoginForm, displaySignupForm }: Props) => {
  const [displayLoginFormState, toggleDisplayLogin] = useState(
    displayLoginForm
  );
  const [displaySignupFormState, toggleDisplaySignup] = useState(
    displaySignupForm
  );

  const [messageInfo, setMessageInfo] = useState("");
  const [isAboutVisible, setAboutVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      enabled={true}
      keyboardVerticalOffset={-56}
    >
      <View style={styles.header}>
        <Text style={styles.title1}>Bienvenue sur REEFLOG !</Text>
        <Image
          resizeMode="contain"
          style={styles.homeImage}
          source={require("../../assets/home.png")}
        />
      </View>
      <View style={styles.homeButton}>
        <View style={{ margin: 5 }}>
          <Button
            title="Créer un compte"
            onPress={() => {
              toggleDisplaySignup(true);
              toggleDisplayLogin(false);
              setMessageInfo("A vous de remplir :)");
            }}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            title="Se connecter"
            onPress={() => {
              toggleDisplaySignup(false);
              toggleDisplayLogin(true);
              setMessageInfo("Saisissez email / mdp");
            }}
          />
        </View>
      </View>
      <View style={styles.homeForms}>
        <MessageInfo message={messageInfo} />

        {displayLoginFormState && (
          <LoginForm
            homeInfoCallBack={setMessageInfo}
            showLoginForm={toggleDisplayLogin}
          />
        )}
        {displaySignupFormState && (
          <SignupForm
            homeInfoCallBack={setMessageInfo}
            showSignupForm={toggleDisplaySignup}
            memberToUpdate={null}
          />
        )}

        <TouchableOpacity
          style={styles.about}
          onPress={() => {
            setAboutVisible(!isAboutVisible);
          }}
        >
          <Text> A propos / Contact </Text>
        </TouchableOpacity>

        {isAboutVisible && <About />}
      </View>
    </KeyboardAvoidingView>
  );
};

type Style = {
  about: ViewStyle;
  container: ViewStyle;
  button: ViewStyle;
  title1: TextStyle;
  header: ViewStyle;
  homeButton: ViewStyle;
  homeImage: ImageStyle;
  homeForms: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  about: {
    flex: 0.3,
    justifyContent: "flex-end",
    margin: 8
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    margin: 20
  },
  title1: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center"
  },
  header: {
    padding: 16,
    flex: 1,
    alignItems: "center"
  },
  homeButton: {
    flexDirection: "row",
    alignSelf: "center"
  },
  homeImage: {
    borderRadius: 100,
    width: 250,
    height: 150
  },
  homeForms: {
    flex: 2,
    alignItems: "center"
  }
});

export default HomeScreen;
