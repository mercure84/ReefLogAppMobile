import { observable, action, runInAction } from "mobx";
import { getData } from "../services/storageDevice";
import { getMemberDetail, Member } from "../services/memberService";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";

class MemberStore {
  RootStore: RootStoreType;

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }
  @observable member: Member | undefined = undefined;
  @observable token: string | undefined | null = "";
  @observable googleToken: string = "";
  @observable memberState: WebServiceState = "pending"; // "pending" / "done" / "error"

  // récupération des détails du membre pour alimenter notre store
  @action
  async fetchMember() {
    this.memberState = "pending";

    try {
      const asyncStoredMail = await getData("emailUser");
      const asyncStoredToken = await getData("token");

      if (asyncStoredMail != null && asyncStoredToken != null) {
        const memberDetail = await getMemberDetail(
          asyncStoredMail,
          asyncStoredToken
        );
        runInAction(() => {
          this.token = asyncStoredToken;
          this.member = memberDetail;
        });
        this.memberState = "done";
        return memberDetail;
      } else {
        console.log("no User or token stored in Async Storage");
        return;
      }
    } catch (error) {
      console.log(error);
      this.memberState = "error";
    }
  }

  @action
  clear = () => {
    this.googleToken = "";
    this.member = undefined;
    this.token = "";
  };
}

export default MemberStore;
