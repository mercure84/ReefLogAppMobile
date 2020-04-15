import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";
import { Tank } from "../services/tankService";

export interface WaterTest {
  id?: string;
  date?: Date;
  temperature?: number;
  salinity?: number;
  alcalinity?: number;
  ph?: number;
  calcium?: number;
  magnesium?: number;
  ammoniac?: number;
  nitrates?: number;
  nitrites?: number;
  phosphates?: number;
  silicates?: number;
  aquarium?: Tank;
}
class WaterTestStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable waterTestList: WaterTest[] = [];
  @observable waterTestState = "pending";

  @computed get waterTestListData() {
    return toJS(this.waterTestList);
  }

  @action
  async fetchWaterTestList(): Promise<WaterTest[]> {
    this.waterTestState = "pending";
    if (
      this.RootStore.tankStore.tankState === "done" &&
      this.RootStore.tankStore.tankList.length > 0
    ) {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId !== null) {
        try {
          console.log("Store is fetching  WaterTestList");
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getWaterTestList/" + tankId;

          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken,
            },
          });

          const waterTestList: Promise<WaterTest[]> = response.json();
          runInAction(async () => {
            console.log("waterTestList Success");
            this.waterTestList = await waterTestList;
            this.waterTestState = "done";
          });
          return waterTestList;
        } catch (error) {
          console.log(error);
          this.waterTestState = "error";
        }
      }
    } else {
      // pas d'aquariums ?
      return null;
    }
  }

  @action
  async storeDeleteWaterTest(id: string) {
    this.waterTestState = "pending";
    try {
      console.log("Store is deleting the waterTest n° " + id);
      const memberToken = this.RootStore.memberStore.token;
      await deleteItem(id, "waterTest", memberToken);
      this.fetchWaterTestList();
    } catch (error) {
      console.log(error);
    }
  }

  @action
  saveWaterTest = async (newWaterTest: WaterTest, update: boolean) => {
    const suffixUrl = update ? "api/updateWaterTest" : "api/addNewWaterTest";
    //purge du champ de l'aquarium si on est dans le cas d'un update
    newWaterTest.aquarium = null;
    const urlService = urlServer + suffixUrl;
    const newWaterTestForm = {
      aquariumId: this.RootStore.tankStore.tankList[0].id,
      waterTest: newWaterTest,
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
        body: JSON.stringify(newWaterTestForm),
      });
      const dataResponse = response.json();
      console.log("Tests enregistrés");
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };
}

export default WaterTestStore;
