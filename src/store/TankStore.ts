import { observable, action, runInAction } from "mobx";
import { RootStore as RootStoreType, WebServiceState } from "./RootStore";
import { ImageSourcePropType } from "react-native";
import { urlServer } from "../constants/constants";
import { Member } from "../services/memberService";
import { tan } from "react-native-reanimated";

// typage aquarium
export interface Tank {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  startDate: Date;
  member?: Member;
  sumpVolume: number;
  typeOfMaintenance: string;
  mainPopulation: string;
  ballingDescription?: string;
  liveRocksWeigth?: number;
  othersRocksWeight?: number;
  rawVolume?: number;
}

class TankStore {
  RootStore: RootStoreType;

  constructor(RootStore: RootStoreType) {
    this.RootStore = RootStore;
  }

  @observable tankList: Tank[] = [];
  @observable tankState: WebServiceState = "pending";
  @observable tankImageState: WebServiceState = "pending";
  @observable tankPicture: ArrayBuffer | null = null;

  // récupération de la liste des aquariums du membre

  @action
  async fetchTankList(): Promise<Tank[]> {
    this.tankState = "pending";
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
        this.tankState = "done";
        const tankList: Promise<Tank[]> = response.json();
        runInAction(async () => {
          this.tankList = await tankList;
        });
        console.log("tankListSuccess");
        return tankList;
      } catch (error) {
        console.log(error);
        this.tankState = "error";
      }
    }
    return [];
  }

  @action
  async storeUploadImageTank(photo: ImageSourcePropType | any) {
    this.tankState = "pending";

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
      this.tankState = "done";
    } catch (error) {
      console.log(error);
      this.tankState = "error";
    }
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
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };

  @action
  reset = () => {
    this.tankList = [];
    this.tankState = "pending";
  };
}

export default TankStore;
