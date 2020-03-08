import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ViewStyle,
  TextStyle,
  StyleSheet
} from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { TestCollection } from "../../../../services/testService";

export const TestCollectionForm = () => {
  const [TestCollection, setTestCollection] = useState<TestCollection>();

  return (
    <View>
      <Card>
        <View style={styles.input}>
          <Text>Date et Heure</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            placeholder="30 caractères maxi"
            onChangeText={text => null}
            enabled={false}
          />
        </View>
        <View style={styles.inputInlineContainer}>
          <View style={styles.inputInline}>
            <Text>Température</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={2}
              placeholder="0-99 °C"
              keyboardType="numeric"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  temperature: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Salinité (ppt)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={2}
              placeholder="0-99"
              keyboardType="numeric"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  salinity: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Alcalinité (KH)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={2}
              placeholder="0-99"
              keyboardType="numeric"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  alcalinity: parseFloat(text)
                })
              }
            />
          </View>
        </View>
      </Card>

      <Button title="Enregistrer" onPress={() => null} />
      <Button title="Annuler" onPress={() => null} />
    </View>
  );
};

type Style = {
  input: ViewStyle;
  inputInlineContainer: ViewStyle;
  inputInline: ViewStyle;
  textInput: TextStyle;
  textInputSmall: TextStyle;
};

const styles = StyleSheet.create<Style>({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4
  },
  inputInlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputInline: {
    alignItems: "center"
  },
  textInput: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "65%",
    borderRadius: 5
  },

  textInputSmall: {
    backgroundColor: "lightgrey",
    textAlign: "center",
    height: 40,
    width: "100%",
    borderRadius: 10
  }
});
