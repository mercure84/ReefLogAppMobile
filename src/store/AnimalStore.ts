import {
  getAnimals,
  Animal,
  AnimalSpecies,
  getAnimalSpecies
} from "./../services/animalService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";

class AnimalStore {
  rootStore: RootStoreType;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable animals: Animal[] = [];
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
    if (this.rootStore.tankStore.tankState === "done") {
      const tankId = this.rootStore.tankStore.tankList[0].id;
      if (tankId !== null) {
        try {
          console.log("Store is fetching  Animals");
          const memberToken = this.rootStore.memberStore.token;
          const animals = await getAnimals(tankId, memberToken);
          runInAction(() => {
            console.log("animals Success");
            this.animals = animals;
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
      const animalSpecies = await getAnimalSpecies();
      runInAction(() => {
        console.log("animalsSpecies success");
        this.animalSpecies = animalSpecies;
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
      const memberToken = this.rootStore.memberStore.token;
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
