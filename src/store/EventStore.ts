import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { observable, computed, toJS, action, runInAction } from "mobx";
import { urlServer } from "./../constants/constants";
import { deleteItem } from "../services/rootService";
import { Tank } from "./TankStore";

export interface Event {
  id: string;
  date?: Date;
  title?: string;
  description?: string;
  aquarium?: Tank;
}

class EventStore {
  RootStore: RootStoreType;

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable events: Event[] = [];
  @observable fetchState: WebServiceState = "pending";
  @observable updateState: WebServiceState = "done";

  @computed get eventsData() {
    return toJS(this.events);
  }

  @action
  async fetchEvents(): Promise<Event[]> {
    this.fetchState = "starting";
    if (this.RootStore.tankStore.fetchState === "done") {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId) {
        try {
          console.log("Store is fetching  Events for tank n° " + tankId);
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getEventList/" + tankId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken ?? "",
            },
          });
          const events: Promise<Event[]> = response.json();
          runInAction(async () => {
            this.events = await events;
          });
          console.log("Events Success");
          this.fetchState = "done";
          return events;
        } catch (error) {
          console.log(error);
          this.fetchState = "error";
        }
      }
    }
  }

  @action
  async storeDeleteEvent(id: string) {
    try {
      this.updateState = "pending";
      console.log("Store is deleting the event n° " + id);
      const memberToken = this.RootStore.memberStore.token ?? "";
      await deleteItem(id, "event", memberToken);
      runInAction(() => {
        this.fetchState = "done";
      });
      this.refresh();
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  }

  @action
  saveEvent = async (newEvent: Event, update: boolean) => {
    this.updateState = "pending";
    const suffixUrl = update ? "api/updateEvent" : "api/addEvent";
    newEvent.aquarium = undefined;
    console.log("Store is starting to save an Event");
    const urlService = urlServer + suffixUrl;
    const newEventForm = {
      aquariumId: this.RootStore.tankStore.tankList[0].id,
      event: newEvent,
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
        body: JSON.stringify(newEventForm),
      });
      const dataResponse = response.json;
      console.log("Nouvel évènement saved");
      this.refresh();
      return dataResponse;
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  };

  @action
  refresh = () => {
    this.events = [];
    this.updateState = "done";
    this.fetchState = "pending";
  };
}

export default EventStore;
