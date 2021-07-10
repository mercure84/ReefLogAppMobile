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
  @observable token: string = "";
  @observable googleToken: string = "";

  @observable memberState: WebServiceState = "pending"; // "pending" / "done" / "error"

  // récupération des détails du membre pour alimenter notre store
  @action
  async fetchMember() {
    this.memberState = "pending";

    try {
      const asyncStoredMail = await getData("emailUser");
      const asyncStoredToken = await getData("token");
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
    } catch (error) {
      console.log(error);
      this.memberState = "error";
    }
  }
}

export default MemberStore;
