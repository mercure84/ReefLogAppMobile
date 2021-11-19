import { observable, action, runInAction } from "mobx";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { ImageSourcePropType } from "react-native";
import { urlServer } from "../constants/constants";
import { Member } from "../services/memberService";

// typage aquarium
export type Tank = {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  startDate: Date;
  member?: Member;
  sumpVolume: number;
  typeOfMaintenance: MaintenanceType;
  mainPopulation: "FISH_ONLY" | "SOFT" | "MIX" | "LPS" | "SPS";
  ballingDescription?: string;
  liveRocksWeigth?: number;
  othersRocksWeight?: number;
  rawVolume?: number;
};

export enum MaintenanceType {
  BERLINOIS = "BERLINOIS",
  JAUBERT = "JAUBERT",
  AUTRE = "AUTRE",
}

export enum MainPopulation {
  FISH_ONLY = "FISH_ONLY",
  SOFT = "SOFT",
  MIX = "MIX",
  LPS = "LPS",
  SPS = "SPS",
}

class TankStore {
  RootStore: RootStoreType;

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable tankList: Tank[] = [];
  @observable fetchState: WebServiceState = "pending";
  @observable updateState: WebServiceState = "pending";
  @observable tankImageState: WebServiceState = "pending";
  @observable tankPicture: ArrayBuffer | null = null;

  @action clear() {
    this.tankList = [];
    this.fetchState = "pending";
  }

  @action
  async fetchTankList(): Promise<Tank[]> {
    this.fetchState = "pending";
    if (this.RootStore.memberStore.member) {
      const memberId = this.RootStore.memberStore.member.id;
      try {
        console.log("Store is Fetching tankList for member n° ", memberId);
        const memberToken = this.RootStore.memberStore.token;
        const urlService = urlServer + "api/getAquariumList/" + memberId;
        const response = await fetch(urlService, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: memberToken ?? "",
          },
        });
        const tankList: Promise<Tank[]> = response.json();
        runInAction(async () => {
          this.tankList = await tankList;
        });
        console.log("tankListSuccess");
        this.fetchState = "done";
        return tankList;
      } catch (error) {
        console.log(error);
        this.fetchState = "error";
      }
    }
    return [];
  }

  @action // ajout d'un aquarium
  saveReefTank = async (newTank: Tank, update: boolean) => {
    const urlService = update
      ? urlServer + "api/updateReefAquarium"
      : urlServer + "api/addNewReefAquarium";
    const newReefTank = {
      memberId: this.RootStore.memberStore.member?.id,
      reefAquarium: newTank,
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
        body: JSON.stringify(newReefTank),
      });
      const dataResponse = response.json();
      console.log("Aquarium registered");
      this.refresh();
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };

  @action
  refresh = () => {
    this.tankList = [];
    this.fetchState = "pending";
  };

  @action
  async storeUploadImageTank(photo: ImageSourcePropType | any) {
    this.updateState = "pending";

    try {
      console.log("Store is uploading an image to DB");
      const suffixUrl = "api/uploadAquariumPicture/" + this.tankList[0].id;
      const urlService = urlServer + suffixUrl;
      const data = new FormData();
      data.append("file", {
        uri: photo.uri,
        name: "photo.png",
        filename: "imageName.png",
        type: "image/png",
      });
      const memberToken = this.RootStore.memberStore.token;
      await fetch(urlService, {
        method: "POST",
        headers: {
          Authorization: memberToken ?? "",
        },
        body: data,
      });
      this.updateState = "done";
    } catch (error) {
      console.log(error);
      this.updateState = "error";
    }
  }
}

export default TankStore;
