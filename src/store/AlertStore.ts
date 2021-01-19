import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { urlServer } from "../constants/constants";

export interface Alert {
  id?: string;
  typeTest: TypeTest;
  targetValue: number;
  dayInterval: number;
  active: boolean;
}

export enum TypeTest {
  TEMPERATURE = "Température",
  SALINITY = "Salinité",
  ALCALINITY = "KH",
  PH = "pH",
  CALCIUM = "Calcium",
  MAGNESIUM = "Magnésium",
  AMMONIAC = "Ammoniac",
  NITRATES = "Nitrates",
  NITRITES = "Nitrites",
  PHOSPHATES = "Phosphates",
  SILICATES = "Silicates",
}

class AlertStore {
  RootStore: RootStoreType;
  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable alerts: Alert[] = [];
  @observable alertState: WebServiceState = "pending";

  //notifications = une alerte qui indique qu'un test est en retard
  @observable notifications: Alert[] = [];
  @observable notificationsState = "pending";

  @computed get alertsData() {
    return toJS(this.alerts).sort((a, b) =>
      a.typeTest > b.typeTest ? 1 : b.typeTest > a.typeTest ? -1 : 0
    );
  }

  @computed get notificationsData() {
    return toJS(this.notifications).sort((a, b) =>
      a.typeTest > b.typeTest ? 1 : b.typeTest > a.typeTest ? -1 : 0
    );
  }

  @action
  async fetchAlerts(): Promise<Alert[]> {
    this.alertState = "pending";
    if (
      this.RootStore.tankStore.tankState === "done" &&
      this.RootStore.tankStore.tankList.length > 0
    ) {
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

        this.alerts = await alerts;
        this.alertState = "done";

        return alerts;
      } catch (error) {
        console.log(error);
        this.alertState = "error";
      }
    }
  }

  @action
  async fetchNotifications(): Promise<Alert[]> {
    if (
      this.RootStore.tankStore.tankState === "done" &&
      this.RootStore.tankStore.tankList.length > 0
    ) {
      this.notificationsState = "pending";
      try {
        console.log("Store is fetching Notifications");
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
        this.notificationsState = "done";
        const notifications: Promise<Alert[]> = response.json();
        console.log("notifications success");
        this.notifications = await this.notifications;
        return notifications;
      } catch (error) {
        console.log(error);
        this.notificationsState = "error";
      }
    }
  }

  @action
  saveAlerts = async (alerts: Alert[]) => {
    const urlService = urlServer + "api/addAlertsCollection";
    const alertsForm = {
      aquariumId: this.RootStore.tankStore.tankList[0].id,
      alerts: alerts,
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
        body: JSON.stringify(alertsForm),
      });
      const dataResponse = response.json();
      console.log("Alerts envoyées");
      this.notificationsState = "pending";
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };
}

export default AlertStore;
