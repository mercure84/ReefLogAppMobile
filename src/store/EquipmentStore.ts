import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { Equipment } from "../services/equipmentService";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";

class EquipmentStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable equipments: Equipment[] = [];
  @observable equipmentState = "pending";

  @computed get equipmentsData() {
    return toJS(this.equipments);
  }

  @action
  async fetchEquipments(): Promise<Equipment[]> {
    this.equipmentState = "pending";
    if (this.RootStore.tankStore.tankState === "done") {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId !== null) {
        try {
          console.log("Store is fetching  Equipments");
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getEquipmentList/" + tankId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken,
            },
          });
          const equipments: Promise<Equipment[]> = response.json();

          runInAction(async () => {
            console.log("equipments Success");
            this.equipments = await equipments;
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

  @action
  async storeDeleteEquipment(id: number | string) {
    this.equipmentState = "pending";
    try {
      console.log("Store is deleting the equipment n° " + id);
      const memberToken = this.RootStore.memberStore.token;
      await deleteItem(id, "equipment", memberToken);
      runInAction(() => {
        this.equipmentState = "done";
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default EquipmentStore;
