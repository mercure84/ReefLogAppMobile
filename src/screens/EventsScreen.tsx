import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

const EventsScreen = () => (
  <View style={style.container}>
    <Text>Mes évènements</Text>
    <TouchableOpacity>
      <Text>Liste à définir</Text>
    </TouchableOpacity>
    <Button title="Ajouter un évènement" onPress={null} />
    <Button title="Ajouter un test de mon eau" onPress={null} />
  </View>
);



const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EventsScreen;
