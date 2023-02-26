import { Type } from "./type";
import moveDataSv from "../data/move_data_sv.json";

export class Move {
  id: number;
  nameJp: string;
  nameEn: string;
  type: Type;
  category: MoveCategory;
  power: number;
  accuracy: number;
  pp: number;

  constructor(
    id: number
  ) {
    this.id = id;

    const data = moveDataSv.filter(e => e["id"] === id)[0]

    this.nameJp = data["nameJp"]
    this.nameEn = data["nameEn"]
    this.type = Type.fromNameEn(data["type"][0].toUpperCase() + data["type"].substring(1))
    this.category = MoveCategory.fromNameEn(data["damage_class"][0].toUpperCase() + data["damage_class"].substring(1))
    this.power = data["power"] ?? -1
    this.accuracy = data["accuracy"] ?? -1;
    this.pp = data["pp"] ?? -1;
  }

  static listAllValidSVMoves(): Move[] {
    return moveDataSv
    .filter(e => e.sv === true && (e.damage_class === "physical" || e.damage_class === "special"))
    .map(e => new Move(e.id));
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
        this.nameJp = "変化"
      default:
        this.nameEn = "Physical";
        this.nameJp = "物理";
        break;
    }
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
        console.error(`Error: ${nameEn} is not registered`);
        return new MoveCategory(0);
    }
  }
}
