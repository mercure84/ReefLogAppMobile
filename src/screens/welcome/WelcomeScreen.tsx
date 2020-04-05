import React, { useState } from "react";

import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { MessageInfo } from "../../components/MessageInfo";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { About } from "./components/About";
import { ReefButton } from "../../components/ReefButton";

const HomeScreen = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  const [messageInfo, setMessageInfo] = useState("");
  const [isAboutVisible, setAboutVisible] = useState(false);

  const toggleWelcomeCompoents = (element: string) => {
    switch (element) {
      case "about":
        setAboutVisible(!isAboutVisible);
        setLoginVisible(false);
        setSignupVisible(false);
        return;
      case "login":
        setAboutVisible(false);
        setLoginVisible(!isLoginVisible);
        setSignupVisible(false);
        return;
      case "signup":
        setAboutVisible(false);
        setLoginVisible(false);
        setSignupVisible(!isSignupVisible);
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
        <Text style={styles.title1}>Bienvenue sur REEFLOG !</Text>
        <Image
          resizeMode="contain"
          style={styles.homeImage}
          source={require("../../assets/home.png")}
        />
      </View>
      <View style={styles.homeButton}>
        <View style={{ margin: 5 }}>
          <ReefButton
            title="Créer un compte"
            onPress={() => {
              toggleWelcomeCompoents("signup");
            }}
          />
        </View>
        <View style={{ margin: 5 }}>
          <ReefButton
            title="Se connecter"
            onPress={() => {
              toggleWelcomeCompoents("login");
            }}
          />
        </View>
      </View>
      <View style={styles.homeForms}>
        <MessageInfo message={messageInfo} />

        {isLoginVisible && (
          <LoginForm
            homeInfoCallBack={setMessageInfo}
            showLoginForm={setLoginVisible}
          />
        )}
        {isSignupVisible && (
          <SignupForm
            homeInfoCallBack={setMessageInfo}
            showSignupForm={setSignupVisible}
            memberToUpdate={null}
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
  title1: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  header: {
    padding: 16,
    flex: 1,
    alignItems: "center",
  },
  homeButton: {
    flexDirection: "row",
    alignSelf: "center",
  },
  homeImage: {
    borderRadius: 100,
    width: 250,
    height: 150,
  },
  homeForms: {
    flex: 2,
    alignItems: "center",
  },
});

export default HomeScreen;
