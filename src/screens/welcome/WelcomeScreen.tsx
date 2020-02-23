import React, { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { MessageInfo } from './components/MessageInfo';
import { getData } from '../../services/storageDevice';

interface Props {
  displayLoginForm: boolean;
  displaySignupForm: boolean;
}

const HomeScreen = ({ displayLoginForm, displaySignupForm }: Props) => {
  const [displayLoginFormState, toggleDisplayLogin] = useState(
    displayLoginForm,
  );
  const [displaySignupFormState, toggleDisplaySignup] = useState(
    displaySignupForm,
  );

  const [messageInfo, setMessageInfo] = useState();

  const token = getData('id_token');
  const emailUser = getData('emailUser');

  console.log('Token = ' + token);
  console.log('Email actuellement stocké = ' + emailUser);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      enabled={true}>
      <KeyboardAvoidingView
        contentContainerStyle={{ display: 'none' }}
        style={styles.header}>
        <Text style={styles.title1}>Bienvenue sur REEFLOG !</Text>
        <Image
          resizeMode="contain"
          style={styles.homeImage}
          source={require('../../assets/home.png')}
        />
      </KeyboardAvoidingView>
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
              setMessageInfo('Saisissez email / mdp');
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
          />
        )}
      </View>
      <TouchableOpacity>
        <Text> A propos </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    margin: 20,
  },
  title1: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  header: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  homeButton: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  homeImage: {
    borderRadius: 100,
    width: 250,
    height: 150,
  },
  homeForms: {
    flex: 2,
    alignItems: 'center',
  },
});

export default HomeScreen;
