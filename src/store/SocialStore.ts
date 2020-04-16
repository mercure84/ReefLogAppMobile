import { RootStore as RootStoreType } from "./RootStore";
import { observable, computed, toJS, action, runInAction } from "mobx";
import { urlServer } from "./../constants/constants";
import { Tank } from "./TankStore";

class SocialStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable socialTanks: Tank[];
  @observable socialState = "pending";

  @computed get socialTanksData() {
    return toJS(this.socialTanks);
  }

  @action
  async fetchSocialTanks(): Promise<Tank[]> {
    this.socialState = "pending";
    try {
      console.log("Store is fetching the social tank list");
      const memberToken = this.RootStore.memberStore.token;
      const urlService = urlServer + "api/getAllAquariums";
      const response = await fetch(urlService, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: memberToken,
        },
      });
      this.socialState = "done";
      const socialTanks: Promise<Tank[]> = response.json();
      runInAction(async () => {
        console.log("SocialTanks Success");
        this.socialTanks = await socialTanks;
      });
      return socialTanks;
    } catch (error) {
      console.log(error);
      this.socialState = "error";
    }
  }
}

export default SocialStore;
