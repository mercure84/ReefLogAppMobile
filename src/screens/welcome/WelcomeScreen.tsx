import React, {useEffect, useState} from 'react';

import {View, ViewStyle, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {About} from './components/About';
import {Text} from 'react-native-elements';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {webClientGoogleSignId} from '../../constants/constants';
import {googleSignIn, isSignedIn} from '../../services/googleSignin';
import {useNavigation} from '@react-navigation/native';

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

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const [isAboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    console.log('Google Signing is configuring');
    GoogleSignin.configure({
      webClientId: webClientGoogleSignId,
    });
    isSignedIn();
  }, []);

  const handlePressAbout = () => setAboutVisible(!isAboutVisible);
  const handleGoogleOnPress = async () => {
    const access = await googleSignIn();
    console.log('JULIEN ACESS ?? ', access);
    if (access === 'success') {
      navigation.navigate('AuthentOk');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text h2>Log4Reef</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={{padding: 8}}>
          <GoogleSigninButton
            style={{width: '100%', height: '30%'}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleOnPress}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.about} onPress={handlePressAbout}>
        <Text>A propos ©</Text>
      </TouchableOpacity>
      {isAboutVisible && <About />}
    </>
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
    justifyContent: 'flex-end',
    margin: 8,
    alignSelf: 'center',
  },
  page: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    marginBottom: 64,
    alignItems: 'center',
  },
  mainContainer: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default WelcomeScreen;
