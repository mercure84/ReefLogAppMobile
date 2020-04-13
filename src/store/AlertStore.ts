import { getAlerts } from "./../services/alertsService";
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { Alert } from "../services/alertsService";

class AlertStore {
  RootStore: RootStoreType;
  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable alerts: Alert[] = [];
  @observable alertState = "pending";

  @computed get alertsData() {
    return toJS(this.alerts).sort((a, b) =>
      a.typeTest > b.typeTest ? 1 : b.typeTest > a.typeTest ? -1 : 0
    );
  }

  @action
  async fetchAlerts(): Promise<Alert[]> {
    this.alertState = "pending";
    try {
      console.log("Store is fetching Alerts");
      const memberToken = this.RootStore.memberStore.token;
      const tankId = this.RootStore.tankStore.tankList[0].id;
      const alerts = await getAlerts(tankId, memberToken);
      runInAction(() => {
        console.log("alerts success");
        this.alerts = alerts;
        this.alertState = "done";
      });
      return alerts;
    } catch (error) {
      console.log(error);
      this.alertState = "error";
    }
  }
}

export default AlertStore;
