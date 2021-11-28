import { action, computed, observable, runInAction, toJS } from "mobx";
import { urlServer } from "../constants/constants";
import { TypeTest } from "./AlertStore";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";

export type Measure = {
  date: Date;
  value: number;
};

export type Graph = {
  typeTest: TypeTest;
  measures: Measure[];
} | null;

class GraphStore {
  RootStore: RootStoreType;
  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable graph: Graph = null;
  @observable fetchState: WebServiceState = "pending";

  @computed get graphData() {
    return toJS(this.graph);
  }

  @action clear() {
    this.graph = null;
    this.fetchState = "pending";
  }

  @action
  async fetchGraph(typeTest: TypeTest): Promise<Graph> {
    this.fetchState = "starting";
    if (this.RootStore.tankStore.tankList.length > 0) {
      const tankId = this.RootStore.tankStore.tankList[0].id;
      if (tankId) {
        try {
          console.log(
            "Store is fetching graph ",
            typeTest,
            " for tank n°  ",
            tankId
          );
          const urlService =
            urlServer + "api/getWaterTestsForGraph/" + tankId + "/" + typeTest;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const graph: Promise<Graph> = response.json();
          runInAction(async () => {
            this.graph = await graph;
          });
          this.fetchState = "done";
          return graph;
        } catch (error) {
          console.log("Error during fetching graph : ", error);
          return null;
        }
      }
    }
    return null;
  }
}

export default GraphStore;
