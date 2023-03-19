export class Terrain {
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
        this.nameEn = "Electric Terrain";
        this.nameJp = "エレキフィールド";
        break;
      case 2:
        this.nameEn = "Grassy Terrain";
        this.nameJp = "グラスフィールド";
        break;
      case 3:
        this.nameEn = "Misty Terrain";
        this.nameJp = "ミストフィールド";
        break;
      case 4:
        this.nameEn = "Psychic Terrain";
        this.nameJp = "サイコフィールド";
        break;
      default:
        this.nameEn = "None";
        this.nameJp = "なし";
        console.error(`Error: Terrain ${this.id} is not registered`);
        break;
    }
  }

  public equals(other: Terrain): boolean {
    return (
      this.id === other.id &&
      this.nameEn === other.nameEn &&
      this.nameJp === other.nameJp
    );
  }

  static fromNameEn(nameEn: string): Terrain {
    switch (nameEn) {
      case "None":
        return new Terrain(0);
      case "Electric Terrain":
        return new Terrain(1);
      case "Grassy Terrain":
        return new Terrain(2);
      case "Misty Terrain":
        return new Terrain(3);
      case "Psychic Terrain":
        return new Terrain(4);
      default:
        console.error(`Error: Terrain ${nameEn} is not registered`)
        return new Terrain(0);
    }
  }

  static listAllValidTerrains(): Terrain[] {
    return [
      new Terrain(0),
      new Terrain(1),
      new Terrain(2),
      new Terrain(3),
      new Terrain(4),
    ];
  }
}
