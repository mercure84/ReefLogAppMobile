import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";

// ajout d'un aquarium
export const addNewReefTank = async (
  newMemberId: number,
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
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
