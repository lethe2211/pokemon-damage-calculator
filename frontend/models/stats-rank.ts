export class StatsRank {
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;

  constructor(
    attack: number,
    defense: number,
    spAtk: number,
    spDef: number,
    speed: number
  ) {
    this.attack = attack;
    this.defense = defense;
    this.spAtk = spAtk;
    this.spDef = spDef;
    this.speed = speed;
  }
}