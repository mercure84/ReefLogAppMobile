import { observable, action, runInAction } from "mobx";
import { getData } from "../services/storageDevice";
import { getMemberDetail, Member } from "../services/memberServices";
import RootStore from "./RootStore";

class MemberStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable member = {
    pseudo: "",
    id: "",
    email: "",
    token: ""
  };

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
        this.member.email = asyncStoredMail;
        this.member.token = asyncStoredToken;
        this.member.id = memberDetail.id;
        this.member.pseudo = memberDetail.userName;
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
