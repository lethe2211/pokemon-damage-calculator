export class Stats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;

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
