import { Animal, AnimalSpecies } from "./../services/animalService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";

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
          runInAction(async () => {
            console.log("animals Success");
            this.animals = await animals;
            this.animalState = "done";
          });
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
}

export default AnimalStore;
