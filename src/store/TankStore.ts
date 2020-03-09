import { observable, action, runInAction } from "mobx";
import { Tank, getTankList } from "../services/tankServices";
import { RootStore as RootStoreType } from "./RootStore";

class TankStore {
  rootStore: RootStoreType;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable tankList: Tank[] = [];
  @observable tankState = "pending"; // "pending" / "done" / "error"

  // récupération de la liste des aquariums du membre

  @action
  async fetchTankList(): Promise<Tank[]> {
    this.tankState = "pending";
    if (this.rootStore.memberStore.memberState === "done") {
      const memberId = this.rootStore.memberStore.member.id;
      if (memberId !== null) {
        try {
          console.log("Store is Fetching tankList");
          const memberToken = this.rootStore.memberStore.token;
          const tankList = await getTankList(memberId, memberToken);
          runInAction(() => {
            console.log("tankListSuccess");
            this.tankList = tankList;
            this.tankState = "done";
          });

          return tankList;
        } catch (error) {
          console.log(error);
          this.tankState = "error";
        }
      }
    }
  }
}

export default TankStore;
