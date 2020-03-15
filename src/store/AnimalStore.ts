import { getAnimals } from "./../services/animalService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { Animal } from "../services/animalService";

class AnimalStore {
  rootStore: RootStoreType;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable animals: Animal[] = [];
  @observable animalState = "pending";

  @computed get animalsData() {
    return toJS(this.animals);
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
}

export default AnimalStore;
