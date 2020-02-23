import React, { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  TextInput,
  StyleSheet,
  Picker
} from "react-native";
import { Card, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { addNewReefTank } from "../../../../services/tankServices";

type Props = {
  infoCallBack: (text: string) => void;
};

export const NewTankForm: FunctionComponent<Props> = ({
  infoCallBack
}: Props) => {
  const [tankName, setName] = useState("");
  const [tankLength, setLength] = useState("");
  const [tankWidth, setWidth] = useState("");
  const [tankHeight, setHeight] = useState("");
  const [maintenance, setMaintenance] = useState("BERLINOIS");
  const [sumpVolume, setSumpVolume] = useState();
  const [population, setPopulation] = useState("MIX");
  const [startDate, setStartDate] = useState(new Date());
  const [infoMessage, setInfoMessage] = useState("Décrivez votre Aquarium !");

  infoCallBack(infoMessage);
  // FIXME : récupérer l'ID du membre par le store
  const memberId = 91;

  const checkForm = () => {
    let isValide = false;
    if (
      tankName !== "" &&
      tankLength !== "" &&
      tankWidth !== "" &&
      tankHeight !== "" &&
      sumpVolume !== ""
    ) {
      setInfoMessage("Le formulaire est valide !");
      isValide = true;
    } else {
      isValide = false;
      setInfoMessage(
        "OOPS .... il y a un petit problème dans les données du formulaire"
      );
    }
    return isValide;
  };

  const submitNewTank = () => {
    if (checkForm()) {
      addNewReefTank(
        memberId,
        tankName,
        tankLength,
        tankWidth,
        tankHeight,
        maintenance,
        sumpVolume,
        population,
        startDate
      );
    }
  };

  return (
    <Card title="Création d'un aquarium !">
      <View style={styles.input}>
        <Text>Nom</Text>
        <TextInput
          style={styles.textInput}
          maxLength={30}
          placeholder="30 caractères maxi"
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputInlineContainer}>
        <View style={styles.inputInline}>
          <Text>Longueur</Text>
          <TextInput
            style={styles.textInputSmall}
            maxLength={3}
            placeholder="0-500cm"
            keyboardType="numeric"
            onChangeText={text => setLength(text)}
          />
        </View>
        <View style={styles.inputInline}>
          <Text>Largeur</Text>
          <TextInput
            style={styles.textInputSmall}
            maxLength={3}
            placeholder="0-500cm"
            keyboardType="numeric"
            onChangeText={text => setWidth(text)}
          />
        </View>
        <View style={styles.inputInline}>
          <Text>Hauteur</Text>
          <TextInput
            style={styles.textInputSmall}
            maxLength={3}
            placeholder="0-500cm"
            keyboardType="numeric"
            onChangeText={text => setHeight(text)}
          />
        </View>

        <View style={styles.inputInline}>
          <Text>Décantation</Text>
          <TextInput
            style={styles.textInputSmall}
            maxLength={4}
            placeholder="0-9999 L"
            keyboardType="numeric"
            onChangeText={text => setSumpVolume(text)}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text>Maintenance</Text>
        <Picker
          style={{ height: 50, width: 150 }}
          mode="dropdown"
          selectedValue={maintenance}
          onValueChange={itemValue => setMaintenance(itemValue)}
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
          selectedValue={population}
          onValueChange={itemValue => setPopulation(itemValue)}
        >
          <Picker.Item label="Fish-Only" value="FISH_ONLY" />
          <Picker.Item label="Mixte" value="MIX" />
          <Picker.Item label="Mous" value="SOFT" />
          <Picker.Item label="LPS" value="LPS" />
          <Picker.Item label="SPS" value="SPS" />
        </Picker>
      </View>
      <View style={styles.input}>
        <Text>Mise en eau</Text>
        <DatePicker
          style={{ width: 150 }}
          date={startDate} //initial date from state
          mode="date" //The enum of date, datetime and time
          format="DD-MM-YYYY"
          maxDate={new Date()}
          confirmBtnText="OK"
          cancelBtnText="Annuler"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={date => setStartDate(date)}
        />
      </View>
      <Button title="Enregistrer" onPress={() => submitNewTank()} />
    </Card>
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
