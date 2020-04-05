import { getAllAquariums } from "./../services/socialService";
import { RootStore as RootStoreType } from "./RootStore";
import { observable, computed, toJS, action, runInAction } from "mobx";
import { Tank } from "../services/tankService";

class SocialStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable socialTanks: Tank[];
  @observable socialState = "pending";

  @computed get waterTestListData() {
    return toJS(this.socialTanks);
  }

  @action
  async fetchSocialTanks(): Promise<Tank[]> {
    this.socialState = "pending";
    try {
      console.log("Store is fetching the social tank list");
      const memberToken = this.RootStore.memberStore.token;
      const socialTanks = await getAllAquariums(memberToken);
      runInAction(() => {
        console.log("SocialTanks Success");
        this.socialTanks = socialTanks;
        this.socialState = "done";
      });
      return socialTanks;
    } catch (error) {
      console.log(error);
      this.socialState = "error";
    }
  }
}

export default SocialStore;
