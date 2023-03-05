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
        console.error(`Error: Type ${this.id} is not registered`);
        break;
    }
  }

  public equals(other: Type): boolean {
    return (
      this.id === other.id &&
      this.nameEn === other.nameEn &&
      this.nameJp === other.nameJp
    );
  }

  public hasTypeCompatibilityWith(other: Type): TypeCompatibility {
    switch (this.id) {
      case 0: // None
        return new TypeCompatibility(0);
      case 1: // Normal
        switch (other.id) {
          case 6:
            return new TypeCompatibility(3);
          case 8:
            return new TypeCompatibility(1);
          case 9:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 2: // Fighting
        switch (other.id) {
          case 1:
            return new TypeCompatibility(2);
          case 3:
            return new TypeCompatibility(3);
          case 4:
            return new TypeCompatibility(3);
          case 6:
            return new TypeCompatibility(2);
          case 7:
            return new TypeCompatibility(3);
          case 8:
            return new TypeCompatibility(1);
          case 9:
            return new TypeCompatibility(2);
          case 14:
            return new TypeCompatibility(3);
          case 15:
            return new TypeCompatibility(2);
          case 17:
            return new TypeCompatibility(2);
          case 18:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 3: // Flying
        switch (other.id) {
          case 2:
            return new TypeCompatibility(2);
          case 6:
            return new TypeCompatibility(3);
          case 7:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(3);
          case 12:
            return new TypeCompatibility(2);
          case 13:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 4: // Poison
        switch (other.id) {
          case 4:
            return new TypeCompatibility(3);
          case 5:
            return new TypeCompatibility(3);
          case 6:
            return new TypeCompatibility(3);
          case 8:
            return new TypeCompatibility(3);
          case 9:
            return new TypeCompatibility(1);
          case 12:
            return new TypeCompatibility(2);
          case 18:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      case 5: // Ground
        switch (other.id) {
          case 3:
            return new TypeCompatibility(1);
          case 4:
            return new TypeCompatibility(2);
          case 6:
            return new TypeCompatibility(2);
          case 7:
            return new TypeCompatibility(3);
          case 9:
            return new TypeCompatibility(2);
          case 10:
            return new TypeCompatibility(2);
          case 12:
            return new TypeCompatibility(3);
          case 13:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      case 6: // Rock
        switch (other.id) {
          case 2:
            return new TypeCompatibility(3);
          case 3:
            return new TypeCompatibility(2);
          case 5:
            return new TypeCompatibility(3);
          case 7:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(3);
          case 10:
            return new TypeCompatibility(2);
          case 15:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      case 7: // Bug
        switch (other.id) {
          case 2:
            return new TypeCompatibility(3);
          case 3:
            return new TypeCompatibility(3);
          case 4:
            return new TypeCompatibility(3);
          case 8:
            return new TypeCompatibility(3);
          case 9:
            return new TypeCompatibility(3);
          case 10:
            return new TypeCompatibility(3);
          case 12:
            return new TypeCompatibility(2);
          case 14:
            return new TypeCompatibility(2);
          case 17:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      case 8: // Ghost
        switch (other.id) {
          case 1:
            return new TypeCompatibility(1);
          case 8:
            return new TypeCompatibility(2);
          case 14:
            return new TypeCompatibility(2);
          case 17:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 9: // Steel
        switch (other.id) {
          case 6:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(3);
          case 10:
            return new TypeCompatibility(3);
          case 11:
            return new TypeCompatibility(3);
          case 13:
            return new TypeCompatibility(3);
          case 15:
            return new TypeCompatibility(2);
          case 18:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      case 10: // Fire
        switch (other.id) {
          case 6:
            return new TypeCompatibility(3);
          case 7:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(2);
          case 10:
            return new TypeCompatibility(3);
          case 11:
            return new TypeCompatibility(3);
          case 12:
            return new TypeCompatibility(2);
          case 15:
            return new TypeCompatibility(2);
          case 16:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 11: // Water
        switch (other.id) {
          case 5:
            return new TypeCompatibility(2);
          case 6:
            return new TypeCompatibility(2);
          case 10:
            return new TypeCompatibility(2);
          case 11:
            return new TypeCompatibility(3);
          case 12:
            return new TypeCompatibility(3);
          case 16:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 12: // Grass
        switch (other.id) {
          case 3:
            return new TypeCompatibility(3);
          case 4:
            return new TypeCompatibility(3);
          case 5:
            return new TypeCompatibility(2);
          case 6:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(3);
          case 7:
            return new TypeCompatibility(3);
          case 10:
            return new TypeCompatibility(3);
          case 11:
            return new TypeCompatibility(2);
          case 12:
            return new TypeCompatibility(3);
          case 16:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 13: // Electric
        switch (other.id) {
          case 3:
            return new TypeCompatibility(2);
          case 5:
            return new TypeCompatibility(1);
          case 11:
            return new TypeCompatibility(2);
          case 12:
            return new TypeCompatibility(3);
          case 13:
            return new TypeCompatibility(3);
          case 16:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 14: // Psychic
        switch (other.id) {
          case 2:
            return new TypeCompatibility(2);
          case 4:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(3);
          case 14:
            return new TypeCompatibility(3);
          case 17:
            return new TypeCompatibility(1);
          default:
            return new TypeCompatibility(0);
        }
      case 15: // Ice
        switch (other.id) {
          case 3:
            return new TypeCompatibility(2);
          case 5:
            return new TypeCompatibility(2);
          case 9:
            return new TypeCompatibility(3);
          case 10:
            return new TypeCompatibility(3);
          case 11:
            return new TypeCompatibility(3);
          case 12:
            return new TypeCompatibility(2);
          case 15:
            return new TypeCompatibility(3);
          case 16:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      case 16: // Dragon
        switch (other.id) {
          case 9:
            return new TypeCompatibility(3);
          case 16:
            return new TypeCompatibility(2);
          case 18:
            return new TypeCompatibility(1);
          default:
            return new TypeCompatibility(0);
        }
      case 17: // Dark
        switch (other.id) {
          case 2:
            return new TypeCompatibility(3);
          case 8:
            return new TypeCompatibility(2);
          case 14:
            return new TypeCompatibility(2);
          case 17:
            return new TypeCompatibility(3);
          default:
            return new TypeCompatibility(0);
        }
      case 18: // Fairy
        switch (other.id) {
          case 2:
            return new TypeCompatibility(2);
          case 4:
            return new TypeCompatibility(3);
          case 9:
            return new TypeCompatibility(3);
          case 10:
            return new TypeCompatibility(3);
          case 16:
            return new TypeCompatibility(2);
          case 17:
            return new TypeCompatibility(2);
          default:
            return new TypeCompatibility(0);
        }
      default:
        console.error(`Error: Type ${this.id} is not registered`);
        return new TypeCompatibility(0);
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
        console.error(`Error: Type ${nameEn} is not registered`);
        return new Type(0);
    }
  }

  static listAllTypes(): Type[] {
    let res = [];
    for (let i = 1; i <= 18; i++) {
      res.push(new Type(i));
    }
    return res;
  }
}

export class TypeCompatibility {
  id: number;
  descriptionEn: string;
  descriptionJp: string;

  constructor(id: number) {
    this.id = id;

    switch (this.id) {
      case 0:
        this.descriptionEn = "Effective";
        this.descriptionJp = "効果あり";
        break;
      case 1:
        this.descriptionEn = "No effect";
        this.descriptionJp = "効果なし";
        break;
      case 2:
        this.descriptionEn = "Super effective";
        this.descriptionJp = "効果抜群";
        break;
      case 3:
        this.descriptionEn = "Not very effective";
        this.descriptionJp = "効果いまひとつ";
        break;
      default:
        console.error(`Error: Type Compatibility ${this.id} is not registered`);
        this.descriptionEn = "Effective";
        this.descriptionJp = "効果あり";
        break;
    }
  }

  public equals(other: TypeCompatibility): boolean {
    return (
      this.id === other.id &&
      this.descriptionEn === other.descriptionEn &&
      this.descriptionJp === other.descriptionJp
    );
  }

  static fromDescriptionEn(descriptionEn: string): TypeCompatibility {
    switch (descriptionEn) {
      case "Effective":
        return new TypeCompatibility(0);
      case "No effect":
        return new TypeCompatibility(1);
      case "Super effective":
        return new TypeCompatibility(2);
      case "Not very effective":
        return new TypeCompatibility(3);
      default:
        console.error(`Error: Type Compatibility ${descriptionEn} is not registered`);
        return new TypeCompatibility(0);
    }
  }
}
