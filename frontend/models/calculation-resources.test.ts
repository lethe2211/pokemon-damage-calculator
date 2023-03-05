import { Ability } from "./ability";
import { AttackingPokemonStatus } from "./attacking-pokemon-status";
import { CalculationResources } from "./calculation-resources";
import { DamageResult } from "./damage-result";
import { DefendingPokemonStatus } from "./defending-pokemon-status";
import { EnvironmentStatus } from "./environment-status";
import { EV } from "./ev";
import { Item } from "./item";
import { IV } from "./iv";
import { Move } from "./move";
import { Nature } from "./nature";
import { Pokemon } from "./pokemon";
import { StatsRank } from "./stats-rank";
import { StatusAilment } from "./status-ailment";
import { TeraType } from "./tera-type";

describe("CalculationResources#calculateDamage", () => {
  describe("Normal cases", () => {
    test('ドラパルト ->（りゅうせいぐん）-> サーフゴー', () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(887),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(434),
          new TeraType(0),
          new Ability(29),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(1000),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 4, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus()
      );

      const expected = new DamageResult(51, 60, 31.4, 37.0, 3, 4);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test('ドラパルト ->（りゅうせいぐん）-> サーフゴー 2', () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(887),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.1, 1.0, 1.0, 0.9, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(434),
          new TeraType(0),
          new Ability(29),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(1000),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 0, 252, 0),
          new Nature(0.9, 1.0, 1.0, 1.1, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus()
      );

      const expected = new DamageResult(28, 33, 14.4, 17.0, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe('Moves that have no effects', () => {
    test('エーフィ ->（サイコキネシス）-> ドドゲザン', () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(196),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(94),
          new TeraType(0),
          new Ability(29),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(983),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 0, 4),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus()
      );

      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    })
  });
});
