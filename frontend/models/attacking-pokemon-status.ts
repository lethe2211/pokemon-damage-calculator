import { Ability } from "./ability";
import { EV } from "./ev";
import { IV } from "./iv";
import { Move } from "./move";
import { Nature } from "./nature";
import { StatsRank } from "./stats-rank";
import { Stats } from "./stats";
import { StatusAilment } from "./status-ailment";
import { TeraType } from "./tera-type";
import { Pokemon } from "./pokemon";
import { Item } from "./item";

export class AttackingPokemonStatus {
  pokemon: Pokemon
  level: number;
  iv: IV;
  ev: EV;
  nature: Nature;
  statsRank: StatsRank;
  move: Move;
  teraType: TeraType;
  ability: Ability;
  item: Item;
  isCriticalHit: Boolean;
  statusAilment: StatusAilment;

  constructor(
    pokemon: Pokemon,
    level: number,
    iv: IV,
    ev: EV,
    nature: Nature,
    statsRank: StatsRank,
    move: Move,
    teraType: TeraType,
    ability: Ability,
    item: Item,
    isCriticalHit: Boolean,
    statusAilment: StatusAilment
  ) {
    this.pokemon = pokemon
    this.level = level;
    this.iv = iv;
    this.ev = ev;
    this.nature = nature;
    this.statsRank = statsRank;
    this.move = move;
    this.teraType = teraType;
    this.ability = ability;
    this.item = item;
    this.isCriticalHit = isCriticalHit;
    this.statusAilment = statusAilment;
  }

  public calculateStats(): Stats {
    return new Stats(
      Math.floor(((this.pokemon.baseStats.hp * 2) + this.iv.hp + (this.ev.hp / 4)) * this.level / 100) + this.level + 10,
      Math.floor(Math.floor(((this.pokemon.baseStats.attack * 2) + this.iv.attack + Math.floor(this.ev.attack / 4)) * this.level / 100 + 5) * this.nature.attack),
      Math.floor(Math.floor(((this.pokemon.baseStats.defense * 2) + this.iv.defense + Math.floor(this.ev.defense / 4)) * this.level / 100 + 5) * this.nature.defense),
      Math.floor(Math.floor(((this.pokemon.baseStats.spAtk * 2) + this.iv.spAtk + Math.floor(this.ev.spAtk / 4)) * this.level / 100 + 5) * this.nature.spAtk),
      Math.floor(Math.floor(((this.pokemon.baseStats.spDef * 2) + this.iv.spDef + Math.floor(this.ev.spDef / 4)) * this.level / 100 + 5) * this.nature.spDef),
      Math.floor(Math.floor(((this.pokemon.baseStats.speed * 2) + this.iv.speed + Math.floor(this.ev.speed / 4)) * this.level / 100 + 5) * this.nature.speed)
    )
  }
}
