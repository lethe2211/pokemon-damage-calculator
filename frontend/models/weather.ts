export class Weather {
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
        this.nameEn = "Harsh sunlight";
        this.nameJp = "にほんばれ";
        break;
      case 2:
        this.nameEn = "Rain";
        this.nameJp = "あめ";
        break;
      case 3:
        this.nameEn = "Sandstorm";
        this.nameJp = "すなあらし";
        break;
      case 4:
        this.nameEn = "Snow";
        this.nameJp = "ゆき";
        break;
      default:
        this.nameEn = "None";
        this.nameJp = "なし";
        console.error(`Error: Weather ${this.id} is not registered`);
        break;
    }
  }

  public equals(other: Weather): boolean {
    return (
      this.id === other.id &&
      this.nameEn == other.nameEn &&
      this.nameJp === other.nameJp
    );
  }

  static fromNameEn(nameEn: string): Weather {
    switch (nameEn) {
      case "None":
        return new Weather(0);
      case "Harsh sunlight":
        return new Weather(1);
      case "Rain":
        return new Weather(2);
      case "Sandstorm":
        return new Weather(3);
      case "Snow":
        return new Weather(4);
      default:
        console.error(`Error: Weather ${nameEn} is not registered`)
        return new Weather(0);
    }
  }

  static listAllValidWeathers(): Weather[] {
    return [
      new Weather(0),
      new Weather(1),
      new Weather(2),
      new Weather(3),
      new Weather(4),
    ];
  }
}
