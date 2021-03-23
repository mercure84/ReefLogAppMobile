import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";
import { Tank } from "./TankStore";

export interface WaterTest {
  id: string;
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

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable waterTestList: WaterTest[] = [];
  @observable fetchState: WebServiceState = "pending";
  @observable updateState: WebServiceState = "done";

  @computed get waterTestListData() {
    return toJS(this.waterTestList);
  }

  @action
  async fetchWaterTests(): Promise<WaterTest[]> {
    this.fetchState = "starting";
    if (this.RootStore.tankStore.tankList.length > 0) {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId) {
        try {
          console.log("Store is fetching  WaterTestList for Tank n°  ", tankId);
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getWaterTestList/" + tankId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken ?? "",
            },
          });
          const waterTestList: Promise<WaterTest[]> = response.json();
          runInAction(async () => {
            this.waterTestList = await waterTestList;
          });
          this.fetchState = "done";
          console.log("waterTestList Success");
          this.RootStore.alertStore.notificationsFetchState = "pending";
          return waterTestList;
        } catch (error) {
          console.log(error);
          this.fetchState = "error";
          return [];
        }
      }
    }
    return [];
  }

  @action
  async storeDeleteWaterTest(id: string) {
    try {
      this.updateState = "pending";
      console.log("Store is deleting the waterTest n° " + id);
      const memberToken = this.RootStore.memberStore.token ?? "";
      await deleteItem(id, "waterTest", memberToken);
      this.refresh();
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  }

  @action
  saveWaterTest = async (newWaterTest: WaterTest, update: boolean) => {
    this.updateState = "pending";
    const suffixUrl = update ? "api/updateWaterTest" : "api/addNewWaterTest";
    newWaterTest.aquarium = undefined;
    console.log("Store is starting to save a WaterTest");
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
          Authorization: memberToken ?? "",
        },
        body: JSON.stringify(newWaterTestForm),
      });
      const dataResponse = response.json();
      console.log("Tests enregistrés");
      this.refresh();
      return dataResponse;
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  };

  @action
  refresh = () => {
    this.waterTestList = [];
    this.updateState = "done";
    this.fetchState = "pending";
  };
}

export default WaterTestStore;
