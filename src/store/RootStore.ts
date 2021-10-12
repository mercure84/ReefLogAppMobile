import MemberStore from "./MemberStore";
import TankStore from "./TankStore";
import WaterTestStore from "./WaterTestStore";
import AnimalStore from "./AnimalStore";
import EquipmentStore from "./EquipmentStore";
import SocialStore from "./SocialStore";
import AlertStore from "./AlertStore";
import EventStore from "./EventStore";
import MeasureStore from "./MeasureStore";

export type WebServiceState = "starting" | "pending" | "done" | "error";

export class RootStore {
  memberStore: MemberStore;
  tankStore: TankStore;
  waterTestStore: WaterTestStore;
  animalStore: AnimalStore;
  equipmentStore: EquipmentStore;
  socialStore: SocialStore;
  alertStore: AlertStore;
  eventStore: EventStore;
  measureStore: MeasureStore;

  constructor() {
    this.memberStore = new MemberStore(this);
    this.tankStore = new TankStore(this);
    this.waterTestStore = new WaterTestStore(this);
    this.animalStore = new AnimalStore(this);
    this.equipmentStore = new EquipmentStore(this);
    this.socialStore = new SocialStore(this);
    this.alertStore = new AlertStore(this);
    this.eventStore = new EventStore(this);
    this.measureStore = new MeasureStore(this);
  }

  clear() {
    this.waterTestStore.clear();
    this.alertStore.clear();
    this.eventStore.clear();
    this.tankStore.clear();
    this.memberStore.clear();
    this.measureStore.clear();
  }
}

export default new RootStore();
