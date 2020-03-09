import MemberStore from "./MemberStore";
import TankStore from "./TankStore";
import WaterTestStore from "./WaterTestStore";

export class RootStore {
  memberStore: MemberStore;
  tankStore: TankStore;
  waterTestStore: WaterTestStore;
  constructor() {
    this.memberStore = new MemberStore(this);
    this.tankStore = new TankStore(this);
    this.waterTestStore = new WaterTestStore(this);
  }
}

export default new RootStore;
