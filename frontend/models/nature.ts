// 性格
export class Nature {
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;

  constructor(
    attack: number, // こうげき補正
    defense: number, // ぼうぎょ補正
    spAtk: number, // とくこう補正
    spDef: number, // とくぼう補正
    speed: number // すばやさ補正
  ) {
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
  }
}