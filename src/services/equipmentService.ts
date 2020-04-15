import { urlServer } from "./../constants/constants";
import { Tank } from "./tankService";
import { getData } from "./storageDevice";

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
    equipment: newEquipment,
  };
  try {
    const token = await getData("token");

    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newEquipmentForm),
    });
    const dataResponse = response.json;
    console.log("Nouvel équipement saved");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
