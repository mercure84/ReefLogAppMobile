import React, { useEffect, useState } from "react";

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
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { webClientGoogleSignId } from "../../constants/constants";
import { googleSignIn, isSignedIn } from "../../services/googleSignin";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

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

  useEffect(() => {
    console.log("Google Signing is configuring");
    GoogleSignin.configure({
      webClientId: webClientGoogleSignId,
    });
    isSignedIn();
  }, []);

  const handlePressAbout = () => setAboutVisible(!isAboutVisible);
  const handleGoogleOnPress = async () => {
    const access = await googleSignIn();
    if (access === "success") {
      navigation.navigate("AuthentOk");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.page} behavior="height">
      <View style={styles.header}>
        <Text h2>Log4Reef</Text>
      </View>
      <View style={styles.mainContainer}>
        {componentStatus.showButtons && (
          <View style={{ padding: 8 }}>
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
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleOnPress}
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
        <Text>A propos ©</Text>
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
