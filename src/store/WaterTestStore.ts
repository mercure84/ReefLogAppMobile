import { WaterTest } from "../services/waterTestService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";

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
}

export default WaterTestStore;
