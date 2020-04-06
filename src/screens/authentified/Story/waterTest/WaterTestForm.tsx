import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import {
  WaterTest,
  saveWaterTest
} from "../../../../services/waterTestService";
import { MessageInfo } from "../../../../components/MessageInfo";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../../store/RootStore";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ReefButton } from "../../../../components/ReefButton";

type Props = {
  waterTestToUpdate: WaterTest;
};

export const WaterTestForm = ({ waterTestToUpdate }: Props) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const toUpdate = waterTestToUpdate !== null;
  const [isLoading, setLoading] = useState(false);
  const [waterTest, setWaterTest] = useState<WaterTest>(waterTestToUpdate);
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
      const response = await saveWaterTest(
        RootStore.tankStore.tankList[0].id,
        waterTest,
        toUpdate
      );

      if (response != null) {
        setInfoMessage("Le test a bien été enregistré !");
        RootStore.waterTestStore.fetchWaterTestList();
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

  const setDate = date => {
    setDatePickerVisible(false);

    setWaterTest({
      ...waterTest,
      date: date
    });
    setDatePickerVisible(false);
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      <MessageInfo message={infoMessage} />
      <Card>
        <View style={styles.input}>
          <Text>Date d'arrivée</Text>
          <ReefButton
            title={
              waterTest !== null
                ? Moment(waterTest.date)
                    .format("lll")
                    .toString()
                : Moment(new Date())
                    .format("lll")
                    .toString()
            }
            onPress={() => setDatePickerVisible(true)}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={
              waterTest !== null
                ? new Date(Moment(waterTest.date).toString())
                : new Date()
            }
            locale="fr-FR"
            mode="datetime"
            onConfirm={setDate}
            onCancel={() => setDatePickerVisible(false)}
          />
        </View>
        <View style={styles.inputInlineContainer}>
          <View style={styles.inputInline}>
            <Text>Température</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={5}
              placeholder={"0-99 °C"}
              keyboardType="decimal-pad"
              onChangeText={text =>
                setWaterTest({
                  ...waterTest,
                  temperature: parseFloat(text)
                })
              }
              defaultValue={
                toUpdate && waterTest.temperature !== null
                  ? waterTest.temperature.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.salinity !== null
                  ? waterTest.salinity.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.alcalinity !== null
                  ? waterTest.alcalinity.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.ph !== null
                  ? waterTest.ph.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.calcium !== null
                  ? waterTest.calcium.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.magnesium !== null
                  ? waterTest.magnesium.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.ammoniac !== null
                  ? waterTest.ammoniac.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.nitrates !== null
                  ? waterTest.nitrates.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.nitrites !== null
                  ? waterTest.nitrites.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.phosphates !== null
                  ? waterTest.phosphates.toString()
                  : null
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
              defaultValue={
                toUpdate && waterTest.silicates !== null
                  ? waterTest.silicates.toString()
                  : null
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ReefButton title="Enregistrer" onPress={() => submitWaterTest()} />
          <ReefButton
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
