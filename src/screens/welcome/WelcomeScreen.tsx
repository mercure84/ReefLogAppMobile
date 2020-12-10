import React, { useState } from "react";

import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { MessageInfo } from "../../components/MessageInfo";
import {
  KeyboardAvoidingView,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { About } from "./components/About";
import { ReefButton } from "../../components/ReefButton";
import { PassWordRecoverForm } from "./components/PassWordRecoverForm";
import { Button, Text } from "react-native-elements";

const HomeScreen = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [messageInfo, setMessageInfo] = useState("");
  const [isAboutVisible, setAboutVisible] = useState(false);
  const [isRecoverVisible, setRecoverVisible] = useState(false);

  const toggleWelcomeCompoents = (element: string) => {
    setMessageInfo("");
    switch (element) {
      case "about":
        setAboutVisible(!isAboutVisible);
        setLoginVisible(false);
        setSignupVisible(false);
        setRecoverVisible(false);
        return;
      case "login":
        setAboutVisible(false);
        setLoginVisible(!isLoginVisible);
        setSignupVisible(false);
        setRecoverVisible(false);
        return;
      case "signup":
        setAboutVisible(false);
        setLoginVisible(false);
        setSignupVisible(!isSignupVisible);
        setRecoverVisible(false);
        return;
      case "passRecover":
        setAboutVisible(false);
        setLoginVisible(false);
        setSignupVisible(false);
        setRecoverVisible(!isRecoverVisible);
        return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      enabled={true}
      keyboardVerticalOffset={-56}
    >
      <View style={styles.header}>
        <Text h2>Log4Reef</Text>
      </View>
      <View style={styles.homeButton}>
        <ReefButton
          size="large"
          title="Créer un compte"
          onPress={() => {
            toggleWelcomeCompoents("signup");
          }}
        />
        <ReefButton
          size="large"
          title="Se connecter"
          onPress={() => {
            toggleWelcomeCompoents("login");
          }}
        />
      </View>
      <View style={styles.homeForms}>
        <MessageInfo message={messageInfo} />

        {isLoginVisible && (
          <LoginForm
            homeInfoCallBack={setMessageInfo}
            toggleWelcomeCompoents={toggleWelcomeCompoents}
          />
        )}
        {isSignupVisible && (
          <SignupForm
            homeInfoCallBack={setMessageInfo}
            showSignupForm={setSignupVisible}
            memberToUpdate={null}
          />
        )}
        {isRecoverVisible && (
          <PassWordRecoverForm
            showRecoverForm={setRecoverVisible}
            homeInfoCallBack={setMessageInfo}
          />
        )}

        <TouchableOpacity
          style={styles.about}
          onPress={() => {
            toggleWelcomeCompoents("about");
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
  header: ViewStyle;
  homeButton: ViewStyle;
  homeForms: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  about: {
    flex: 0.3,
    justifyContent: "flex-end",
    margin: 8,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 64,
  },
  button: {
    margin: 20,
  },
  header: {
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  homeButton: {
    alignSelf: "center",
  },
  homeForms: {
    flex: 2,
    alignItems: "center",
  },
});

export default HomeScreen;
