import { urlServer } from "./../constants/constants";
import { getData } from "./storageDevice";
import { Member } from "./memberService";

// typage aquarium
export interface Tank {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  startDate: Date;
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
export const saveReefTank = async (
  newMemberId: string,
  newTank: Tank,
  update: boolean
) => {
  const urlService = update
    ? urlServer + "api/updateReefAquarium"
    : urlServer + "api/addNewReefAquarium";
  const newReefTank = {
    memberId: newMemberId,
    reefAquarium: newTank,
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
      body: JSON.stringify(newReefTank),
    });
    const dataResponse = response.json();
    console.log("Aquarium registered");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
