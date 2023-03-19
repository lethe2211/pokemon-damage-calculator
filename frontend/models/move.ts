import { Type } from "./type";
import moveDataSv from "../data/move_data_sv.json";

export class Move {
  id: number;
  nameEn: string;
  nameJp: string;
  type: Type;
  category: MoveCategory;
  power: number;
  accuracy: number;
  pp: number;

  constructor(id: number) {
    this.id = id;

    const data = moveDataSv.filter((e) => e["id"] === id)[0];

    this.nameEn = data["nameEn"];
    this.nameJp = data["nameJp"];
    this.type = Type.fromNameEn(
      data["type"][0].toUpperCase() + data["type"].substring(1)
    );
    this.category = MoveCategory.fromNameEn(
      data["damage_class"][0].toUpperCase() + data["damage_class"].substring(1)
    );
    this.power = data["power"] ?? -1;
    this.accuracy = data["accuracy"] ?? -1;
    this.pp = data["pp"] ?? -1;
  }

  public equals(other: Move): boolean {
    return (
      this.id === other.id &&
      this.nameEn === other.nameEn &&
      this.nameJp === other.nameJp &&
      this.type.equals(other.type) &&
      this.category.equals(other.category) &&
      this.power === other.power &&
      this.accuracy === other.accuracy &&
      this.pp === other.pp
    );
  }

  static listAllValidSVMoves(): Move[] {
    return moveDataSv
      .filter(
        (e) =>
          e.sv === true &&
          (e.damage_class === "physical" || e.damage_class === "special")
      )
      .map((e) => new Move(e.id));
  }
}

export class MoveCategory {
  id: number;
  nameEn: string;
  nameJp: string;

  constructor(id: number) {
    this.id = id;

    switch (this.id) {
      case 0:
        this.nameEn = "Physical";
        this.nameJp = "物理";
        break;
      case 1:
        this.nameEn = "Special";
        this.nameJp = "特殊";
        break;
      case 2:
        this.nameEn = "Status";
        this.nameJp = "変化";
        break;
      default:
        console.log(`Error111: MoveCategory ${this.id} is not registered`);
        this.nameEn = "Physical";
        this.nameJp = "物理";
        break;
    }
  }

  public equals(other: MoveCategory): boolean {
    return (
      this.id === other.id &&
      this.nameEn === other.nameEn &&
      this.nameJp === other.nameJp
    );
  }

  static fromNameEn(nameEn: string): MoveCategory {
    switch (nameEn) {
      case "Physical":
        return new MoveCategory(0);
      case "Special":
        return new MoveCategory(1);
      case "Status":
        return new MoveCategory(2);
      default:
        console.error(`Error: MoveCategory ${nameEn} is not registered`);
        return new MoveCategory(0);
    }
  }
}
