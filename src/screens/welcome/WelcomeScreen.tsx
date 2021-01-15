import React, { useState } from "react";

import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import {
  View,
  ViewStyle,
  StyleSheet,
  KeyboardAvoidingView,
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
  showButtons: true,
};

export enum WelcomeElement {
  LOGIN,
  SIGNUP,
  PASSRECOVER,
  DEFAULT,
}

const HomeScreen = () => {
  const [componentStatus, setComponentStatus] = useState(
    componentStatusDefault
  );
  const [isAboutVisible, setAboutVisible] = useState(false);

  const toggleWelcomeComponents = (element: WelcomeElement) => {
    switch (element) {
      case WelcomeElement.LOGIN:
        setComponentStatus({
          showSignup: false,
          showLogin: true,
          showPassRecover: false,
          showButtons: false,
        });
        return;
      case WelcomeElement.SIGNUP:
        setComponentStatus({
          showSignup: true,
          showLogin: false,
          showPassRecover: false,
          showButtons: false,
        });
        return;
      case WelcomeElement.PASSRECOVER:
        setComponentStatus({
          showSignup: false,
          showLogin: false,
          showPassRecover: true,
          showButtons: false,
        });
        return;
      case WelcomeElement.DEFAULT:
        setComponentStatus(componentStatusDefault);
        return;
    }
  };

  const handlePressAbout = () => setAboutVisible(!isAboutVisible);

  return (
    <KeyboardAvoidingView style={styles.page} behavior="height">
      <View style={styles.header}>
        <Text h2>Log4Reef</Text>
      </View>
      <View style={styles.mainContainer}>
        {componentStatus.showButtons && (
          <View style={{ padding: 8, flex: 1 }}>
            <ReefButton
              size="large"
              title="Créer un compte"
              onPress={() => {
                toggleWelcomeComponents(WelcomeElement.SIGNUP);
              }}
            />
            <ReefButton
              size="large"
              title="Se connecter"
              onPress={() => {
                toggleWelcomeComponents(WelcomeElement.LOGIN);
              }}
            />
          </View>
        )}
        {componentStatus.showLogin && (
          <LoginForm toggleWelcomeComponents={toggleWelcomeComponents} />
        )}
        {componentStatus.showSignup && (
          <SignupForm toggleWelcomeComponents={toggleWelcomeComponents} />
        )}
        {componentStatus.showPassRecover && (
          <PassWordRecoverForm
            toggleWelcomeComponents={toggleWelcomeComponents}
          />
        )}
      </View>
      <TouchableOpacity style={styles.about} onPress={handlePressAbout}>
        <Text>A propos</Text>
      </TouchableOpacity>

      {isAboutVisible && <About />}
    </KeyboardAvoidingView>
  );
};

type Style = {
  about: ViewStyle;
  page: ViewStyle;
  header: ViewStyle;
  mainContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  about: {
    justifyContent: "flex-end",
    margin: 8,
    alignSelf: "center",
  },
  page: {
    alignItems: "center",
    flex: 1,
  },
  header: {
    marginBottom: 64,
    alignItems: "center",
  },
  mainContainer: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
});

export default HomeScreen;
