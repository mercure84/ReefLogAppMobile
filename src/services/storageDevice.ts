import AsyncStorage from "@react-native-community/async-storage";

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Erreur dans le getData du store : " + error);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Erreur dans le storeData : " + error);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Erreur dans le removeData " + error);
  }
};
