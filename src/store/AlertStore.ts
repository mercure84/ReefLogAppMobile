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
  TEMPERATURE,
  SALINITY,
  ALCALINITY,
  PH,
  CALCIUM,
  MAGNESIUM,
  AMMONIAC,
  NITRATES,
  NITRITES,
  PHOSPHATES,
  SILICATES,
}

class AlertStore {
  RootStore: RootStoreType;
  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable alerts: Alert[] = [];
  @observable fetchState: WebServiceState = "pending";
  @observable updateState: WebServiceState = "done";

  //notifications = une alerte qui indique qu'un test est en retard
  @observable notifications: Alert[] = [];
  @observable notificationsFetchState = "pending";

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
    this.fetchState = "starting";
    if (this.RootStore.tankStore.fetchState === "done") {
      try {
        console.log("Store is fetching Alerts");
        const memberToken = this.RootStore.memberStore.token;
        const tankId = this.RootStore.tankStore.tankList[0]?.id;
        const urlService = urlServer + "api/getAlerts/" + tankId;
        const response = await fetch(urlService, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: memberToken ?? "",
          },
        });
        const alerts: Promise<Alert[]> = response.json();
        runInAction(async () => {
          this.alerts = await alerts;
        });
        console.log("Alerts has been fetched successful");
        this.fetchState = "done";
        return alerts;
      } catch (error) {
        console.log(error);
        this.fetchState = "error";
      }
    }
    return [];
  }

  @action
  async fetchNotifications(): Promise<Alert[]> {
    if (
      this.RootStore.tankStore.fetchState === "done" &&
      this.notificationsFetchState !== "starting"
    ) {
      this.notificationsFetchState = "starting";
      try {
        console.log("Store is fetching Notifications");
        const memberToken = this.RootStore.memberStore.token;
        const tankId = this.RootStore.tankStore?.tankList[0]?.id;
        console.log("Tank id = ", tankId);
        if (!tankId) {
          console.log("Not tank ==> return empty notifications");
          return [];
        }
        const urlService = urlServer + "api/showAlerts/" + tankId;
        const response = await fetch(urlService, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: memberToken ?? "",
          },
        });
        const notifications: Promise<Alert[]> = response.json();
        console.log("notifications success");
        this.notifications = await notifications;
        this.notificationsFetchState = "done";
        return notifications;
      } catch (error) {
        console.log(error);
        this.notificationsFetchState = "error";
      }
    }
    return [];
  }

  @action
  saveAlerts = async (alerts: Alert[]) => {
    this.updateState = "pending";
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
          Authorization: memberToken ?? "",
        },
        body: JSON.stringify(alertsForm),
      });
      const dataResponse = response.json();
      console.log("Alertes enregistrées");
      this.refresh();
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };

  @action
  refresh = () => {
    this.alerts = [];
    this.updateState = "done";
    this.fetchState = "pending";
    this.notificationsFetchState = "pending";
  };
}

export default AlertStore;
