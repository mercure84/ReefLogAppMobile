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
  statusCodes,
} from "@react-native-google-signin/google-signin";

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

  useEffect(() => {
    console.log("Google Signing configuring");
    GoogleSignin.configure({
      webClientId:
        "448183942719-fi4aiub0o4pk15ntk7kr1hhemdjkim2c.apps.googleusercontent.com",
    });
    isSignedIn();
  }, []);

  const signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
    } catch (error) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log(error.message);
      }
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log("User Info --> ", info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log("User has not signed in yet");
        console.log("User has not signed in yet");
      } else {
        console.log("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      console.log("User is already signed in");
      // Set User Info if user is already signed in
      getCurrentUserInfo();
    } else {
      console.log("Please Login");
    }
  };

  const handlePressAbout = () => setAboutVisible(!isAboutVisible);
  const handleGoogleOnPress = async () => await signIn();

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
