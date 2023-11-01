import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ReefButton} from '../../../../components/ReefButton';
import {Fish} from '../../../../store/FishStore';
import RootStore from '../../../../store/RootStore';

export const Fishes = () => {
  const navigation = useNavigation();
  const {fishStore} = RootStore;
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    const getFishes = async () => {
      if (fishStore.updateState === 'done') {
        setFishes(fishStore.fishesData);
      }
      if (fishStore.fetchState === 'pending') {
        await fishStore.fetchFishes();
      }
    };
    getFishes();
  }, [fishStore.fetchState]);

  return (
    <>
      {/*       <View style={styles.buttonContainer}>
        <ReefButton
          size="medium"
          title="Mes poissons"
          onPress={() => navigation.navigate('fishes')}
        />
      </View>

      <Text>{`Je maintiens ${fishes.length ?? 0} pensionnaires`}</Text> */}
    </>
  );
};

type Style = {
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  buttonContainer: {
    marginTop: 32,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
