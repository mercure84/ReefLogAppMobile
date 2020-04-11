import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  TextInput,
  StyleSheet,
  Picker,
  ActivityIndicator
} from "react-native";
import { Card } from "react-native-elements";
import { saveReefTank, Tank } from "../../../../services/tankService";
import RootStore from "../../../../store/RootStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from "moment";
import { ReefButton } from "../../../../components/ReefButton";
import { formatStringToInteger } from "../../../../utils/helpers";

type Props = {
  infoCallBack: (string: string) => void;
  showFormCallback: (boolean: boolean) => void;
  memberId: string;
  tankToSave: Tank;
};

export const NewTankForm = ({
  infoCallBack,
  showFormCallback,
  memberId,
  tankToSave
}: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tank, setTank] = useState<Tank>(tankToSave);
  const [infoMessage, setInfoMessage] = useState("");

  const isUpdating = tankToSave !== null;

  infoCallBack(infoMessage);

  const checkForm = () => {
    let isValide = false;
    if (
      tank.name !== "" &&
      tank.length !== null &&
      tank.height !== null &&
      tank.width !== null &&
      tank.sumpVolume !== null
    ) {
      isValide = true;
    } else {
      isValide = false;
      setLoading(false);

      setInfoMessage(
        "OOPS .... il y a un petit problème dans les données du formulaire"
      );
    }
    return isValide;
  };

  const saveTank = async () => {
    setLoading(true);
    if (checkForm()) {
      setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");
      const response = await saveReefTank(memberId, tank, isUpdating);
      if (response != null) {
        setLoading(false);
        setInfoMessage("");
        showFormCallback(false);
      } else {
        setLoading(false);
        setInfoMessage("Un problème est survenu");
      }
    }
    RootStore.tankStore.fetchTankList();
  };

  const setDate = date => {
    setDatePickerVisible(false);

    setTank({
      ...tank,
      startDate: date
    });
    setDatePickerVisible(false);
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}

      <Card title="Création d'un aquarium !">
        <View style={styles.input}>
          <Text>Mise en eau</Text>

          <ReefButton
            title={
              tank !== null
                ? Moment(tank.startDate)
                    .format("ll")
                    .toString()
                : Moment(new Date())
                    .format("ll")
                    .toString()
            }
            onPress={() => setDatePickerVisible(true)}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={
              tank !== null
                ? new Date(Moment(tank.startDate).toString())
                : new Date()
            }
            locale="fr-FR"
            mode="date"
            display="calendar"
            onConfirm={setDate}
            onCancel={() => setDatePickerVisible(false)}
          />
        </View>

        <View style={styles.input}>
          <Text>Nom</Text>
          <TextInput
            style={styles.textInput}
            maxLength={30}
            placeholder="30 caractères maxi"
            onChangeText={text =>
              setTank({
                ...tank,
                name: text
              })
            }
            defaultValue={isUpdating && tank.name !== null ? tank.name : null}
          />
        </View>
        <View style={styles.inputInlineContainer}>
          <View style={styles.inputInline}>
            <Text>Longueur</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={3}
              placeholder="0-999cm"
              keyboardType="numeric"
              onChangeText={text =>
                setTank({
                  ...tank,
                  length: formatStringToInteger(text)
                })
              }
              defaultValue={
                isUpdating && tank.length !== null
                  ? tank.length.toString()
                  : null
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Largeur</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={3}
              placeholder="0-999cm"
              keyboardType="numeric"
              onChangeText={text =>
                setTank({
                  ...tank,
                  width: formatStringToInteger(text)
                })
              }
              defaultValue={
                isUpdating && tank.width !== null ? tank.width.toString() : null
              }
            />
          </View>
          <View style={styles.inputInline}>
            <Text>Hauteur</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={3}
              placeholder="0-999cm"
              keyboardType="numeric"
              onChangeText={text =>
                setTank({
                  ...tank,
                  height: formatStringToInteger(text)
                })
              }
              defaultValue={
                isUpdating && tank.height !== null
                  ? tank.height.toString()
                  : null
              }
            />
          </View>

          <View style={styles.inputInline}>
            <Text>Décantation</Text>
            <TextInput
              style={styles.textInputSmall}
              maxLength={4}
              placeholder="0-9999 L"
              keyboardType="numeric"
              onChangeText={text =>
                setTank({
                  ...tank,
                  sumpVolume: formatStringToInteger(text)
                })
              }
              defaultValue={
                isUpdating && tank.sumpVolume !== null
                  ? tank.sumpVolume.toString()
                  : null
              }
            />
          </View>
        </View>
        <View style={styles.input}>
          <Text>Maintenance</Text>
          <Picker
            style={{ height: 50, width: 150 }}
            mode="dropdown"
            selectedValue={
              tank == null || tank.typeOfMaintenance == undefined
                ? setTank({ ...tank, typeOfMaintenance: "BERLINOIS" })
                : tank.typeOfMaintenance
            }
            onValueChange={itemValue =>
              setTank({ ...tank, typeOfMaintenance: itemValue })
            }
          >
            <Picker.Item label="Berlinois" value="BERLINOIS" />
            <Picker.Item label="Jaubert" value="JAUBERT" />
            <Picker.Item label="Autre" value="AUTRE" />
          </Picker>
        </View>
        <View style={styles.input}>
          <Text>Population principale</Text>
          <Picker
            style={{ height: 50, width: 150 }}
            mode="dropdown"
            selectedValue={
              tank === null
                ? setTank({ ...tank, mainPopulation: "MIX" })
                : tank.mainPopulation
            }
            onValueChange={itemValue =>
              setTank({ ...tank, mainPopulation: itemValue })
            }
          >
            <Picker.Item label="Fish-Only" value="FISH_ONLY" />
            <Picker.Item label="Mixte" value="MIX" />
            <Picker.Item label="Mous" value="SOFT" />
            <Picker.Item label="LPS" value="LPS" />
            <Picker.Item label="SPS" value="SPS" />
          </Picker>
        </View>
        <ReefButton title="Enregistrer" onPress={() => saveTank()} />
        <ReefButton
          title="Annuler"
          onPress={() => {
            showFormCallback(false);
          }}
        />
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
