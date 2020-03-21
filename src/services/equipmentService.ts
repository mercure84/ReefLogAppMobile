import { urlServer } from "./../constants/constants";
import { Tank } from "./tankService";
import { getData } from "./storageDevice";
import EquipmentStore from "src/store/EquipmentStore";

export interface Equipment {
  dateInstallation?: Date;
  id?: number;
  typeOfEquipment: string;
  mark?: string;
  model?: string;
  description?: string;
  power?: number;
  quantity?: number;
  aquarium?: Tank;
}

export const saveEquipment = async (
  pAquariumId: string,
  newEquipment: Equipment,
  update: boolean
) => {
  const suffixUrl = update ? "api/updateEquipment" : "api/addEquipment";
  newEquipment.aquarium = null;
  const urlService = urlServer + suffixUrl;
  const newEquipmentForm = {
    aquariumId: pAquariumId,
    equipment: newEquipment
  };
  try {
    const token = await getData("token");

    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(newEquipmentForm)
    });
    const dataResponse = response.json;
    console.log("Nouvel équipement saved");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getEquipments = async (
  pTankId: string,
  token: string
): Promise<Equipment[] | any> => {
  const urlService = urlServer + "api/getEquipmentList/" + pTankId;
  try {
    console.log("Service is fetching Equipments for tank n° " + pTankId);
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const dataResponse = response.json();
    console.log("equipments fetchés = " + dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEquipment = async (pId: number, token: string) => {
  const urlService = urlServer + "api/deleteEquipment/" + pId;
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
