import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";

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
  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior="position"
      enabled={true}
    >
      <KeyboardAvoidingView
        contentContainerStyle={{ display: "none" }}
        style={style.header}
      >
        <Text style={style.title1}>Bienvenue sur REEFLOG !</Text>
        <Image
          resizeMode="contain"
          style={style.homeImage}
          source={require("../../assets/home.png")}
        />
      </KeyboardAvoidingView>
      <View style={style.homeButton}>
        <View style={{ margin: 5 }}>
          <Button
            title="Créer un compte"
            onPress={() => {
              toggleDisplaySignup(true);
              toggleDisplayLogin(false);
            }}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            title="Se connecter"
            onPress={() => {
              toggleDisplaySignup(false);
              toggleDisplayLogin(true);
            }}
          />
        </View>
      </View>
      <View style={style.homeForms}>
        {displayLoginFormState && <LoginForm />}
        {displaySignupFormState && <SignupForm />}
      </View>
      <TouchableOpacity>
        <Text> A propos </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
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
    padding: 50,
    flex: 1,
    alignContent: "center"
  },
  homeButton: {
    flexDirection: "row",
    alignSelf: "center"
  },
  homeImage: {
    width: 300,
    height: 200
  },
  homeForms: {
    flex: 2
  }
});

export default HomeScreen;
