import { Type } from "./type";

export class TeraType {
  type: Type;
  isEnabled: boolean;

  constructor(id: number, isEnabled: boolean) {
    this.type = new Type(id);
    this.isEnabled = isEnabled;
  }
}