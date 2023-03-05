export class StatusAilment {
  id: number;
  nameEn: string;
  nameJp: string;

  constructor(id: number) {
    this.id = id;

    switch (this.id) {
      case 0:
        this.nameEn = "None";
        this.nameJp = "なし";
        break;
      case 1:
        this.nameEn = "Paralysis";
        this.nameJp = "まひ";
        break;
      case 2:
        this.nameEn = "Sleep";
        this.nameJp = "ねむり";
        break;
      case 3:
        this.nameEn = "Freeze";
        this.nameJp = "こおり";
        break;
      case 4:
        this.nameEn = "Burn";
        this.nameJp = "やけど";
        break;
      case 5:
        this.nameEn = "Poison";
        this.nameJp = "どく";
        break;
      default:
        this.nameEn = "None";
        this.nameJp = "なし";
        console.error(`Error: Status Ailment ${this.id} is not registered`);
        break;
    }
  }

  static fromNameEn(nameEn: string): StatusAilment {
    switch (nameEn) {
      case "None":
        return new StatusAilment(0);
      case "Paralysis":
        return new StatusAilment(1);
      case "Sleep":
        return new StatusAilment(2);
      case "Freeze":
        return new StatusAilment(3);
      case "Burn":
        return new StatusAilment(4);
      case "Poison":
        return new StatusAilment(5);
      default:
        console.error(`Error: Status Ailment ${nameEn} is not registered`);
        return new StatusAilment(0);
    }
  }

  static listAllTypes(): StatusAilment[] {
    let res = []
    for (let i = 0; i <= 5; i++) {
      res.push(new StatusAilment(i));
    }
    return res;
  }
}
