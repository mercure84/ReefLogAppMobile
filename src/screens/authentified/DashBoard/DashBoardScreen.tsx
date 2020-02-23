import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Header, Button, Text } from 'react-native-elements';
import { CustomMessage } from '../../../components/CustomText'
import { NewTankForm } from './components/TankForm';




const DashboardScreen = () => {

  const [isNewTankFormVisible, setNewTankFormVisible] = useState(false);

  return (
    <View style={styles.page}>
      <Header centerComponent={<Text h4>Bienvenu cher X X </Text>} />
      <CustomMessage display={true} message="Vous n'avez aucun aquarium" />
      <Button title="Créer un Aquarium" onPress={() => setNewTankFormVisible(true)} />
      {isNewTankFormVisible && <NewTankForm />}


    </View>
  );

};


type Style = {

  page: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  page: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default DashboardScreen;
