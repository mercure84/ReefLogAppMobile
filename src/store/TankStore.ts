import { observable, action, runInAction } from "mobx";
import { Tank, getTankList } from "../services/tankServices";
import RootStore from "./RootStore";

class TankStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable tankList: Tank[] = [];

  @observable tankState = "pending"; // "pending" / "done" / "error"

  // récupération de la liste des aquariums du membre

  /*   @action
  async fetchTankList(): Promise<Tank[]> {
    this.tankState = "pending";
    //this.dataMemberStore = new MemberStore();
    console.log("state memberStore = " + this.dataMemberStore.memberState);
    console.log("memberId de memberStore = " + this.dataMemberStore.member.id);
    if (this.dataMemberStore.memberState == "done") {
      try {
        console.log("démarrage de l'appel aux tankList");
        this.tankState = "pending";
        const memberId = this.dataMemberStore.member.id;
        const memberToken = this.dataMemberStore.member.token;
        console.log(
          "Membre id = " + memberStore + ", memberToken " + memberToken
        );
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
  } */
}

export default TankStore;
