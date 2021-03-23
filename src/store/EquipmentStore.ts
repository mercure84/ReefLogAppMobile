import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { deleteItem } from "../services/rootService";
import { urlServer } from "../constants/constants";
import { Tank } from "./TankStore";

export interface Equipment {
  dateInstallation?: Date;
  id?: number;
  typeOfEquipment: string;
  mark?: string;
  model?: string;
  description?: string;
  power?: number;
  quantity?: number;
  aquarium?: Tank;
}
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
    if (this.RootStore.tankStore.updateState === "done") {
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
          this.equipmentState = "done";
          this.equipments = await equipments;
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

  @action
  saveEquipment = async (newEquipment: Equipment, update: boolean) => {
    const suffixUrl = update ? "api/updateEquipment" : "api/addEquipment";
    newEquipment.aquarium = null;
    const urlService = urlServer + suffixUrl;
    const newEquipmentForm = {
      aquariumId: this.RootStore.tankStore.tankList[0].id,
      equipment: newEquipment,
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
        body: JSON.stringify(newEquipmentForm),
      });
      const dataResponse = response.json;
      console.log("Nouvel équipement saved");
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };
}

export default EquipmentStore;
