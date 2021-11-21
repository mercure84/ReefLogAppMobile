import { observable, action, runInAction, computed } from "mobx";
import { getData } from "../services/storageDevice";
import { getMemberDetail, Member } from "../services/memberService";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { myThemes } from "../components/colors";
import { urlServer } from "../constants/constants";

class MemberStore {
  RootStore: RootStoreType;

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }
  @observable member: Member | undefined = undefined;
  @observable token: string | undefined | null = "";
  @observable googleToken: string = "";
  @observable fetchState: WebServiceState = "pending"; // "pending" / "done" / "error"
  @observable updateState: WebServiceState = "pending";

  // récupération des détails du membre pour alimenter notre store
  @action
  async fetchMember() {
    this.fetchState = "starting";
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
        this.fetchState = "done";
        return memberDetail;
      } else {
        console.log("no User or token stored in Async Storage");
        return;
      }
    } catch (error) {
      console.log(error);
      this.fetchState = "error";
    }
  }

  @action
  saveThemeMember = async (themeNumber: number) => {
    this.updateState = "starting";
    const urlService = urlServer + "api/setMemberTheme";

    const themeForm = {
      email: this.member?.email,
      themeNumber,
    };

    try {
      const memberToken = this.RootStore.memberStore.token;
      const response = await fetch(urlService, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: memberToken ?? "",
        },
        body: JSON.stringify(themeForm),
      });
      const dataResponse = response.json();
      console.log("Le thème couleur a été sauvegardé !", themeNumber);
      return dataResponse;
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  };

  @action
  clear = () => {
    this.googleToken = "";
    this.member = undefined;
    this.token = "";
    this.fetchState = "pending";
  };

  @action
  init = () => {
    this.fetchState = "pending";
  };
}

export default MemberStore;
