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
import { TestCollection } from "../../../../services/WaterTestService";

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
              maxLength={5}
              placeholder="0-99 °C"
              keyboardType="decimal-pad"
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
              maxLength={5}
              placeholder="0-99"
              keyboardType="decimal-pad"
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
              maxLength={5}
              placeholder="0-99"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  alcalinity: parseFloat(text)
                })
              }
            />
          </View>
        </View>
        <View style={styles.inputInlineContainer}>
          <View style={styles.inputInline}>
            <Text>pH</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={5}
              placeholder="0-14"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  pH: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Calcium (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={3}
              placeholder="0-999"
              keyboardType="numeric"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  calcium: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Magnesium (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9999"
              keyboardType="numeric"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  magnesium: parseFloat(text)
                })
              }
            />
          </View>
        </View>
        <View style={styles.inputInlineContainer}>
          <View style={styles.inputInline}>
            <Text>Ammoniac (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  ammoniac: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Nitrates (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  nitrates: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Nitrites (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  nitrites: parseFloat(text)
                })
              }
            />
          </View>
        </View>
        <View style={styles.inputInlineContainer}>
          <View style={styles.inputInline}>
            <Text>Phosphates (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  phosphates: parseFloat(text)
                })
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Silicates (ppm)</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9"
              keyboardType="decimal-pad"
              onChangeText={text =>
                setTestCollection({
                  ...TestCollection,
                  silicates: parseFloat(text)
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
