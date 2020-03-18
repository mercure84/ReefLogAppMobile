import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
  Picker
} from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { CustomMessage } from "../../../../components/CustomMessage";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../../store/RootStore";
import {
  Animal,
  saveAnimal,
  AnimalSpecies
} from "../../../../services/animalService";
import { observer } from "mobx-react";

type Props = {
  animalToSave: Animal;
  animalTypeForm: string;
};

export const AnimalForm = observer(
  ({ animalToSave, animalTypeForm }: Props) => {
    const [rootStore, setRootStore] = useState(RootStore);
    let animalSpecies = null;

    if (rootStore.animalStore.animalSpeciesState === "pending") {
      rootStore.animalStore.fetchAnimalSpecies();
    }

    if (rootStore.animalStore.animalSpeciesState === "done") {
      switch (animalTypeForm) {
        case "fish":
          animalSpecies = rootStore.animalStore.animalSpeciesData.fish;
          break;
        case "soft":
          animalSpecies = rootStore.animalStore.animalSpeciesData.soft;
          break;
        case "lps":
          animalSpecies = rootStore.animalStore.animalSpeciesData.lps;
          break;
        case "sps":
          animalSpecies = rootStore.animalStore.animalSpeciesData.sps;
          break;
        case "anemone":
          animalSpecies = rootStore.animalStore.animalSpeciesData.anemone;
          break;
        case "urchin":
          animalSpecies = rootStore.animalStore.animalSpeciesData.urchin;
          break;
        case "star":
          animalSpecies = rootStore.animalStore.animalSpeciesData.star;
          break;
        case "mollusk":
          animalSpecies = rootStore.animalStore.animalSpeciesData.mollusk;
          break;
        case "cucumber":
          animalSpecies = rootStore.animalStore.animalSpeciesData.cucumber;
          break;
        case "crustacean":
          animalSpecies = rootStore.animalStore.animalSpeciesData.crustacean;
          break;
      }
    }

    const setSpecies = (text: string) => {
      switch (animalTypeForm) {
        case "fish":
          setAnimal({
            ...animal,
            fishSpecies: text
          });
          break;
        case "soft":
          setAnimal({
            ...animal,
            softSpecies: text
          });
          break;
        case "lps":
          setAnimal({
            ...animal,
            lpsSpecies: text
          });
          break;
        case "sps":
          setAnimal({
            ...animal,
            spsSpecies: text
          });
          break;
        case "anemone":
          setAnimal({
            ...animal,
            anemoneSpecies: text
          });
          break;
        case "urchin":
          setAnimal({
            ...animal,
            urchinSpecies: text
          });
          break;
        case "star":
          setAnimal({
            ...animal,
            starSpecies: text
          });
          break;
        case "mollusk":
          setAnimal({
            ...animal,
            molluskSpecies: text
          });
          break;
        case "cucumber":
          setAnimal({
            ...animal,
            cucumberSpecies: text
          });
          break;
        case "crustacean":
          setAnimal({
            ...animal,
            crustaceanSpecies: text
          });
          break;
      }
    };

    console.log(
      "status du animalSpeciesState = " +
        rootStore.animalStore.animalSpeciesState +
        " et animalForm = " +
        animalTypeForm +
        " animal species = " +
        animalSpecies
    );

    const toUpdate = animalToSave !== null;
    const [isLoading, setLoading] = useState(false);
    const [animal, setAnimal] = useState<Animal>(animalToSave);
    const [infoMessage, setInfoMessage] = useState(
      "Saisissez les données pour un nouveau " + animalTypeForm
    );
    const navigation = useNavigation();

    const isAnimalSpeciesLoading =
      rootStore.animalStore.animalSpeciesState === "pending";

    const checkForm = () => {
      if (animal.name !== null) {
        if (
          animal.lpsSpecies !== null ||
          animal.molluskSpecies !== null ||
          animal.softSpecies !== null ||
          animal.spsSpecies !== null ||
          animal.starSpecies !== null ||
          animal.urchinSpecies !== null ||
          animal.anemoneSpecies !== null ||
          animal.lpsSpecies !== null ||
          animal.cucumberSpecies !== null ||
          animal.fishSpecies !== null
        ) {
          return true;
        }
      }
      return false;
    };

    const submitAnimal = async () => {
      if (animal !== undefined && checkForm()) {
        setLoading(true);
        setInfoMessage(
          "Votre formulaire est correct, nous allons l'enregistrer... "
        );
        const response = await saveAnimal(
          rootStore.tankStore.tankList[0].id,
          animal,
          toUpdate
        );

        if (response != null) {
          setInfoMessage("L'animal a bien été enregistré !");
          rootStore.animalStore.fetchAnimals();
          setLoading(false);
          navigation.navigate("handlePopulation");
        } else {
          setInfoMessage("Un problème est survenu");
          setLoading(true);
        }
      } else {
        setInfoMessage(
          "Votre formulaire est incorrect, merci de le vérifier !"
        );
      }
    };
    return (
      <View>
        {isLoading && <ActivityIndicator />}
        <CustomMessage message={infoMessage} display={infoMessage !== null} />
        <Card>
          <View style={styles.input}>
            <Text>Date d'arrivée</Text>
            <TextInput
              style={styles.textInput}
              maxLength={30}
              placeholder={"30 caractères maxi"}
              onChangeText={text => null}
              enabled={false}
            />
          </View>
          <View style={styles.inputInlineContainer}>
            {isAnimalSpeciesLoading ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.input}>
                <Text>Espèce :</Text>
                <Picker
                  style={{ height: 50, width: 200 }}
                  mode="dialog"
                  selectedValue={
                    animal !== null ? animal.fishSpecies : animalSpecies
                  }
                  onValueChange={itemValue => setSpecies(itemValue)}
                >
                  {animalSpecies.map((item, index) => {
                    return (
                      <Picker.Item
                        label={item}
                        value={item.toString()}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            )}

            <View style={styles.input}>
              <Text>Nom</Text>
              <TextInput
                style={styles.textInput}
                maxLength={30}
                onChangeText={text =>
                  setAnimal({
                    ...animal,
                    name: text
                  })
                }
                defaultValue={
                  toUpdate && animal.name !== null ? animal.name : null
                }
              />
            </View>
            <View style={styles.input}>
              <Text>Taille :</Text>
              <Picker
                style={{ height: 50, width: 150 }}
                mode="dialog"
                selectedValue={animal === null ? "M" : animal.currentSize}
                onValueChange={itemValue =>
                  setAnimal({ ...animal, currentSize: itemValue })
                }
              >
                <Picker.Item label="XS" value="XS" />
                <Picker.Item label="S" value="S" />
                <Picker.Item label="M" value="M" />
                <Picker.Item label="L" value="L" />
                <Picker.Item label="XL" value="XL" />
              </Picker>
            </View>
            <View style={styles.input}>
              <Text>Quantité</Text>
              <TextInput
                style={styles.textInput}
                maxLength={2}
                onChangeText={text =>
                  setAnimal({
                    ...animal,
                    quantity: parseInt(text)
                  })
                }
                defaultValue={
                  toUpdate && animal.name !== null ? animal.name : "1"
                }
              />
            </View>

            <View style={styles.inputInline}>
              <Text>Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.textInput}
                maxLength={255}
                onChangeText={text =>
                  setAnimal({
                    ...animal,
                    notes: text
                  })
                }
                defaultValue={
                  toUpdate && animal.name !== null ? animal.name : null
                }
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Enregistrer" onPress={() => submitAnimal()} />
            <Button
              title="Annuler"
              onPress={() => navigation.navigate("handlePopulation")}
            />
          </View>
        </Card>
      </View>
    );
  }
);

type Style = {
  input: ViewStyle;
  inputInlineContainer: ViewStyle;
  inputInline: ViewStyle;
  textInput: TextStyle;
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2
  },
  inputInlineContainer: {
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
  buttonContainer: {
    padding: 16
  }
});
