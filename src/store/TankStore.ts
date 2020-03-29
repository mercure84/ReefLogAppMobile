import { observable, action, runInAction, computed } from "mobx";
import { Tank, getTankList } from "../services/tankService";
import { RootStore as RootStoreType } from "./RootStore";
import { ImageSourcePropType } from "react-native";
import {
  saveAquariumPicture,
  getAquariumPicture
} from "../services/imageTransfertService";

class TankStore {
  rootStore: RootStoreType;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable tankList: Tank[] = [];
  @observable tankState = "pending"; // "pending" / "done" / "error"
  @observable tankImageState = "pending";
  @observable tankPicture: ImageSourcePropType = null;

  // récupération de la liste des aquariums du membre

  @action
  async fetchTankList(): Promise<Tank[]> {
    this.tankState = "pending";
    if (this.rootStore.memberStore.memberState === "done") {
      const memberId = this.rootStore.memberStore.member.id;
      if (memberId !== null) {
        try {
          console.log("Store is Fetching tankList");
          const memberToken = this.rootStore.memberStore.token;
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
  async storeGetImageTank() {
    this.tankImageState = "pending";
    try {
      console.log("Store is fetching TankImage fro mthe DB");
      const id = "171";
      const picture = await getAquariumPicture(id);
      runInAction(() => {
        this.tankPicture = picture;
        this.tankImageState = "done";
        console.log("On a réussi apparemment à fetch l'image");
      });
    } catch (error) {
      console.error(error);
      this.tankState = "error";
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
