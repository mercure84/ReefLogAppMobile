import {
  getAnimals,
  Animal,
  AnimalSpecies,
  getAnimalSpecies
} from "./../services/animalService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";

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
}

export default AnimalStore;
