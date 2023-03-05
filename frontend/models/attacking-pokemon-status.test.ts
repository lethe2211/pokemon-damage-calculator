import { Ability } from "./ability";
import { AttackingPokemonStatus } from "./attacking-pokemon-status";
import { BaseStats } from "./base-stats";
import { EV } from "./ev";
import { Item } from "./item";
import { IV } from "./iv";
import { Move } from "./move";
import { Nature } from "./nature";
import { Pokemon } from "./pokemon";
import { StatsRank } from "./stats-rank";
import { StatusAilment } from "./status-ailment";
import { TeraType } from "./tera-type";

describe("AttackingPokemonStatus#calculateStats", () => {
  test("Dragonite 1", () => {
    const attackingPokemonStatus = new AttackingPokemonStatus(
      new Pokemon(149),
      50,
      new IV(31, 31, 31, 31, 31, 31),
      new EV(0, 0, 0, 0, 0, 0),
      new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
      new StatsRank(0, 0, 0, 0, 0),
      new Move(200),
      new TeraType(0),
      new Ability(136),
      new Item(1),
      false,
      new StatusAilment(0)
    );

    const expected = attackingPokemonStatus.calculateStats();
    const actual = new BaseStats(166, 154, 115, 120, 120, 100);
    expect(expected).toEqual(actual);
  });

  test("Dragonite 2", () => {
    const attackingPokemonStatus = new AttackingPokemonStatus(
      new Pokemon(149),
      50,
      new IV(31, 31, 31, 31, 31, 31),
      new EV(252, 252, 0, 0, 0, 4),
      new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
      new StatsRank(0, 0, 0, 0, 0),
      new Move(200),
      new TeraType(0),
      new Ability(136),
      new Item(1),
      false,
      new StatusAilment(0)
    );

    const expected = attackingPokemonStatus.calculateStats();
    const actual = new BaseStats(198, 204, 115, 108, 120, 101);
    expect(actual).toEqual(expected);
  });
});
