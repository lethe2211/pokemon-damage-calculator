// 努力値
export class EV {
  hp: number; // HP努力値
  attack: number; // こうげき努力値
  defense: number; // ぼうぎょ努力値
  spAtk: number; // とくこう努力値
  spDef: number; // とくぼう努力値
  speed: number; // すばやさ努力値

  constructor(
    hp: number,
    attack: number,
    defense: number,
    spAtk: number,
    spDef: number,
    speed: number
  ) {
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
  }
}