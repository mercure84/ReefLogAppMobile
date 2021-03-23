import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { InfoModal } from "../../../components/InfoModal";
import { ReefButton } from "../../../components/ReefButton";
import { getPasswordRecover } from "../../../services/memberService";
import { WelcomeElement } from "../WelcomeScreen";

type Props = {
  toggleWelcomeComponents: (welcomeElement: WelcomeElement) => void;
};

export const PassWordRecoverForm = ({ toggleWelcomeComponents }: Props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalInfoVisible, showModalInfo] = useState(false);

  const handleOnPress = async () => {
    setLoading(true);
    const response = await getPasswordRecover(email);
    setLoading(false);
    if (response !== null) {
      setMessage(
        "Nous vérifions si l'email " +
          email +
          " est présent dans notre base de données pour vous renvoyer un lien de réinitialisation de mot de passe."
      );
      showModalInfo(true);
    } else {
      setMessage(
        "Erreur technique, veuillez nous excuser pour la gêne occasionnée et ressayer ultérieurement"
      );
      showModalInfo(true);
    }
  };

  const handlePressOK = () => {
    showModalInfo(false);
    toggleWelcomeComponents(WelcomeElement.DEFAULT);
  };

  const handleCancel = () => toggleWelcomeComponents(WelcomeElement.DEFAULT);
  return (
    <View>
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}

      <View>
        <Text style={{ fontWeight: "bold" }}>Saisissez votre email </Text>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            maxLength={30}
            autoCompleteType="email"
            placeholder="E-mail"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <ReefButton
        title="Réinitialiser mon mot de passe"
        onPress={handleOnPress}
      />
      <ReefButton title="Retour" onPress={handleCancel} />

      <InfoModal
        isModaleVisible={isModalInfoVisible}
        message={message}
        OKButtonFunction={handlePressOK}
        onHide={handlePressOK}
      />
    </View>
  );
};

type Style = {
  input: ViewStyle;
  textInput: TextStyle;
};

const styles = StyleSheet.create<Style>({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    width: 320,
  },
});
