import React, { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
  Picker
} from "react-native";
import { Card } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { MessageInfo } from "../../../../components/MessageInfo";
import { ReefButton } from "../../../../components/ReefButton";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../../store/RootStore";
import {
  Animal,
  saveAnimal,
  AnimalType
} from "../../../../services/animalService";
import { observer } from "mobx-react";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  animalToSave: Animal;
  animalTypeForm?: string;
};
export const AnimalForm = observer(
  ({ animalToSave, animalTypeForm }: Props) => {
    const isUpdating = animalToSave !== null;
    const [isLoading, setLoading] = useState(false);
    const [animal, setAnimal] = useState<Animal>(animalToSave);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const [infoMessage, setInfoMessage] = useState(
      "Saisissez les données pour un nouveau " + AnimalType[animalTypeForm]
    );
    const navigation = useNavigation();
    const [speciesInPicker, setSpeciesInPicker] = useState("");
    const [animalSpecies, setAnimalSpecies] = useState([]);

    if (
      RootStore.animalStore.animalSpeciesState === "pending" ||
      animalSpecies === []
    ) {
      RootStore.animalStore.fetchAnimalSpecies();
    }

    const setSpecies = (text: string) => {
      setSpeciesInPicker(text);
      setAnimal({
        ...animal,
        [animalTypeForm + "Species"]: text
      });
    };

    if (
      RootStore.animalStore.animalSpeciesState === "done" &&
      animalSpecies.length === 0
    ) {
      setAnimalSpecies(RootStore.animalStore.animalSpeciesData[animalTypeForm]);
      isUpdating
        ? setSpecies(animal[animalTypeForm + "Species"])
        : setSpecies(animalSpecies[0]);
    }

    const isAnimalSpeciesLoading =
      RootStore.animalStore.animalSpeciesState === "pending";

    const checkForm = () => {
      if (animal.name !== null) {
        if (animal[animalTypeForm + "Species"] !== null) {
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
          RootStore.tankStore.tankList[0].id,
          animal,
          isUpdating
        );

        if (response != null) {
          setInfoMessage("L'animal a bien été enregistré !");
          setLoading(false);
          navigation.navigate("handlePopulation");
        } else {
          setInfoMessage("Un problème est survenu");
        }
      } else {
        setInfoMessage(
          "Votre formulaire est incorrect, merci de le vérifier !"
        );
      }
      RootStore.animalStore.fetchAnimals();

      setLoading(false);
    };

    const setDate = date => {
      setDatePickerVisible(false);

      setAnimal({
        ...animal,
        incomingDate: date
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
                animal !== null
                  ? Moment(animal.incomingDate)
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
                animal !== null
                  ? new Date(Moment(animal.incomingDate).toString())
                  : new Date()
              }
              locale="fr-FR"
              mode="date"
              display="calendar"
              onConfirm={setDate}
              onCancel={() => setDatePickerVisible(false)}
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
                  selectedValue={speciesInPicker}
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
                  isUpdating && animal.name !== null ? animal.name : null
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
                  isUpdating && animal.quantity !== null
                    ? animal.quantity.toString()
                    : "1"
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
                  isUpdating && animal.notes !== null ? animal.notes : null
                }
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <ReefButton title="Enregistrer" onPress={() => submitAnimal()} />
            <ReefButton
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
