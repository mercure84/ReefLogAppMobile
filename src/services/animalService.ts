import { urlServer } from "../constants/constants";
import { Tank } from "./tankService";
import { getData } from "./storageDevice";

export interface Animal {
  id: number;
  quantity: number;
  name: string;
  incomingDate: string;
  exitDate?: any;
  birthDay?: any;
  deathDay?: any;
  notes: string;
  currentSize: string;
  aquarium: Tank;
  sex?: string;
  anemoneSpecies?: string;
  softSpecies?: string;
  spsSpecies?: string;
  lpsSpecies?: string;
  fishSpecies?: string;
  urchinSpecies?: string;
  starSpecies?: string;
  molluskSpecies?: string;
  crustaceanSpecies?: string;
  cucumberSpecies?: string;
}

export interface AnimalSpecies {
  star?: string[];
  crustacean?: string[];
  anemone?: string[];
  cucumber?: string[];
  fish?: string[];
  sps?: string[];
  urchin?: string[];
  mollusk?: string[];
  lps?: string[];
  soft?: string[];
}

export const saveAnimal = async (
  pAquariumId: string,
  newAnimal: Animal,
  update: boolean
) => {
  const suffixUrl = update ? "api/updateAnimal" : "api/addAnimal";
  newAnimal.aquarium = null;
  const urlService = urlServer + suffixUrl;
  const newAnimalForm = {
    aquariumId: pAquariumId,
    anemone: newAnimal.anemoneSpecies !== null ? newAnimal : null,
    soft: newAnimal.softSpecies !== null ? newAnimal : null,
    sps: newAnimal.spsSpecies !== null ? newAnimal : null,
    lps: newAnimal.lpsSpecies !== null ? newAnimal : null,
    fish: newAnimal.fishSpecies !== null ? newAnimal : null,
    uchin: newAnimal.urchinSpecies !== null ? newAnimal : null,
    star: newAnimal.starSpecies !== null ? newAnimal : null,
    mollusk: newAnimal.molluskSpecies !== null ? newAnimal : null,
    crustacean: newAnimal.crustaceanSpecies !== null ? newAnimal : null,
    cucumber: newAnimal.cucumberSpecies !== null ? newAnimal : null
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
      body: JSON.stringify(newAnimalForm)
    });
    const dataResponse = response.json;
    console.log("Nouvel animal saved");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getAnimals = async (
  pTankId: string,
  token: string
): Promise<Animal[] | any> => {
  const urlService = urlServer + "api/getAnimals/" + pTankId;
  try {
    console.log("Service is fetching Animals for tank n° " + pTankId);
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    const dataResponse = response.json();
    console.log("animals fetchés = " + dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getAnimalSpecies = async (
  animalKind?: string
): Promise<AnimalSpecies | any> => {
  const urlService = urlServer + "api/getAnimalSpecies/" + animalKind;
  try {
    console.log("Service is fetching AnimalsSpecies for " + animalKind);

    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const dataResponse = response.json();
    console.log("animalsSpecies fetchés = " + dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
