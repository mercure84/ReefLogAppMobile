import { RootStore as RootStoreType } from "./RootStore";
import { observable, computed, toJS, action, runInAction } from "mobx";
import { urlServer } from "./../constants/constants";
import { deleteItem } from "../services/rootService";
import { Tank } from "./TankStore";

export interface Event {
  date?: Date;
  id?: number;
  title?: String;
  description?: String;
  aquarium?: Tank;
}

class EventStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable events: Event[] = [];
  @observable eventState = "pending";

  @computed get eventsData() {
    return toJS(this.events);
  }

  @action
  async fetchEvents(): Promise<Event[]> {
    this.eventState = "pending";
    if (this.RootStore.tankStore.tankState === "done") {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId !== null) {
        try {
          console.log("Store is fetching  Events");
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getEventList/" + tankId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken,
            },
          });
          const events: Promise<Event[]> = response.json();
          this.eventState = "done";
          this.events = await events;
          return events;
        } catch (error) {
          console.log(error);
          this.eventState = "error";
        }
      }
    }
  }

  @action
  async storeDeleteEvent(id: number | string) {
    this.eventState = "pending";
    try {
      console.log("Store is deleting the event n° " + id);
      const memberToken = this.RootStore.memberStore.token;
      await deleteItem(id, "event", memberToken);
      runInAction(() => {
        this.eventState = "done";
      });
    } catch (error) {
      console.log(error);
    }
  }

  @action
  saveEvent = async (newEvent: Event, update: boolean) => {
    const suffixUrl = update ? "api/updateEvent" : "api/addEvent";
    newEvent.aquarium = null;
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
          Authorization: memberToken,
        },
        body: JSON.stringify(newEventForm),
      });
      const dataResponse = response.json;
      console.log("Nouvel évènement saved");
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };
}

export default EventStore;
