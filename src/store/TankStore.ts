import { observable, action, runInAction } from "mobx";
import { Tank } from "../services/tankService";
import { RootStore as RootStoreType } from "./RootStore";
import { ImageSourcePropType } from "react-native";
import { urlServer } from "../constants/constants";

class TankStore {
  RootStore: RootStoreType;

  constructor(RootStore) {
    this.RootStore = RootStore;
  }

  @observable tankList: Tank[] = [];
  @observable tankState = "pending"; // "pending" / "done" / "error"
  @observable tankImageState = "pending";
  @observable tankPicture: ArrayBuffer = null;

  // récupération de la liste des aquariums du membre

  @action
  async fetchTankList(): Promise<Tank[]> {
    this.tankState = "pending";
    if (this.RootStore.memberStore.memberState === "done") {
      const memberId = this.RootStore.memberStore.member.id;
      if (memberId !== null) {
        try {
          console.log("Store is Fetching tankList");
          const memberToken = this.RootStore.memberStore.token;
          const urlService = urlServer + "api/getAquariumList/" + memberId;
          const response = await fetch(urlService, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: memberToken,
            },
          });
          const tankList: Promise<Tank[]> = response.json();
          runInAction(async () => {
            console.log("tankListSuccess");
            this.tankList = await tankList;
            this.tankState = "done";
          });
          return tankList;
        } catch (error) {
          console.log(error);
          this.tankState = "error";
        }
      }
    }
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
          Authorization: memberToken,
        },
        body: data,
      });
      runInAction(() => {
        this.tankState = "done";
      });
    } catch (error) {
      console.log(error);
      this.tankState = "error";
    }
  }
}

export default TankStore;
