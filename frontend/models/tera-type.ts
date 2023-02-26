import { Type } from "./type";

export class TeraType {
  type: Type;

  constructor(id: number) {
    this.type = new Type(id);
  }
}