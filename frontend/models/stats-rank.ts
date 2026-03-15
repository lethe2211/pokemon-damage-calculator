// ステータスランク
export class StatsRank {
  attack: number; // こうげきランク
  defense: number; // ぼうぎょランク
  spAtk: number; // とくこうランク
  spDef: number; // とくぼうランク
  speed: number; // すばやさランク

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