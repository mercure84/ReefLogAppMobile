import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ViewStyle,
  TextStyle,
  StyleSheet
} from "react-native";
import { Card } from "react-native-elements";
import { Member } from "../../../../services/memberService";
import RootStore from "../../../../store/RootStore";

type Props = {
  memberToUpdate: Member;
};

export const ProfilForm = ({ memberToUpdate }: Props) => {
  const [rootStore] = useState(RootStore);
  const [member, setMember] = useState<Member>(memberToUpdate);
  const isUpdating = memberToUpdate !== null;

  return (
    <View style={{ padding: 8 }}>
      <Card title="Mettre à jours mes informations">
        <View style={styles.input}>
          <Text>Mon email</Text>
          <TextInput
            style={styles.textInput}
            textContentType="emailAddress"
            keyboardType="email-address"
            maxLength={30}
            autoCompleteType="email"
            placeholder="email@email.fr"
            onChangeText={text => setMember({ ...member, email: text })}
            defaultValue={
              isUpdating && memberToUpdate.email !== null
                ? memberToUpdate.email
                : null
            }
          />
        </View>
        <View style={styles.input}>
          <Text>Mon pseudo</Text>
          <TextInput
            style={styles.textInput}
            textContentType="nickname"
            maxLength={12}
            autoCompleteType="off"
            placeholder="pseudo"
            onChangeText={text => setMember({ ...member, userName: text })}
            defaultValue={
              isUpdating && memberToUpdate.userName !== null
                ? memberToUpdate.userName
                : null
            }
          />
        </View>
        <View style={styles.input}>
          <Text>Mon password</Text>
          <TextInput
            style={styles.textInput}
            textContentType="newPassword"
            secureTextEntry={true}
            maxLength={12}
            autoCompleteType="off"
            placeholder="mot de passe"
            defaultValue={
              isUpdating && memberToUpdate.password !== null
                ? memberToUpdate.password
                : null
            }
            onChangeText={text => setMember({ ...member, password: text })}
          />
        </View>
        <View style={styles.input}>
          <Text>Confirmer le mdp </Text>
          <TextInput
            style={styles.textInput}
            textContentType="newPassword"
            secureTextEntry={true}
            maxLength={12}
            autoCompleteType="off"
            placeholder="mot de passe"
            defaultValue={
              isUpdating && memberToUpdate.password !== null
                ? memberToUpdate.password
                : null
            }
            onChangeText={null}
          />
        </View>

        <Button title="Mettre à jour" onPress={null} />
      </Card>
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
    paddingVertical: 2
  },
  textInput: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "65%",
    borderRadius: 5
  }
});
