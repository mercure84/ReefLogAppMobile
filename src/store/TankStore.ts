import { observable, action, runInAction, computed } from "mobx";
import { Tank, getTankList } from "../services/tankService";
import { RootStore as RootStoreType } from "./RootStore";
import { ImageSourcePropType } from "react-native";
import { saveAquariumPicture } from "../services/imageTransfertService";

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
          const tankList = await getTankList(memberId, memberToken);
          runInAction(() => {
            console.log("tankListSuccess");
            this.tankList = tankList;
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
  async storeUploadImageTank(photo: ImageSourcePropType) {
    this.tankState = "pending";

    try {
      console.log("Store is uploading an image to DB");
      await saveAquariumPicture(photo, this.tankList[0].id);
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
