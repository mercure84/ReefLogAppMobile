import AsyncStorage from '@react-native-community/async-storage';

export const getData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Nous avons une données : ' + value);
    }
    return value
  } catch (error) {
    console.log('Erreur dans le getData du store : ' + error);
  }
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Erreur dans le storeData : ' + error);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Erreur dans le removeData ' + error);
  }
};
