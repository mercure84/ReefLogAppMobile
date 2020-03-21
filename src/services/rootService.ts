import { urlServer } from "./../constants/constants";
import { getData } from "./storageDevice";

const getUrlService = (item: string) => {
  switch (item) {
    case "equipment":
      return "api/deleteEquipment/";
    case "animal":
      return "api/deleteAnimal/";
    case "waterTest":
      return "api/deleteWaterTest/";
  }
};

//FONCTION QUI PERMET D'APPELER LE SERVICE DE SUPPRESSION DES ANIMAL, EQUIPMENT, WATERTESTS
export const deleteItem = async (
  pId: number,
  kindItem: string,
  token: string
) => {
  const urlService = urlServer + getUrlService(kindItem) + pId;
  try {
    console.log("Demande de suppression de l'équipement n° " + pId);
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const dataResponse = response.json();
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
