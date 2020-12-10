import React, { useState } from "react";

import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { MessageInfo } from "../../components/MessageInfo";
import {
  KeyboardAvoidingView,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { About } from "./components/About";
import { ReefButton } from "../../components/ReefButton";
import { PassWordRecoverForm } from "./components/PassWordRecoverForm";
import { Text } from "react-native-elements";

export const componentStatusDefault = {
  showSignup: false,
  showLogin: false,
  showPassRecover: false,
  showButtons: true
}

const HomeScreen = () => {
  const [componentStatus, setComponentStatus] = useState(componentStatusDefault);
  const [isAboutVisible, setAboutVisible] = useState(false);


  const toggleWelcomeComponents = (element: "login" | "signup" | "passRecover" | "defaultButtons") => {
    switch (element) {
      case "login":
        setComponentStatus({
          showSignup: false,
          showLogin: true,
          showPassRecover: false,
          showButtons: false
        })
        return;
      case "signup":
        setComponentStatus({
          showSignup: true,
          showLogin: false,
          showPassRecover: false,
          showButtons: false
        })
        return;
      case "passRecover":
        setComponentStatus({
          showSignup: false,
          showLogin: false,
          showPassRecover: true,
          showButtons: false
        })
        return;
      case "defaultButtons":
        setComponentStatus(componentStatusDefault)
        return;
    }
  };

  const handlePressAbout = () => setAboutVisible(!isAboutVisible)

  return (
    <KeyboardAvoidingView
      style={styles.page}
      keyboardVerticalOffset={-64}
    >
      <View style={styles.header}>
        <Text h2>Log4Reef</Text>
      </View>
      <View style={styles.mainContainer}>
        {componentStatus.showButtons && <><ReefButton
          size="large"
          title="Créer un compte"
          onPress={() => {
            toggleWelcomeComponents("signup");
          }}
        />
          <ReefButton
            size="large"
            title="Se connecter"
            onPress={() => {
              toggleWelcomeComponents("login");
            }}
          /></>}
        {componentStatus.showLogin && (
          <LoginForm
            toggleWelcomeComponents={toggleWelcomeComponents}
          />
        )}
        {componentStatus.showSignup && (
          <SignupForm
            toggleWelcomeComponents={toggleWelcomeComponents}
            showSignupForm={null}
            memberToUpdate={null}
          />
        )}
        {componentStatus.showPassRecover && (
          <PassWordRecoverForm
            showRecoverForm={null}
            toggleWelcomeComponents={toggleWelcomeComponents}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.about}
        onPress={handlePressAbout}
      >
        <Text> A propos / Contact </Text>
      </TouchableOpacity>

      {isAboutVisible && <About />}

    </KeyboardAvoidingView>

  );
};

type Style = {
  about: ViewStyle;
  page: ViewStyle;
  header: ViewStyle;
  homeButton: ViewStyle;
  mainContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  about: {
    justifyContent: "flex-end",
    margin: 8,
  },
  page: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    paddingVertical: 64,
    alignItems: "center",
  },
  homeButton: {
    alignSelf: "center",
  },
  mainContainer: {
    marginVertical: 64,
  },
});

export default HomeScreen;
