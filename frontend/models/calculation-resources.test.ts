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
import { Terrain } from "./terrain";
import { Weather } from "./weather";

describe("CalculationResources#calculateDamage", () => {
  describe("Normal cases", () => {
    test("ドラパルト ->（りゅうせいぐん）-> サーフゴー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(887),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(434),
          new TeraType(0, false),
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
          new TeraType(0, false),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(51, 60, 31.4, 37.0, 3, 4);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラパルト ->（りゅうせいぐん）-> サーフゴー 2", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(887),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.1, 1.0, 1.0, 0.9, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(434),
          new TeraType(0, false),
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
          new TeraType(0, false),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(28, 33, 14.4, 17.0, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Moves that have no effects", () => {
    test("エーフィ ->（サイコキネシス）-> ドドゲザン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(196),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(94),
          new TeraType(0, false),
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
          new TeraType(0, false),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Too few damage", () => {
    test("イーブイ ->（たいあたり）-> ヘイラッシャ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(133),
          1,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 0, 0, 0),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(-6, 0, 0, 0, 0),
          new Move(33),
          new TeraType(0, false),
          new Ability(50),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(977),
          100,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 0, 4),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 6, 0, 0, 0),
          new TeraType(0, false),
          new Ability(109),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(1, 3, 0.1, 0.5, 168, 504);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Critical hit", () => {
    test("マスカーニャ -> （トリックフラワー） -> ウォッシュロトム", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(908),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(870),
          new TeraType(0, false),
          new Ability(65),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(10009),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(26),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(74, 90, 47.1, 57.3, 2, 3);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("マスカーニャ -> （トリックフラワー、急所） -> ウォッシュロトム", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(908),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(870),
          new TeraType(0, false),
          new Ability(65),
          new Item(1),
          true,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(10009),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(26),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(114, 134, 72.6, 85.3, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("マスカーニャ Atk+1 -> （トリックフラワー、急所） -> ウォッシュロトム Def+1（無視）", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(908),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(1, 0, 0, 0, 0),
          new Move(870),
          new TeraType(0, false),
          new Ability(26),
          new Item(1),
          true,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(10009),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 1, 0, 0, 0),
          new TeraType(0, false),
          new Ability(65),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(168, 200, 107.0, 127.3, 1, 1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("マスカーニャ Atk-6（無視） -> （トリックフラワー、急所） -> ウォッシュロトム Def-6", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(908),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(-6, 0, 0, 0, 0),
          new Move(870),
          new TeraType(0, false),
          new Ability(29),
          new Item(1),
          true,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(10009),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, -6, 0, 0, 0),
          new TeraType(0, false),
          new Ability(283),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(450, 530, 286.6, 337.5, 1, 1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Status ailments", () => {
    test("ボーマンダ -> （げきりん） -> ブラッキー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(373),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(200),
          new TeraType(0, false),
          new Ability(22),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(197),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(39),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(72, 85, 35.6, 42.0, 3, 3);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ボーマンダ（やけど） -> （げきりん） -> ブラッキー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(373),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(200),
          new TeraType(0, false),
          new Ability(22),
          new Item(1),
          false,
          new StatusAilment(4)
        ),
        new DefendingPokemonStatus(
          new Pokemon(197),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(39),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(36, 42, 17.8, 20.7, 5, 6);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ボーマンダ -> （だいもんじ） -> ブラッキー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(373),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(126),
          new TeraType(0, false),
          new Ability(22),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(197),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(39),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(33, 39, 16.3, 19.3, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ボーマンダ（やけど） -> （だいもんじ） -> ブラッキー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(373),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(126),
          new TeraType(0, false),
          new Ability(22),
          new Item(1),
          false,
          new StatusAilment(4)
        ),
        new DefendingPokemonStatus(
          new Pokemon(197),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(39),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(33, 39, 16.3, 19.3, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Terastal", () => {
    test("ドラミドロ（テラスタルどく、てきおうりょく） -> （ヘドロばくだん） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(4, true),
          new Ability(91),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(152, 184, 75.2, 91.0, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（テラスタルどく、てきおうりょく適用なし） -> （ヘドロばくだん） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(4, true),
          new Ability(38),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(136, 164, 67.3, 81.1, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（テラスタルみず、てきおうりょく適用なし） -> （ヘドロばくだん） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(11, true),
          new Ability(38),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(102, 122, 50.4, 60.3, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（テラスタルみず、てきおうりょく） -> （なみのり） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(57),
          new TeraType(11, true),
          new Ability(91),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(68, 82, 33.6, 40.5, 3, 3);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（テラスタルみず、てきおうりょく適用なし） -> （なみのり） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(57),
          new TeraType(11, true),
          new Ability(38),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(51, 61, 25.2, 30.1, 4, 4);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（てきおうりょく適用なし） -> （ヘドロばくだん） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(11, false),
          new Ability(38),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(102, 122, 50.4, 60.3, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（てきおうりょく） -> （ヘドロばくだん） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(11, false),
          new Ability(91),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(136, 164, 67.3, 81.1, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ（てきおうりょく） -> （なみのり） -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(57),
          new TeraType(11, false),
          new Ability(91),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(34, 41, 16.8, 20.2, 5, 6);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ -> （ヘドロばくだん） -> ニンフィア（テラスタルはがね）", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(11, false),
          new Ability(38),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(9, true),
          new Ability(182),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(0, 0, 0.0, 0.0, -1, -1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ドラミドロ -> （ヘドロばくだん） -> デカヌチャン（テラスタルどく）", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188),
          new TeraType(11, false),
          new Ability(38),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(959),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 0, 4),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(4, true),
          new Ability(104),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(30, 36, 15.6, 18.7, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Weather", () => {
    test("コータス -> （オーバーヒート） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(324),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(315),
          new TeraType(0, false),
          new Ability(70),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(50, 59, 24.1, 28.5, 4, 5);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("コータス -> （オーバーヒート、にほんばれ） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(324),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(315),
          new TeraType(0, false),
          new Ability(70),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(1), new Terrain(0))
      );

      const expected = new DamageResult(75, 88, 36.2, 42.5, 3, 3);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("コータス -> （オーバーヒート、あめ） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(324),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(315),
          new TeraType(0, false),
          new Ability(70),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(2), new Terrain(0))
      );

      const expected = new DamageResult(24, 29, 11.5, 14.0, 8, 9);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("シャワーズ -> （ハイドロポンプ） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(134),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(56),
          new TeraType(0, false),
          new Ability(11),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(200, 236, 96.6, 114.0, 1, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("シャワーズ -> （ハイドロポンプ、にほんばれ） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(134),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(56),
          new TeraType(0, false),
          new Ability(11),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(1), new Terrain(0))
      );

      const expected = new DamageResult(98, 116, 47.3, 56.0, 2, 3);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("シャワーズ -> （ハイドロポンプ、あめ） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(134),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(56),
          new TeraType(0, false),
          new Ability(11),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(2), new Terrain(0))
      );

      const expected = new DamageResult(300, 354, 144.9, 171.0, 1, 1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("コータス -> （オーバーヒート、すなあらし） -> キョジオーン", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(324),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(315),
          new TeraType(0, false),
          new Ability(70),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(934),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(272),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(3), new Terrain(0))
      );

      const expected = new DamageResult(33, 39, 15.9, 18.8, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("コノヨザル -> （ドレインパンチ、ゆき） -> グレイシア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(979),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 0, 4),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(409),
          new TeraType(0, false),
          new Ability(128),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(471),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 0, 4),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(81),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(4), new Terrain(0))
      );

      const expected = new DamageResult(80, 96, 46.5, 55.8, 2, 3);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });

  describe("Terrain", () => {
    test("バチンウニ -> （10まんボルト） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(871),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85),
          new TeraType(0, false),
          new Ability(226),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const expected = new DamageResult(146, 174, 83.4, 99.4, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("バチンウニ -> （10まんボルト、エレキフィールド） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(871),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85),
          new TeraType(0, false),
          new Ability(226),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(1))
      );

      const expected = new DamageResult(188, 224, 107.4, 128.0, 1, 1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("タイカイデン（ひこうタイプ） -> （10まんボルト、エレキフィールド） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(941),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85),
          new TeraType(0, false),
          new Ability(277),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(1))
      );

      const expected = new DamageResult(162, 192, 92.5, 109.7, 1, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("バチンウニ（テラスタルひこう） -> （10まんボルト、エレキフィールド） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(871),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85),
          new TeraType(3, true),
          new Ability(226),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(1))
      );

      const expected = new DamageResult(146, 174, 83.4, 99.4, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("ヒートロトム（ふゆう） -> （10まんボルト、エレキフィールド） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(10008),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85),
          new TeraType(0, false),
          new Ability(26),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(1))
      );

      const expected = new DamageResult(162, 192, 92.5, 109.7, 1, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("オリーヴァ -> （リーフストーム、グラスフィールド） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(930),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(437),
          new TeraType(0, false),
          new Ability(269),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(2))
      );

      const expected = new DamageResult(276, 326, 157.7, 186.2, 1, 1);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("オノノクス -> （げきりん、ミストフィールド） -> テツノドグガ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(612),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(200),
          new TeraType(0, false),
          new Ability(104),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(994),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(0.9, 1.0, 1.0, 1.0, 1.1),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(282),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(3))
      );

      const expected = new DamageResult(84, 100, 53.8, 64.1, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });

    test("イエッサン（オスのすがた） -> （サイコキネシス、サイコフィールド） -> マリルリ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(876),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(94),
          new TeraType(0, false),
          new Ability(227),
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(184),
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 4, 0, 0, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(37),
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(4))
      );

      const expected = new DamageResult(103, 123, 58.8, 70.2, 2, 2);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });
});
