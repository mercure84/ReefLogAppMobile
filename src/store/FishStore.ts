import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { observable, computed, toJS, action, runInAction } from "mobx";
import { urlServer } from "./../constants/constants";
import { deleteItem } from "../services/rootService";
import TankStore, { Tank } from "./TankStore";

export enum SizeType {
  XS,
  S,
  M,
  L,
  XL,
}

export enum SexType {
  MALE,
  FEMALE,
  UNDEFINED,
}

export type Fish = {
  id: string;
  sex: SexType;
  incomingDate?: Date;
  exitDate?: Date;
  birthDate?: Date;
  deathDate?: Date;
  lastPresenceDate?: Date;
  name: string;
  note?: string;
  aquarium?: Tank;
  quantity?: number;
  size: SizeType;
  isPresent?: boolean;
};

class FishStore {
  RootStore: RootStoreType;

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable fishes: Fish[] = [];
  @observable fetchState: WebServiceState = "pending";
  @observable updateState: WebServiceState = "done";

  @computed get fishesData() {
    return toJS(this.fishes);
  }

  @action clear = () => {
    this.fishes = [];
    this.fetchState = "pending";
  };

  @action
  async fetchFishes(): Promise<Fish[]> {
    this.fetchState = "starting";
    if (this.RootStore.tankStore.fetchState === "done") {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId) {
        try {
          console.log("Store is fetching  Fishes for tank n° " + tankId);
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getAnimals/Fishes/" + tankId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken ?? "",
            },
          });
          const fishes: Promise<Fish[]> = response.json();
          runInAction(async () => {
            this.fishes = await fishes;
          });
          console.log("Fishes Success : ");
          this.fetchState = "done";
          return fishes;
        } catch (error) {
          console.log(error);
          this.fetchState = "error";
        }
      }
    }
    console.log("No tank loaded, no fish to load");
    this.fetchState = "pending";
    return [];
  }

  @action
  async storeDeleteFish(id: string) {
    try {
      this.updateState = "pending";
      console.log("Store is deleting the fish n° " + id);
      const memberToken = this.RootStore.memberStore.token ?? "";
      await deleteItem(id, "fish", memberToken);
      runInAction(() => {
        this.updateState = "done";
      });
      this.refresh();
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  }

  @action
  saveFish = async (newFish: Fish, update: boolean) => {
    this.updateState = "pending";
    const suffixUrl = update ? "api/updateAnimal/Fish" : "api/addAnimal/Fish";
    newFish.aquarium = undefined;
    const urlService = urlServer + suffixUrl;
    const newFishForm = {
      aquariumId: this.RootStore.tankStore.tankList[0].id,
      fish: newFish,
    };
    console.log("Store is starting to save a Fish : ", newFishForm);

    try {
      const memberToken = this.RootStore.memberStore.token;

      const response = await fetch(urlService, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: memberToken ?? "",
        },
        body: JSON.stringify(newFishForm),
      });
      const dataResponse = response.json;
      console.log("New Fish saved");
      this.refresh();
      return dataResponse;
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  };

  @action
  saveCountingFish = async (fishes: Fish[]) => {
    this.updateState = "pending";
    const suffixUrl = "api/countFishes";
    const urlService = urlServer + suffixUrl;
    let fishIds: string[] = [];
    fishes.filter((fish) => {
      if (fish.isPresent) {
        fishIds.push(fish.id);
      }
    });

    const newCountForm = {
      fishIds,
      aquariumId: this.RootStore.tankStore.tankList[0].id,
    };
    console.log("Store is starting to countFishes  : ", newCountForm);

    try {
      const memberToken = this.RootStore.memberStore.token;

      const response = await fetch(urlService, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: memberToken ?? "",
        },
        body: JSON.stringify(newCountForm),
      });
      const dataResponse = response.json;
      console.log("New Counting saved");
      this.refresh();
      return dataResponse;
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  };

  @action
  refresh = () => {
    this.fishes = [];
    this.updateState = "done";
    this.fetchState = "pending";
  };
}

export default FishStore;
