export class Type {
  id: number;
  nameEn: string;
  nameJp: string;

  constructor(id: number) {
    this.id = id;

    switch (this.id) {
      case 0:
        this.nameEn = "None";
        this.nameJp = "タイプなし";
        break;
      case 1:
        this.nameEn = "Normal";
        this.nameJp = "ノーマル";
        break;
      case 2:
        this.nameEn = "Fighting";
        this.nameJp = "かくとう";
        break;
      case 3:
        this.nameEn = "Flying";
        this.nameJp = "ひこう";
        break;
      case 4:
        this.nameEn = "Poison";
        this.nameJp = "どく";
        break;
      case 5:
        this.nameEn = "Ground";
        this.nameJp = "じめん";
        break;
      case 6:
        this.nameEn = "Rock";
        this.nameJp = "いわ";
        break;
      case 7:
        this.nameEn = "Bug";
        this.nameJp = "むし";
        break;
      case 8:
        this.nameEn = "Ghost";
        this.nameJp = "ゴースト";
        break;
      case 9:
        this.nameEn = "Steel";
        this.nameJp = "はがね";
        break;
      case 10:
        this.nameEn = "Fire";
        this.nameJp = "ほのお";
        break;
      case 11:
        this.nameEn = "Water";
        this.nameJp = "みず";
        break;
      case 12:
        this.nameEn = "Grass";
        this.nameJp = "くさ";
        break;
      case 13:
        this.nameEn = "Electric";
        this.nameJp = "でんき";
        break;
      case 14:
        this.nameEn = "Psychic";
        this.nameJp = "エスパー";
        break;
      case 15:
        this.nameEn = "Ice";
        this.nameJp = "こおり";
        break;
      case 16:
        this.nameEn = "Dragon";
        this.nameJp = "ドラゴン";
        break;
      case 17:
        this.nameEn = "Dark";
        this.nameJp = "あく";
        break;
      case 18:
        this.nameEn = "Fairy";
        this.nameJp = "フェアリー";
        break;
      default:
        this.nameEn = "None";
        this.nameJp = "タイプなし";
        console.error(`Error: ${this.id} is not registered`);
        break;
    }
  }

  static fromNameEn(nameEn: string): Type {
    switch (nameEn) {
      case "None":
        return new Type(0);
      case "Normal":
        return new Type(1);
      case "Fighting":
        return new Type(2);
      case "Flying":
        return new Type(3);
      case "Poison":
        return new Type(4);
      case "Ground":
        return new Type(5);
      case "Rock":
        return new Type(6);
      case "Bug":
        return new Type(7);
      case "Ghost":
        return new Type(8);
      case "Steel":
        return new Type(9);
      case "Fire":
        return new Type(10);
      case "Water":
        return new Type(11);
      case "Grass":
        return new Type(12);
      case "Electric":
        return new Type(13);
      case "Psychic":
        return new Type(14);
      case "Ice":
        return new Type(15);
      case "Dragon":
        return new Type(16);
      case "Dark":
        return new Type(17);
      case "Fairy":
        return new Type(18);
      default:
        console.error(`Error: ${nameEn} is not registered`);
        return new Type(0);
    }
  }
}
