import { Type } from "./type";
import pokemonDataSv from "../data/pokemon_data_sv.json";
import { BaseStats } from "./base-stats";
import { Move } from "./move";

export class Pokemon {
  id: number;
  nameEn: string;
  nameJp: string;
  type1: Type;
  type2: Type | null;
  baseStats: BaseStats;
  moves: Move[];

  static allValidSVPokemons: Pokemon[] | null = null;

  constructor(id: number) {
    this.id = id;

    const data = pokemonDataSv.filter((e) => e["id"] == id)[0];

    this.nameEn = data.name_en;
    this.nameJp = data.name_jp;
    this.type1 = new Type(data.type1);
    this.type2 = data.type2 === null ? null : new Type(data.type2);
    this.baseStats = new BaseStats(
      data.base_stats.hp,
      data.base_stats.attack,
      data.base_stats.defense,
      data.base_stats.sp_atk,
      data.base_stats.sp_def,
      data.base_stats.speed
    );
    this.moves = data.moves.map((e) => new Move(e));
  }

  static listAllValidSVPokemons(): Pokemon[] {
    // Cache for performance
    if (Pokemon.allValidSVPokemons === null) {
      Pokemon.allValidSVPokemons = pokemonDataSv
        .filter((e) => e.sv == true)
        .map((e) => new Pokemon(e.id));
      return Pokemon.allValidSVPokemons;
    } else {
      return Pokemon.allValidSVPokemons;
    }
  }
}
