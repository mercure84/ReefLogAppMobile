import React from "react";
import { FlatList, Text, View } from "react-native";
import { Animal } from "../../../../services/animalService";
import { AnimalItem } from "./AnimalItem";

type Props = {
  elements: Animal[];
};

export const ElementList = ({ elements }: Props) => {
  console.log("WTLIst = " + elements.toString());

  return (
    <View>
      <FlatList
        style={{ marginBottom: 64 }}
        data={elements}
        renderItem={({ item }) => <AnimalItem animal={item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>Aucun enregistrement</Text>}
        scrollEnabled={true}
      />
    </View>
  );
};
