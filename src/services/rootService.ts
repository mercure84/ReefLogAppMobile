import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Animal } from "../store/AnimalStore";
import { Equipment } from "../store/EquipmentStore";
import RootStore from "../store/RootStore";
import { WaterTest } from "../store/WaterTestStore";
import { urlServer } from "./../constants/constants";
import { removeData } from "./storageDevice";

const getUrlService = (item: string) => {
  switch (item) {
    case "equipment":
      return "api/deleteEquipment/";
    case "animal":
      return "api/deleteAnimal/";
    case "waterTest":
      return "api/deleteWaterTest/";
    case "event":
      return "api/deleteEvent/";
  }
};

//FONCTION QUI PERMET D'APPELER LE SERVICE DE SUPPRESSION DE ANIMAL, EQUIPMENT, WATERTEST, EVENT
export const deleteItem = async (
  pId: number | string,
  kindItem: "animal" | "watertest" | "equipment" | "event",
  token: string
): Promise<Animal | WaterTest | Equipment | Event | Error> => {
  const urlService = urlServer + getUrlService(kindItem) + pId;
  try {
    console.log("Demande de suppression de " + kindItem + " n° " + pId);
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const dataResponse = response.json();
    return dataResponse;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
};

//TO BE IMPLEMENTED : améliorer cette fonctionnalité !!!
export const logout = async () => {
  await removeData("token");
  await removeData("emailUser");

  const hasGoogle = await GoogleSignin.isSignedIn();
  if (hasGoogle) {
    console.log("Google is logging out !");
    GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }
  RootStore.clear();
};
