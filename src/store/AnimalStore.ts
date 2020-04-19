import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";
import { Tank } from "./TankStore";

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

export enum AnimalType {
  star = "Etoile",
  crustacean = "Crustacé",
  anemone = "Anémone",
  cucumber = "Concombre",
  fish = "Poisson",
  sps = "SPS",
  urchin = "Oursin",
  mollusk = "Mollusque",
  lps = "LPS",
  soft = "Corail Mou",
}

class AnimalStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  //TODO : fixer les any ic

  @observable animals: Animal[];
  @observable animalState = "pending";
  @observable animalSpecies: AnimalSpecies;
  @observable animalSpeciesState = "pending";

  @computed get animalsData() {
    return toJS(this.animals);
  }

  @computed get animalSpeciesData() {
    return toJS(this.animalSpecies);
  }

  @action
  async fetchAnimals(): Promise<Animal[]> {
    this.animalState = "pending";
    if (this.RootStore.tankStore.tankState === "done") {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId !== null) {
        try {
          console.log("Store is fetching  Animals");
          const token = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getAnimals/" + tankId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
          const animals: Promise<Animal[]> = response.json();
          this.animalState = "done";
          this.animals = await animals;
          return animals;
        } catch (error) {
          console.log(error);
          this.animalState = "error";
        }
      }
    }
  }

  @action
  async fetchAnimalSpecies(): Promise<AnimalSpecies> {
    this.animalSpeciesState = "pending";
    try {
      console.log("Store is fetching Animals SPECIES");
      const urlService = urlServer + "api/getAnimalSpecies";
      const response = await fetch(urlService, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const animalSpecies: Promise<AnimalSpecies> = response.json();
      runInAction(async () => {
        console.log("animalsSpecies success");
        this.animalSpecies = await animalSpecies;
        this.animalSpeciesState = "done";
      });
      return animalSpecies;
    } catch (error) {
      console.log(error);
      this.animalSpeciesState = "error";
    }
  }

  @action
  async storeDeleteAnimal(id: number | string) {
    this.animalState = "pending";
    try {
      console.log("Store is deleting the equipment n° " + id);
      const memberToken = this.RootStore.memberStore.token;
      await deleteItem(id, "animal", memberToken);
      runInAction(() => {
        this.animalState = "done";
      });
    } catch (error) {
      console.log(error);
    }
  }

  @action
  saveAnimal = async (newAnimal: Animal, update: boolean) => {
    const suffixUrl = update ? "api/updateAnimal" : "api/addAnimal";
    newAnimal.aquarium = null;
    const urlService = urlServer + suffixUrl;

    const newAnimalForm = {
      aquariumId: this.RootStore.tankStore.tankList[0].id,
      anemone: newAnimal.anemoneSpecies !== undefined ? newAnimal : null,
      soft: newAnimal.softSpecies !== undefined ? newAnimal : null,
      sps: newAnimal.spsSpecies !== undefined ? newAnimal : null,
      lps: newAnimal.lpsSpecies !== undefined ? newAnimal : null,
      fish: newAnimal.fishSpecies !== undefined ? newAnimal : null,
      urchin: newAnimal.urchinSpecies !== undefined ? newAnimal : null,
      star: newAnimal.starSpecies !== undefined ? newAnimal : null,
      mollusk: newAnimal.molluskSpecies !== undefined ? newAnimal : null,
      crustacean: newAnimal.crustaceanSpecies !== undefined ? newAnimal : null,
      cucumber: newAnimal.cucumberSpecies !== undefined ? newAnimal : null,
    };

    try {
      const memberToken = this.RootStore.memberStore.token;
      const response = await fetch(urlService, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: memberToken,
        },
        body: JSON.stringify(newAnimalForm),
      });
      const dataResponse = response.json;
      console.log("Nouvel animal saved");
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };
}

export default AnimalStore;
