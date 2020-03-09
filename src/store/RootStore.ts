import MemberStore from "./MemberStore";
import TankStore from "./TankStore";

class RootStore {
  memberStore: MemberStore;
  tankStore: TankStore;
  constructor() {
    this.memberStore = new MemberStore(this);
    this.tankStore = new TankStore(this);
  }
}

export default new RootStore;
