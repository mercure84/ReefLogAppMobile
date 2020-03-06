import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";
import { Member } from "./memberServices";

// typage aquarium
export interface Tank {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  startDate?: any;
  equipmentList: any[];
  member: Member;
  sumpVolume: number;
  typeOfMaintenance: string;
  mainPopulation: string;
  ballingDescription?: any;
  liveRocksWeigth: number;
  othersRocksWeight: number;
  rawVolume: number;
}

// ajout d'un aquarium
export const addNewReefTank = async (
  newMemberId: string,
  newName: string,
  newLength: string,
  newWidth: string,
  newHeight: string,
  newMaintenance: string,
  newSumpVolume: any,
  newPopulation: string,
  newStartDate: string | Date
) => {
  const urlService = urlServer + "api/addNewReefAquarium";
  const newReefTank = {
    memberId: newMemberId,
    name: newName,
    height: newHeight,
    width: newWidth,
    length: newLength,
    sumpVolume: newSumpVolume,
    typeOfMaintenance: newMaintenance,
    mainPopulation: newPopulation,
    startDate: newStartDate
  };
  console.log("la date s'affiche comme ça " + newStartDate);
  try {
    const token = await getData("token");
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(newReefTank)
    });
    const dataResponse = response.json();
    console.log("Aquarium registered");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

// récupérer la lister des aquariums d'un membre

export const getTankList = async (
  pMemberId: string,
  token: string
): Promise<Tank[] | any> => {
  const urlService = urlServer + "api/getAquariumList/" + pMemberId;

  try {
    console.log("On demande la liste des aquariums de membre n° " + pMemberId);

    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const dataResponse = response.json();
    console.log("Requête getTankList OK");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
