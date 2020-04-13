import MemberStore from "./MemberStore";
import TankStore from "./TankStore";
import WaterTestStore from "./WaterTestStore";
import AnimalStore from "./AnimalStore";
import EquipmentStore from "./EquipmentStore";
import SocialStore from "./SocialStore";
import AlertStore from "./AlertStore";

export class RootStore {
  memberStore: MemberStore;
  tankStore: TankStore;
  waterTestStore: WaterTestStore;
  animalStore: AnimalStore;
  equipmentStore: EquipmentStore;
  socialStore: SocialStore;
  alertStore: AlertStore;

  constructor() {
    this.memberStore = new MemberStore(this);
    this.tankStore = new TankStore(this);
    this.waterTestStore = new WaterTestStore(this);
    this.animalStore = new AnimalStore(this);
    this.equipmentStore = new EquipmentStore(this);
    this.socialStore = new SocialStore(this);
    this.alertStore = new AlertStore(this);
  }
}

export default new RootStore();
