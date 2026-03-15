// 個体値
export class IV {
  hp: number; // HP個体値
  attack: number; // こうげき個体値
  defense: number; // ぼうぎょ個体値
  spAtk: number; // とくこう個体値
  spDef: number; // とくぼう個体値
  speed: number; // すばやさ個体値

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