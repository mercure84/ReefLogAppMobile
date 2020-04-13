import { WaterTest, getWaterTestList } from "../services/waterTestService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";

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
          const waterTestList = await getWaterTestList(tankId, memberToken);
          runInAction(() => {
            console.log("waterTestList Success");
            this.waterTestList = waterTestList;
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
      runInAction(() => {
        this.waterTestState = "done";
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default WaterTestStore;
