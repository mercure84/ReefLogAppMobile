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
import { Card, Button } from "react-native-elements";
import { addNewReefTank, Tank } from "../../../../services/tankService";

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
  const [tank, setTank] = useState<Tank>(tankToSave);
  const [infoMessage, setInfoMessage] = useState("Décrivez votre Aquarium !");

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

  const submitNewTank = async () => {
    setLoading(true);
    if (checkForm()) {
      setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");

      const response = await addNewReefTank(memberId, tank);

      if (response != null) {
        setInfoMessage("L'aquarium a bien été enregistré");
        setLoading(false);
        showFormCallback(false);
      } else {
        setLoading(false);

        setInfoMessage("Un problème est survenu");
      }
    }
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}

      <Card title="Création d'un aquarium !">
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
                  length: parseFloat(text)
                })
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
                  width: parseFloat(text)
                })
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
                  height: parseFloat(text)
                })
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
                  sumpVolume: parseFloat(text)
                })
              }
            />
          </View>
        </View>
        <View style={styles.input}>
          <Text>Maintenance</Text>
          <Picker
            style={{ height: 50, width: 150 }}
            mode="dropdown"
            selectedValue={tank !== null ? tank.typeOfMaintenance : "BERLINOIS"}
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
            selectedValue={tank !== null ? tank.mainPopulation : "MIX"}
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
        <Button title="Enregistrer" onPress={() => submitNewTank()} />
        <Button title="Annuler" onPress={() => showFormCallback(false)} />
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