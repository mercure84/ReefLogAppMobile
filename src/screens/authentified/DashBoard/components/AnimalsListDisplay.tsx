import React from "react";
import { FlatList, Text, View } from "react-native";
import { Animal } from "../../../../services/animalService";
import { AnimalItem } from "./AnimalItem";

type Props = {
  animals: Animal[];
};

export const AnimalsListDisplay = ({ animals }: Props) => {
  console.log("WTLIst = " + animals.toString());

  return (
    <View>
      <FlatList
        style={{ marginBottom: 64 }}
        data={animals}
        renderItem={({ item }) => <AnimalItem animal={item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>Aucun animal n'est enregistré :(</Text>}
        scrollEnabled={true}
      />
    </View>
  );
};
