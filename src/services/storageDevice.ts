import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("[AsyncStorage] Erreur dans le getData : " + error);
  }
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("[AsyncStorage] Erreur dans le storeData : " + error);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("[AsyncStorage] Erreur dans le removeData " + error);
  }
};
