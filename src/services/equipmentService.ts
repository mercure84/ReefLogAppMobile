import { Tank } from "./tankService";

export interface Equipment {
  id?: number;
  typeOfEquipment: string;
  mark?: string;
  model?: string;
  description?: string;
  power?: number;
  quantity?: number;
  aquarium?: Tank;
}
