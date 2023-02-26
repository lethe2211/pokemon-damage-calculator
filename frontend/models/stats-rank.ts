export class StatsRank {
  attack: Number;
  defense: Number;
  spAtk: Number;
  spDef: Number;
  speed: Number;

  constructor(
    attack: Number,
    defense: Number,
    spAtk: Number,
    spDef: Number,
    speed: Number
  ) {
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
  }
}