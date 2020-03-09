import { observable, action, runInAction } from "mobx";
import { getData } from "../services/storageDevice";
import { getMemberDetail, Member } from "../services/memberServices";
import { RootStore as RootStoreType } from "./RootStore";


class MemberStore {

  rootStore: RootStoreType;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable member: Member
  @observable token: string

  @observable memberState = "pending"; // "pending" / "done" / "error"

  // récupération des détails du membre pour alimenter notre store
  @action
  async fetchMember(): Promise<Member> {
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
        this.memberState = "done";
      });

      return memberDetail;
    } catch (error) {
      console.log(error);
      this.memberState = "error";
    }
  }
}

export default MemberStore;
