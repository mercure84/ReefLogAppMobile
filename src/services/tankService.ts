import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";
import { Member } from "./memberService";

// typage aquarium
export interface Tank {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  startDate?: any;
  member?: Member;
  sumpVolume: number;
  typeOfMaintenance: string;
  mainPopulation: string;
  ballingDescription?: any;
  liveRocksWeigth?: number;
  othersRocksWeight?: number;
  rawVolume?: number;
}

// ajout d'un aquarium
export const addNewReefTank = async (newMemberId: string, newTank: Tank) => {
  const urlService = urlServer + "api/addNewReefAquarium";
  const newReefTank = {
    memberId: newMemberId,
    reefAquarium: newTank
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
      body: JSON.stringify(newReefTank)
    });
    const dataResponse = response.json();
    console.log("Aquarium registered");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

// récupérer la liste des aquariums d'un membre

export const getTankList = async (
  pMemberId: string,
  token: string
): Promise<Tank[] | any> => {
  const urlService = urlServer + "api/getAquariumList/" + pMemberId;

  try {
    console.log("Service is fetching tankList for member n° " + pMemberId);
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
