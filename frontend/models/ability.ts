import abilityDataSv from "../data/ability_data_sv.json";

export class Ability {
  id: number;
  nameEn: string;
  nameJp: string;
  descriptionEn: string;
  descriptionJp: string;

  constructor(id: number) {
    this.id = id;

    const data = abilityDataSv.filter((e) => e["id"] === id)[0];

    this.nameEn = data.name_en;
    this.nameJp = data.name_jp;
    this.descriptionEn = data.description_en;
    this.descriptionJp = data.description_jp;
  }

  public equals(other: Ability): boolean {
    return (
      this.id === other.id &&
      this.nameEn == other.nameEn &&
      this.nameJp === other.nameJp &&
      this.descriptionEn === other.descriptionEn &&
      this.descriptionJp === other.descriptionJp
    );
  }

  static listAllValidSVAbilities(): Ability[] {
    return abilityDataSv
      .filter((e) => e.sv === true)
      .map((e) => new Ability(e.id));
  }
}
