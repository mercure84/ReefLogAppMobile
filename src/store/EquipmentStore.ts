import { getEquipments } from "./../services/equipmentService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { Equipment } from "../services/equipmentService";

class EquipmentStore {
  rootStore: RootStoreType;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable equipments: Equipment[] = [];
  @observable equipmentState = "pending";

  @computed get animalsData() {
    return toJS(this.equipments);
  }

  @action
  async fetchEquipments(): Promise<Equipment[]> {
    this.equipmentState = "pending";
    if (this.rootStore.tankStore.tankState === "done") {
      const tankId = this.rootStore.tankStore.tankList[0].id;
      if (tankId !== null) {
        try {
          console.log("Store is fetching  Animals");
          const memberToken = this.rootStore.memberStore.token;
          const equipments = await getEquipments(tankId, memberToken);
          runInAction(() => {
            console.log("animals Success");
            this.equipments = equipments;
            this.equipmentState = "done";
          });
          return equipments;
        } catch (error) {
          console.log(error);
          this.equipmentState = "error";
        }
      }
    }
  }
}

export default EquipmentStore;
