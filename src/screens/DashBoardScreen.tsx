import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Votre Tableau de Bord</Text>

        <Text>Mon aquarium</Text>
        <Text>Mes derniers tests</Text>
        <Text>Mes évènements</Text>
        <TouchableOpacity></TouchableOpacity>
        <Button title="Un bouton" onPress={null} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
