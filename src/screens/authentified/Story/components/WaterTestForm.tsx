import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import {
  WaterTest,
  addNewWaterTest
} from "../../../../services/waterTestService";
import { CustomMessage } from "../../../../components/CustomMessage";
import { useNavigation } from "@react-navigation/native";

export const WaterTestForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [waterTest, setWaterTest] = useState<WaterTest>();
  const [infoMessage, setInfoMessage] = useState(
    "Saisissez les données de vos tests !"
  );
  const navigation = useNavigation();

  const checkForm = () => {
    let goodValues = 0;
    Object.keys(waterTest).forEach(function(key) {
      let value = waterTest[key];
      isNaN(value) ? (value = null) : null;
      if (value !== undefined && value !== null && typeof value === "number") {
        goodValues++;
      }
    });
    if (goodValues > 0) {
      return true;
    } else {
      return false;
    }
  };

  const submitWaterTest = async () => {
    if (waterTest !== undefined && checkForm()) {
      setLoading(true);
      setInfoMessage(
        "Votre formulaire est correct, nous allons l'enregistrer... "
      );
      const response = await addNewWaterTest("171", waterTest);

      if (response != null) {
        setInfoMessage("Le test a bien été enregistré !");
        setLoading(false);
        navigation.navigate("mainStory");
      } else {
        setInfoMessage("Un problème est survenu");
        setLoading(true);
      }
    } else {
      setInfoMessage("Votre formulaire est incorrect, merci de le vérifier !");
    }
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      <CustomMessage message={infoMessage} display={infoMessage !== null} />
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
                  ph: parseFloat(text)
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
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
                setWaterTest({
                  ...waterTest,
                  silicates: parseFloat(text)
                })
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Enregistrer" onPress={() => submitWaterTest()} />
          <Button
            title="Annuler"
            onPress={() => navigation.navigate("mainStory")}
          />
        </View>
      </Card>
    </View>
  );
};

type Style = {
  input: ViewStyle;
  inputInlineContainer: ViewStyle;
  inputInline: ViewStyle;
  textInput: TextStyle;
  textInputSmall: TextStyle;
  buttonContainer: ViewStyle;
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
  },
  buttonContainer: {
    padding: 16
  }
});
