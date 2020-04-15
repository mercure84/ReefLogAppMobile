import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";
import { Alert } from "../services/alertsService";
import { urlServer } from "../constants/constants";

class AlertStore {
  RootStore: RootStoreType;
  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable alerts: Alert[] = [];
  @observable alertState = "pending";

  //alerte positive = une alerte qui indique qu'un test est en retard
  @observable positiveAlerts: Alert[] = [];
  @observable positiveAlertsState = "pending";

  @computed get alertsData() {
    return toJS(this.alerts).sort((a, b) =>
      a.typeTest > b.typeTest ? 1 : b.typeTest > a.typeTest ? -1 : 0
    );
  }

  @computed get positiveAlertsData() {
    return toJS(this.positiveAlerts).sort((a, b) =>
      a.typeTest > b.typeTest ? 1 : b.typeTest > a.typeTest ? -1 : 0
    );
  }

  @action
  async fetchAlerts(): Promise<Alert[]> {
    if (
      this.RootStore.tankStore.tankState === "done" &&
      this.RootStore.tankStore.tankList.length > 0
    ) {
      this.alertState = "pending";
      try {
        console.log("Store is fetching Alerts");
        const memberToken = this.RootStore.memberStore.token;
        const tankId = this.RootStore.tankStore.tankList[0].id;
        const urlService = urlServer + "api/getAlerts/" + tankId;

        const response = await fetch(urlService, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: memberToken,
          },
        });
        const alerts: Promise<Alert[]> = response.json();
        runInAction(async () => {
          console.log("alerts success");
          this.alerts = await alerts;
          this.alertState = "done";
        });
        return alerts;
      } catch (error) {
        console.log(error);
        this.alertState = "error";
      }
    }
  }

  @action
  async fetchPositiveAlerts(): Promise<Alert[]> {
    if (
      this.RootStore.tankStore.tankState === "done" &&
      this.RootStore.tankStore.tankList.length > 0
    ) {
      this.positiveAlertsState = "pending";
      try {
        console.log("Store is fetching positive Alerts");
        const memberToken = this.RootStore.memberStore.token;
        const tankId = this.RootStore.tankStore.tankList[0].id;
        const urlService = urlServer + "api/showAlerts/" + tankId;
        const response = await fetch(urlService, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: memberToken,
          },
        });

        const positiveAlerts: Promise<Alert[]> = response.json();
        runInAction(async () => {
          console.log("alerts success");
          this.positiveAlerts = await positiveAlerts;
          this.positiveAlertsState = "done";
        });
        return positiveAlerts;
      } catch (error) {
        console.log(error);
        this.positiveAlertsState = "error";
      }
    }
  }
}

export default AlertStore;
