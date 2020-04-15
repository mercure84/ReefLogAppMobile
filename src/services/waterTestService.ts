import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";
import { Tank } from "./tankService";

export interface WaterTest {
  id?: string;
  date?: Date;
  temperature?: number;
  salinity?: number;
  alcalinity?: number;
  ph?: number;
  calcium?: number;
  magnesium?: number;
  ammoniac?: number;
  nitrates?: number;
  nitrites?: number;
  phosphates?: number;
  silicates?: number;
  aquarium?: Tank;
}

// ajout d'un nouveau test
export const saveWaterTest = async (
  pAquariumId: string,
  newWaterTest: WaterTest,
  update: boolean
) => {
  const suffixUrl = update ? "api/updateWaterTest" : "api/addNewWaterTest";
  //purge du champ de l'aquarium si on est dans le cas d'un update
  newWaterTest.aquarium = null;
  const urlService = urlServer + suffixUrl;
  const newWaterTestForm = {
    aquariumId: pAquariumId,
    waterTest: newWaterTest,
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
      body: JSON.stringify(newWaterTestForm),
    });
    const dataResponse = response.json();
    console.log("Tests enregistrés");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
