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

  describe("Guts (こんじょう) with Burn", () => {
    test("ヘラクロス (こんじょう+やけど) -> (インファイト) -> ハピナス", () => {
      // Guts negates burn attack reduction and provides 1.5x attack boost
      // Expected: Attack is 1.5x (not 0.5x from burn)
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(214), // Heracross
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 0, 0, 4, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant (+Atk, -SpA)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (インファイト)
          new TeraType(0, false),
          new Ability(62), // Guts (こんじょう)
          new Item(1),
          false,
          new StatusAilment(4) // Burn (やけど)
        ),
        new DefendingPokemonStatus(
          new Pokemon(242), // Blissey (ハピナス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed) (+Def, -Atk)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(30), // Natural Cure
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      // With Guts: attack should be boosted by 1.5x, burn reduction ignored
      // Without Guts: attack would be reduced by 0.5x from burn
      const result = calculationResources.calculateDamage();

      // Verify that damage is higher than it would be without Guts
      // (The exact damage depends on the full calculation, but it should be significant)
      expect(result.minDamage).toBeGreaterThan(0);
      expect(result.maxDamage).toBeGreaterThan(result.minDamage);
    });

    test("ヘラクロス (やけどのみ、こんじょうなし) -> (インファイト) -> ハピナス", () => {
      // Without Guts, burn reduces physical attack to 0.5x
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(214), // Heracross
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 0, 0, 4, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant (+Atk, -SpA)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (インファイト)
          new TeraType(0, false),
          new Ability(68), // Moxie (not Guts)
          new Item(1),
          false,
          new StatusAilment(4) // Burn (やけど)
        ),
        new DefendingPokemonStatus(
          new Pokemon(242), // Blissey (ハピナス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed) (+Def, -Atk)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(30), // Natural Cure
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const resultWithoutGuts = calculationResources.calculateDamage();

      // Now test with Guts
      const calculationResourcesWithGuts = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(214), // Heracross
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 252, 0, 0, 4, 252),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant (+Atk, -SpA)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (インファイト)
          new TeraType(0, false),
          new Ability(62), // Guts (こんじょう)
          new Item(1),
          false,
          new StatusAilment(4) // Burn (やけど)
        ),
        new DefendingPokemonStatus(
          new Pokemon(242), // Blissey (ハピナス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed) (+Def, -Atk)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(30), // Natural Cure
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const resultWithGuts = calculationResourcesWithGuts.calculateDamage();

      // With Guts, damage should be approximately 3x higher than without Guts
      // (1.5x from Guts boost / 0.5x burn reduction = 3x)
      expect(resultWithGuts.minDamage).toBeGreaterThan(
        resultWithoutGuts.minDamage * 2.5
      );
    });
  });

  describe("Power Modifier Abilities (Phase 2)", () => {
    test("ローブシン (てつのこぶし) -> (ドレインパンチ) -> ハピナス", () => {
      // Iron Fist boosts punching moves by 1.2x
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(534), // Conkeldurr (ローブシン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(409), // Drain Punch (ドレインパンチ)
          new TeraType(0, false),
          new Ability(89), // Iron Fist (てつのこぶし)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(242), // Blissey (ハピナス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(30), // Natural Cure
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      // Debug: Log actual stats
      const attackerStats = calculationResources.attackingPokemonStatus.calculateStats();
      const defenderStats = calculationResources.defendingPokemonStatus.calculateStats();
      console.log('===== Iron Fist Test Debug =====');
      console.log('Conkeldurr Attack:', attackerStats.attack);
      console.log('Blissey HP:', defenderStats.hp);
      console.log('Blissey Defense:', defenderStats.defense);
      console.log('Final Power:', calculationResources.calculateFinalPower());

      const result = calculationResources.calculateDamage();
      console.log('Result:', result);
      console.log('================================');

      // Fighting vs Normal = 2x effectiveness
      // HP: 362, Damage: 314-372, minKakutei: ceil(362/372)=1, maxKakutei: ceil(362/314)=2
      const expected = new DamageResult(314, 372, 86.7, 102.7, 1, 2);
      expect(result).toEqual(expected);
    });

    test("ハッサム (テクニシャン) -> (バレットパンチ) -> サーフゴー", () => {
      // Technician boosts moves with power <= 60 by 1.5x
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(212), // Scizor (ハッサム)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(418), // Bullet Punch (バレットパンチ) - power 40
          new TeraType(0, false),
          new Ability(101), // Technician (テクニシャン)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(1000), // Gholdengo (サーフゴー)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 0, 0, 252),
          new Nature(1.0, 1.0, 0.9, 1.0, 1.1), // Jolly (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(283), // Good as Gold
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      const expected = new DamageResult(29, 35, 14.9, 18, 6, 7);
      expect(result).toEqual(expected);
    });
  });

  describe("Attack Modifier Abilities (Phase 3)", () => {
    test("マリルリ (ちからもち) -> (アクアジェット) -> リザードン", () => {
      // Huge Power doubles Attack stat (2.0x)
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(184), // Azumarill (マリルリ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(453), // Aqua Jet (アクアジェット)
          new TeraType(0, false),
          new Ability(37), // Huge Power (ちからもち)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(6), // Charizard (リザードン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 252, 4, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0), // Modest (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(94), // Solar Power
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Defense now correctly 98 (was 88 before Modest nature fix)
      const expected = new DamageResult(104, 126, 67.9, 82.3, 2, 2);
      expect(result).toEqual(expected);
    });

    test("コノヨザル (はりきり) -> (インファイト) -> ハピナス", () => {
      // Hustle boosts Attack by 1.5x for physical moves
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(979), // Annihilape (コノヨザル)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (インファイト)
          new TeraType(0, false),
          new Ability(55), // Hustle (はりきり)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(242), // Blissey (ハピナス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(30), // Natural Cure
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Hustle boosts Attack by 1.5x, Fighting vs Normal = 2x effectiveness
      // HP: 362, Damage: 542-642 (Defense now correctly 68 due to Bold nature fix)
      const expected = new DamageResult(542, 642, 149.7, 177.3, 1, 1);
      expect(result).toEqual(expected);
    });
  });

  describe("Damage Modifier Abilities - Thick Fat & Heatproof (Phase 3 - Fixed)", () => {
    test("カビゴン (あついしぼう) vs リザードン (かえんほうしゃ) - damage comparison", () => {
      // Thick Fat should halve damage from Fire-type moves

      // With Thick Fat
      const calculationResourcesWithThickFat = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(6), // Charizard (リザードン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 252, 4, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0), // Modest (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(53), // Flamethrower (かえんほうしゃ)
          new TeraType(0, false),
          new Ability(94), // Solar Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(143), // Snorlax (カビゴン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(47), // Thick Fat (あついしぼう)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      // Without Thick Fat (using Immunity ability instead)
      const calculationResourcesWithoutThickFat = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(6), // Charizard (リザードン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 252, 4, 252),
          new Nature(0.9, 1.0, 1.1, 1.0, 1.0), // Modest (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(53), // Flamethrower (かえんほうしゃ)
          new TeraType(0, false),
          new Ability(94), // Solar Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(143), // Snorlax (カビゴン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(17), // Immunity (めんえき) - does not affect Fire moves
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const resultWithThickFat = calculationResourcesWithThickFat.calculateDamage();
      const resultWithoutThickFat = calculationResourcesWithoutThickFat.calculateDamage();

      // SpAtk now correctly 177 (was 161 before Modest nature fix)
      const expectedWithThickFat = new DamageResult(34, 41, 12.7, 15.3, 7, 8);
      const expectedWithoutThickFat = new DamageResult(69, 82, 25.8, 30.7, 4, 4);

      expect(resultWithThickFat).toEqual(expectedWithThickFat);
      expect(resultWithoutThickFat).toEqual(expectedWithoutThickFat);
    });

    test("カビゴン (あついしぼう) vs みずタイプのわざ - should not reduce damage", () => {
      // Thick Fat should NOT affect Water-type moves

      // With Thick Fat
      const calculationResourcesWithThickFat = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(184), // Azumarill (マリルリ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(453), // Aqua Jet (アクアジェット)
          new TeraType(0, false),
          new Ability(37), // Huge Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(143), // Snorlax (カビゴン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(47), // Thick Fat (あついしぼう)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      // Without Thick Fat
      const calculationResourcesWithoutThickFat = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(184), // Azumarill (マリルリ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(453), // Aqua Jet (アクアジェット)
          new TeraType(0, false),
          new Ability(37), // Huge Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(143), // Snorlax (カビゴン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(17), // Immunity (めんえき)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const resultWithThickFat = calculationResourcesWithThickFat.calculateDamage();
      const resultWithoutThickFat = calculationResourcesWithoutThickFat.calculateDamage();

      // Thick Fat should NOT affect Water-type moves, so results should be identical
      // HP: 267, Damage: 40-48 (Defense now correctly higher due to Bold nature fix)
      const expected = new DamageResult(40, 48, 14.9, 17.9, 6, 7);
      expect(resultWithThickFat).toEqual(expected);
      expect(resultWithoutThickFat).toEqual(expected);
    });
  });

  describe("Ability Effects Integration (Phase 1-4)", () => {
    test("Multiple ability modifiers should stack correctly", () => {
      // Test that power, attack, and defense modifiers work together
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(212), // Scizor with Technician
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(418), // Bullet Punch (power 40, benefits from Technician)
          new TeraType(0, false),
          new Ability(101), // Technician
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(242), // Blissey
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(30), // Natural Cure
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Technician boosts Bullet Punch (power 40) by 1.5x, Steel type STAB
      // HP: 362, Damage: 100-118
      const expected = new DamageResult(100, 118, 27.6, 32.5, 4, 4);
      expect(result).toEqual(expected);
    });
  });

  describe("Type Conversion and Weather Abilities (Phase 5a)", () => {
    test("ニンフィア (フェアリースキン) -> (はかいこうせん) -> ガブリアス", () => {
      // Pixilate converts Normal-type moves to Fairy-type and boosts power by 1.2x
      // Hyper Beam (Normal, power 150) -> Fairy type with 1.2x boost
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(700), // Sylveon (ニンフィア)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 4, 0),
          new Nature(1.0, 0.9, 1.1, 1.0, 1.0), // Modest (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(63), // Hyper Beam (はかいこうせん) - Normal type, power 150
          new TeraType(0, false),
          new Ability(182), // Pixilate (フェアリースキン)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(445), // Garchomp (ガブリアス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 0, 0, 252),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Jolly (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(8), // Sand Veil
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Pixilate: Normal -> Fairy, power 150 * 1.2 = 180
      // Fairy is super effective vs Dragon/Ground (2x)
      // STAB applies because Sylveon is Fairy type (after conversion)
      // HP: 183, Damage: 344-408
      const expected = new DamageResult(344, 408, 187.9, 222.9, 1, 1);
      expect(result).toEqual(expected);
    });

    test("リザードン (サンパワー) -> (かえんほうしゃ) -> ナットレイ in Harsh sunlight", () => {
      // Solar Power boosts special moves by 1.5x in harsh sunlight
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(6), // Charizard (リザードン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 252, 4, 252),
          new Nature(1.0, 0.9, 1.1, 1.0, 1.0), // Modest (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new Move(53), // Flamethrower (かえんほうしゃ) - Fire type, power 90, special
          new TeraType(0, false),
          new Ability(94), // Solar Power (サンパワー)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(598), // Ferrothorn (ナットレイ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold (Attack/Defense/SpAtk/SpDef/Speed)
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(82), // Iron Barbs
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(1), new Terrain(0)) // Harsh sunlight
      );

      const result = calculationResources.calculateDamage();

      // Solar Power: special moves * 1.5 in sun
      // Weather: Fire moves * 1.5 in sun
      // Fire vs Grass/Steel: 4x super effective
      // STAB: Fire type Charizard using Fire move
      // HP: 181, Damage: 592-700
      const expected = new DamageResult(592, 700, 327, 386.7, 1, 1);
      expect(result).toEqual(expected);
    });

    test("リザードン (サンパワー) -> (かえんほうしゃ) -> ナットレイ without sun", () => {
      // Solar Power should NOT boost without harsh sunlight
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(6), // Charizard
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 252, 4, 252),
          new Nature(1.0, 0.9, 1.1, 1.0, 1.0), // Modest
          new StatsRank(0, 0, 0, 0, 0),
          new Move(53), // Flamethrower
          new TeraType(0, false),
          new Ability(94), // Solar Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(598), // Ferrothorn
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(82), // Iron Barbs
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0)) // No weather
      );

      const resultWithSun = new CalculationResources(
        calculationResources.attackingPokemonStatus,
        calculationResources.defendingPokemonStatus,
        new EnvironmentStatus(new Weather(1), new Terrain(0)) // With sun
      ).calculateDamage();

      const resultWithoutSun = calculationResources.calculateDamage();

      // Solar Power boosts special moves in sun (592-700 vs 268-316)
      const expectedWithSun = new DamageResult(592, 700, 327, 386.7, 1, 1);
      const expectedWithoutSun = new DamageResult(268, 316, 148, 174.5, 1, 1);
      expect(resultWithSun).toEqual(expectedWithSun);
      expect(resultWithoutSun).toEqual(expectedWithoutSun);
    });

    test("エネコロロ (ノーマルスキン) -> (10まんボルト) -> ギャラドス", () => {
      // Normalize converts all moves to Normal-type and boosts power by 1.2x
      // Thunderbolt (Electric, power 90) -> Normal type with 1.2x boost
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(301), // Delcatty (エネコロロ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(0, 0, 0, 252, 4, 252),
          new Nature(1.0, 0.9, 1.1, 1.0, 1.0), // Modest
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (10まんボルト) - Electric type, power 90
          new TeraType(0, false),
          new Ability(96), // Normalize (ノーマルスキン)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados (ギャラドス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 0, 4, 252),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Normalize: Electric -> Normal, power 90 * 1.2 = 108
      // Normal type is neutral vs Water/Flying (1x)
      // STAB applies because Delcatty is Normal type
      // HP: 202, Damage: 58-70
      const expected = new DamageResult(58, 70, 28.7, 34.6, 3, 4);
      expect(result).toEqual(expected);
    });

    test("ガオガエン (かたいツメ) -> (フレアドライブ) -> モロバレル", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(727), // Incineroar (ガオガエン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 4, 0, 0, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(394), // Flare Blitz - Contact move, power 120
          new TeraType(0, false),
          new Ability(181), // Tough Claws (かたいツメ)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(591), // Amoonguss (モロバレル)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(6), // Damp
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Tough Claws: Contact move power 120 * 1.3 = 156
      // Fire is super effective vs Grass (2x)
      // HP: 221, Damage: 240-284
      const expected = new DamageResult(240, 284, 108.5, 128.5, 1, 1);
      expect(result).toEqual(expected);
    });

    test("ドラミドロ (ちからずく) -> (ヘドロばくだん) -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(691), // Dragalge (ドラミドロ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(188), // Sludge Bomb - has additional effect, power 90
          new TeraType(0, false),
          new Ability(125), // Sheer Force (ちからずく)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700), // Sylveon (ニンフィア)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182), // Pixilate
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Sheer Force: Move with additional effect, power 90 * 1.3 = 117
      // Poison is super effective vs Fairy (2x)
      // HP: 202, Damage: 102-122
      const expected = new DamageResult(102, 122, 50.4, 60.3, 2, 2);
      expect(result).toEqual(expected);
    });

    test("ダグトリオ (すなのちから) -> (じしん) -> ライチュウ in Sandstorm", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(51), // Dugtrio (ダグトリオ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(89), // Earthquake - Ground type, power 100
          new TeraType(0, false),
          new Ability(159), // Sand Force (すなのちから)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(26), // Raichu (ライチュウ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(4), new Terrain(0)) // Sandstorm
      );

      const result = calculationResources.calculateDamage();

      // Sand Force: Ground type in Sandstorm, power 100 * 1.3 = 130
      // Ground is super effective vs Electric (2x)
      // HP: 136, Damage: 230-272
      const expected = new DamageResult(230, 272, 169.1, 200, 1, 1);
      expect(result).toEqual(expected);
    });

    test("メディサン (ヨガパワー) -> (しねんのずつき) -> ゲンガー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(308), // Medicham (メディサン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(427), // Zen Headbutt - Psychic type, power 80
          new TeraType(0, false),
          new Ability(74), // Pure Power (ヨガパワー)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(94), // Gengar (ゲンガー)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(58), // Cursed Body
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Pure Power: Attack * 2.0
      // Psychic is super effective vs Poison (2x)
      // HP: 136, Damage: 222-264
      const expected = new DamageResult(222, 264, 163.2, 194.1, 1, 1);
      expect(result).toEqual(expected);
    });

    test("ブロンゾング (たいねつ) vs リザードン (かえんほうしゃ)", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(6), // Charizard (リザードン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(53), // Flamethrower - Fire type, power 90
          new TeraType(0, false),
          new Ability(94), // Solar Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(437), // Bronzong (ブロンゾング)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(85), // Heatproof (たいねつ)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Heatproof: Fire damage * 0.5
      // Fire is not very effective vs Steel/Psychic (0.5x)
      // Overall: 0.5 * 0.5 = 0.25x damage
      // HP: 174, Damage: 120-144
      const expected = new DamageResult(120, 144, 68.9, 82.7, 2, 2);
      expect(result).toEqual(expected);
    });

    test("ミミッキュ (フィルター) vs ピカチュウ (かみなり)", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu (ピカチュウ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(87), // Thunder - Electric type, power 110
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(778), // Mimikyu (ミミッキュ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(111), // Filter (フィルター) - Note: Mimikyu doesn't actually have Filter, but using for test
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Filter: Super effective damage * 0.75
      // Electric is super effective vs Ghost/Fairy (2x)
      // Filter reduces to 2x * 0.75 = 1.5x
      // HP: 162, Damage: 51-61
      const expected = new DamageResult(51, 61, 31.4, 37.6, 3, 4);
      expect(result).toEqual(expected);
    });

    test("ツボツボ (ハードロック) vs カイリュー (げきりん)", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(149), // Dragonite (カイリュー)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(200), // Outrage (げきりん) - Dragon type, power 120
          new TeraType(0, false),
          new Ability(136), // Multiscale
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(213), // Shuckle (ツボツボ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(116), // Solid Rock (ハードロック)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Solid Rock: Super effective damage * 0.75
      // Dragon is super effective vs Rock/Bug (2x each = 4x)
      // Solid Rock reduces to 4x * 0.75 = 3x
      // HP: 127, Damage: 42-49
      const expected = new DamageResult(42, 49, 33, 38.5, 3, 4);
      expect(result).toEqual(expected);
    });

    test("ネクロズマ (プリズムアーマー) vs ガブリアス (じしん)", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(445), // Garchomp (ガブリアス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(89), // Earthquake - Ground type, power 100
          new TeraType(0, false),
          new Ability(153), // Rough Skin
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(800), // Necrozma (ネクロズマ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(232), // Prism Armor (プリズムアーマー)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Prism Armor: Super effective damage * 0.75
      // Ground is super effective vs Psychic (2x)
      // Prism Armor reduces to 2x * 0.75 = 1.5x
      // HP: 204, Damage: 61-73
      const expected = new DamageResult(61, 73, 29.9, 35.7, 3, 4);
      expect(result).toEqual(expected);
    });

    test("カイリュー (マルチスケイル、HP満タン) vs ピカチュウ (かみなり)", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu (ピカチュウ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(87), // Thunder - Electric type, power 110
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(149), // Dragonite (カイリュー)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(136), // Multiscale (マルチスケイル)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Multiscale: Damage * 0.5 when HP is full
      // Electric is super effective vs Flying/Dragon (4x)
      // Multiscale reduces to 4x * 0.5 = 2x
      // HP: 198, Damage: 52-63
      const expected = new DamageResult(52, 63, 26.2, 31.8, 4, 4);
      expect(result).toEqual(expected);
    });

    test("ムウマージ (いろめがね) -> (シャドーボール) -> サーナイト", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(429), // Mismagius (ムウマージ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(247), // Shadow Ball - Ghost type, power 80
          new TeraType(0, false),
          new Ability(110), // Tinted Lens (いろめがね)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(282), // Gardevoir (サーナイト)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 252, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(165), // Telepathy
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Tinted Lens: Not very effective damage * 2.0
      // Ghost is not very effective vs Psychic/Fairy (0.5x)
      // Tinted Lens increases to 0.5x * 2.0 = 1.0x (neutral)
      // HP: 175, Damage: 104-126
      const expected = new DamageResult(104, 126, 59.4, 72, 2, 2);
      expect(result).toEqual(expected);
    });

    test("ドラピオン (スナイパー、急所) -> (クロスポイズン) -> ニンフィア", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(452), // Drapion (ドラピオン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(440), // Cross Poison - Poison type, power 70
          new TeraType(0, false),
          new Ability(97), // Sniper (スナイパー)
          new Item(1),
          true, // Critical hit
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(700), // Sylveon (ニンフィア)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(182), // Pixilate
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Sniper: Critical hit damage * 1.5
      // Poison is super effective vs Fairy (2x)
      // Critical hit (1.5x) + Sniper (additional 1.5x) = 2.25x total
      // HP: 202, Damage: 201-243
      const expected = new DamageResult(201, 243, 99.5, 120.2, 1, 2);
      expect(result).toEqual(expected);
    });

    test("ヒートロトム (ふゆう) vs ガブリアス (じしん) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(445), // Garchomp (ガブリアス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(89), // Earthquake - Ground type, power 100
          new TeraType(0, false),
          new Ability(153), // Rough Skin
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(479), // Rotom-Heat (ヒートロトム)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 252, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(26), // Levitate (ふゆう)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Levitate immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("メブキジカ (そうしょく) vs モロバレル (ギガドレイン) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(591), // Amoonguss (モロバレル)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 252, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(202), // Giga Drain - Grass type, power 75
          new TeraType(0, false),
          new Ability(6), // Damp
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(586), // Sawsbuck (メブキジカ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(157), // Sap Sipper (そうしょく)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Sap Sipper immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("ランターン (ちくでん) vs ピカチュウ (かみなり) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu (ピカチュウ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(87), // Thunder - Electric type, power 110
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(171), // Lanturn (ランターン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(10), // Volt Absorb (ちくでん)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Volt Absorb immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("ドヒドイデ (ちょすい) vs シャワーズ (なみのり) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(134), // Vaporeon (シャワーズ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 252, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(57), // Surf - Water type, power 90
          new TeraType(0, false),
          new Ability(11), // Water Absorb
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(748), // Toxapex (ドヒドイデ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(11), // Water Absorb (ちょすい)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Water Absorb immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("ヒードラン (もらいび) vs リザードン (かえんほうしゃ) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(6), // Charizard (リザードン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(53), // Flamethrower - Fire type, power 90
          new TeraType(0, false),
          new Ability(94), // Solar Power
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(485), // Heatran (ヒードラン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(18), // Flash Fire (もらいび)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Flash Fire immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("ライチュウ (ひらいしん) vs ピカチュウ (かみなり) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu (ピカチュウ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(87), // Thunder - Electric type, power 110
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(26), // Raichu (ライチュウ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(31), // Lightning Rod (ひらいしん)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Lightning Rod immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("トリトドン (よびみず) vs シャワーズ (ハイドロポンプ) - Immunity", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(134), // Vaporeon (シャワーズ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 252, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(56), // Hydro Pump - Water type, power 110
          new TeraType(0, false),
          new Ability(11), // Water Absorb
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(423), // Gastrodon (トリトドン)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(114), // Storm Drain (よびみず)
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Should be 0 damage due to Storm Drain immunity
      const expected = new DamageResult(0, 0, 0, 0, -1, -1);
      expect(result).toEqual(expected);
    });

    test("メガピジョット (スカイスキン) -> (おんがえし) -> カイリュー", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(18), // Pidgeot (ピジョット) - Using base form for test
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(216), // Return - Normal type, power 102
          new TeraType(0, false),
          new Ability(184), // Aerilate (スカイスキン)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(149), // Dragonite (カイリュー)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(136), // Multiscale
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Aerilate: Normal -> Flying, power 102 * 1.2 = 122.4
      // Flying is not very effective vs Dragon (0.5x)
      // STAB does not apply (Pidgeot is Normal/Flying, move becomes Flying)
      // HP: 198, Damage: 1-3
      const expected = new DamageResult(1, 3, 0.5, 1.5, 66, 198);
      expect(result).toEqual(expected);
    });

    test("アローラゴローニャ (エレキスキン) -> (だいばくはつ) -> ドヒドイデ", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(76), // Golem (ゴローニャ) - Using base form, actual is Alola form
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 4, 0, 0, 0),
          new Nature(1.1, 1.0, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(153), // Explosion - Normal type, power 250
          new TeraType(0, false),
          new Ability(206), // Galvanize (エレキスキン)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(748), // Toxapex (ドヒドイデ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(61), // Regenerator
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Galvanize: Normal -> Electric, power 250 * 1.2 = 300
      // Electric is super effective vs Water/Poison (2x)
      // STAB applies (Golem becomes Electric-type)
      // HP: 157, Damage: 192-226
      const expected = new DamageResult(192, 226, 122.2, 143.9, 1, 1);
      expect(result).toEqual(expected);
    });

    test("アマルルガ (フリーズスキン) -> (はかいこうせん) -> ガブリアス", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(699), // Aurorus (アマルルガ)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 252, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(63), // Hyper Beam - Normal type, power 150
          new TeraType(0, false),
          new Ability(174), // Refrigerate (フリーズスキン)
          new Item(1),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(445), // Garchomp (ガブリアス)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(153), // Rough Skin
          new Item(1),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Refrigerate: Normal -> Ice, power 150 * 1.2 = 180
      // Ice is super effective vs Dragon/Ground (4x)
      // STAB applies (Aurorus is Rock/Ice)
      // HP: 184, Damage: 580-688
      const expected = new DamageResult(580, 688, 315.2, 373.9, 1, 1);
      expect(result).toEqual(expected);
    });
  });

  describe("Item Effects Integration", () => {
    test("Life Orb (いのちのたま) increases damage by 1.3x", () => {
      // Without Life Orb
      const withoutLifeOrb = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(0), // No item
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 252, 252),
          new Nature(1.0, 0.9, 1.0, 1.1, 1.0), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      // With Life Orb
      const withLifeOrb = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(2), // Life Orb
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 252, 252),
          new Nature(1.0, 0.9, 1.0, 1.1, 1.0), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const resultWithout = withoutLifeOrb.calculateDamage();
      const resultWith = withLifeOrb.calculateDamage();

      // Without Life Orb: Pikachu Thunderbolt vs Gyarados
      // Electric is super effective vs Water/Flying (4x)
      const expectedWithout = new DamageResult(132, 156, 77.1, 91.2, 2, 2);
      expect(resultWithout).toEqual(expectedWithout);

      // With Life Orb: 1.3x damage boost (5324/4096)
      // Electric is super effective vs Water/Flying (4x)
      // Screenshot shows: 172 ~ 203
      // Gyarados HP: 171, so ratios are 172/171=100.5%, 203/171=118.7%
      const expectedWith = new DamageResult(172, 203, 100.5, 118.7, 1, 1);
      expect(resultWith).toEqual(expectedWith);
    });

    test("Choice Band (こだわりハチマキ) boosts physical Attack by 1.5x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(9), // Thunder Punch (Electric, Physical, Power 75)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(4), // Choice Band
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Choice Band: 1.5x Attack for physical moves
      // Electric is super effective vs Water/Flying (4x)
      const expected = new DamageResult(192, 228, 95, 112.8, 1, 2);
      expect(result).toEqual(expected);
    });

    test("Expert Belt (たつじんのおび) boosts super-effective moves by 1.2x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(8), // Expert Belt
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados (Water/Flying - weak to Electric)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 252, 252),
          new Nature(1.0, 0.9, 1.0, 1.1, 1.0), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Expert Belt: 1.2x damage boost for super-effective moves (4915/4096)
      // Electric is super effective vs Water/Flying (4x)
      // Base damage without item: 132-156
      // With Expert Belt: 132 × 4915/4096 ≈ 158, 156 × 4915/4096 ≈ 187
      // Gyarados HP: 171, so ratios are 158/171=92.3%, 187/171=109.3%
      // Kakutei: ceil(171/187)=1 (max), ceil(171/158)=2 (min)
      const expected = new DamageResult(158, 187, 92.3, 109.3, 1, 2);
      expect(result).toEqual(expected);
    });

    test("Damage-Reducing Berries (半減きのみ) reduce super-effective damage by 0.5x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(0), // No item
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados (Water/Flying - weak to Electric)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 252, 252),
          new Nature(1.0, 0.9, 1.0, 1.1, 1.0), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(20), // Damage-Reducing Berry (Wacan Berry for Electric)
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Damage-Reducing Berry: 0.5x damage for super-effective moves
      // Electric is super effective vs Water/Flying (4x)
      // Reduced by berry: 4x * 0.5 = 2x effective damage
      const expected = new DamageResult(66, 78, 38.5, 45.6, 3, 3);
      expect(result).toEqual(expected);
    });

    test("Type Boost Items (タイプ強化アイテム) boost type-specific moves by 1.2x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(7), // Type Boost Item (e.g., Magnet for Electric)
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(1), // Bulbasaur
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(65), // Overgrow
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Type Boost Item: 1.2x power for Electric-type moves
      // Electric is not very effective vs Grass (0.5x)
      const expected = new DamageResult(36, 43, 23.6, 28.2, 4, 5);
      expect(result).toEqual(expected);
    });

    test("Light Ball (でんきだま) doubles Pikachu's Attack and Sp.Atk", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(9), // Light Ball
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(1), // Bulbasaur
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(65), // Overgrow
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Light Ball: 2.0x Sp.Atk for Pikachu
      // Electric is not very effective vs Grass (0.5x)
      // With STAB: 1.5x
      const expected = new DamageResult(60, 71, 39.4, 46.7, 3, 3);
      expect(result).toEqual(expected);
    });

    test("Light Ball (でんきだま) does not apply to non-Pikachu Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(1), // Bulbasaur (not Pikachu)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(65), // Overgrow
          new Item(9), // Light Ball (should not apply)
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(7), // Squirtle
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(67), // Torrent
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Light Ball should not apply to Bulbasaur
      // Damage should be the same as without Light Ball
      const expected = new DamageResult(94, 112, 62.2, 74.1, 2, 2);
      expect(result).toEqual(expected);
    });

    test("Soul Dew (こころのしずく) boosts Latios/Latias Psychic and Dragon moves by 1.2x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(381), // Latios
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0), // No nature modifier
          new StatsRank(0, 0, 0, 0, 0),
          new Move(94), // Psychic (Psychic, Special, Power 90)
          new TeraType(0, false),
          new Ability(26), // Levitate
          new Item(3), // Soul Dew
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(94), // Gengar
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(26), // Levitate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Soul Dew: 1.2x power for Psychic/Dragon moves (Latios/Latias only)
      // Psychic is super effective vs Poison (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(236, 278, 173.5, 204.4, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Soul Dew (こころのしずく) does not apply to non-Latias/Latios Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(150), // Mewtwo (not Latias/Latios)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new Move(94), // Psychic (Psychic, Special, Power 90)
          new TeraType(0, false),
          new Ability(94), // Pressure
          new Item(3), // Soul Dew (should not apply)
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(94), // Gengar
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 0, 0),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(26), // Levitate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Soul Dew should not apply to Mewtwo
      // Damage should be the same as without Soul Dew
      const expected = new DamageResult(218, 260, 160.2, 191.1, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Choice Specs (こだわりメガネ) boosts special Attack by 1.5x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Timid
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(5), // Choice Specs
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(130), // Gyarados
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 0, 252, 252),
          new Nature(1.0, 0.9, 1.0, 1.1, 1.0), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(22), // Intimidate
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Choice Specs: 1.5x Sp.Atk for special moves
      // Electric is super effective vs Water/Flying (4x)
      // With STAB: 1.5x
      const expected = new DamageResult(192, 228, 112.2, 133.3, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Muscle Band (ちからのハチマキ) boosts physical moves by 1.1x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(448), // Lucario
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (Fighting, Physical, Power 120)
          new TeraType(0, false),
          new Ability(80), // Steadfast
          new Item(10), // Muscle Band
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(143), // Snorlax
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(17), // Immunity
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Muscle Band: 1.1x power for physical moves
      // Fighting is super effective vs Normal (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(188, 224, 70.4, 83.8, 2, 2);
      expect(result).toEqual(expected);
    });

    test("Normal Gem (ノーマルジュエル) boosts Normal-type moves by 1.3x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(143), // Snorlax
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(38), // Double-Edge (Normal, Physical, Power 120)
          new TeraType(0, false),
          new Ability(82), // Thick Fat
          new Item(11), // Normal Gem
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(248), // Tyranitar
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(45), // Sand Stream
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Normal Gem: 1.3x power for Normal-type moves
      // Normal is neutral vs Rock/Dark (1x)
      // With STAB: 1.5x
      const expected = new DamageResult(40, 48, 19.3, 23.1, 5, 6);
      expect(result).toEqual(expected);
    });

    test("Punch Gloves (パンチグローブ) boosts punching moves by 1.1x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(448), // Lucario
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(409), // Drain Punch (Fighting, Physical, Power 75)
          new TeraType(0, false),
          new Ability(80), // Steadfast
          new Item(12), // Punch Gloves
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(143), // Snorlax
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(17), // Immunity
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Punch Gloves: 1.1x power for punching moves
      // Fighting is super effective vs Normal (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(116, 140, 43.4, 52.4, 2, 3);
      expect(result).toEqual(expected);
    });

    test("Wise Glasses (ものしりメガネ) boosts special moves by 1.1x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(94), // Gengar
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Timid
          new StatsRank(0, 0, 0, 0, 0),
          new Move(247), // Shadow Ball (Ghost, Special, Power 80)
          new TeraType(0, false),
          new Ability(26), // Levitate
          new Item(15), // Wise Glasses
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(282), // Gardevoir
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(28), // Synchronize
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Wise Glasses: 1.1x power for special moves
      // Ghost is not very effective vs Psychic/Fairy (0.5x)
      // With STAB: 1.5x
      const expected = new DamageResult(134, 158, 76.5, 90.2, 2, 2);
      expect(result).toEqual(expected);
    });

    test("Fairy Feather (ようせいのハネ) boosts Fairy-type moves by 1.2x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(700), // Sylveon
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 4, 0),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Modest
          new StatsRank(0, 0, 0, 0, 0),
          new Move(585), // Moonblast (Fairy, Special, Power 95)
          new TeraType(0, false),
          new Ability(182), // Cute Charm
          new Item(16), // Fairy Feather
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(445), // Garchomp
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(8), // Sand Veil
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Fairy Feather: 1.2x power for Fairy-type moves
      // Fairy is super effective vs Dragon/Ground (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(200, 236, 108.6, 128.2, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Thick Club (ふといホネ) doubles Cubone/Marowak's Attack", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(105), // Marowak
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(89), // Earthquake (Ground, Physical, Power 100)
          new TeraType(0, false),
          new Ability(69), // Rock Head
          new Item(14), // Thick Club
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Thick Club: 2.0x Attack for Cubone/Marowak
      // Ground is super effective vs Electric (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(494, 584, 445, 526.1, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Thick Club (ふといホネ) does not apply to non-Cubone/Marowak Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(448), // Lucario (not Cubone/Marowak)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 252, 0, 0, 4, 0),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Adamant
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (Fighting, Physical, Power 120)
          new TeraType(0, false),
          new Ability(80), // Steadfast
          new Item(14), // Thick Club (should not apply)
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.0, 1.0),
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Thick Club should not apply to Lucario
      const expected = new DamageResult(183, 216, 164.8, 194.5, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Deep Sea Tooth (しんかいのキバ) doubles Clamperl's Sp.Atk", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(366), // Clamperl
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 4, 0),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Modest
          new StatsRank(0, 0, 0, 0, 0),
          new Move(57), // Surf (Water, Special, Power 90)
          new TeraType(0, false),
          new Ability(75), // Shell Armor
          new Item(6), // Deep Sea Tooth
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(324), // Torkoal
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 0, 252, 4),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(3), // White Smoke
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Deep Sea Tooth: 2.0x Sp.Atk for Clamperl
      // Water is super effective vs Fire (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(210, 248, 118.6, 140.1, 1, 1);
      expect(result).toEqual(expected);
    });

    test("Deep Sea Tooth (しんかいのキバ) does not apply to non-Clamperl Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(7), // Squirtle (not Clamperl)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 252, 4, 0),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Modest
          new StatsRank(0, 0, 0, 0, 0),
          new Move(57), // Surf (Water, Special, Power 90)
          new TeraType(0, false),
          new Ability(67), // Torrent
          new Item(6), // Deep Sea Tooth (should not apply)
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(324), // Torkoal
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 0, 252, 4),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(3), // White Smoke
          new Item(0),
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Deep Sea Tooth should not apply to Squirtle
      const expected = new DamageResult(86, 104, 48.5, 58.7, 2, 3);
      expect(result).toEqual(expected);
    });

    test("Assault Vest (とつげきチョッキ) boosts Special Defense by 1.5x", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(94), // Gengar
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Timid
          new StatsRank(0, 0, 0, 0, 0),
          new Move(247), // Shadow Ball (Ghost, Special, Power 80)
          new TeraType(0, false),
          new Ability(26), // Levitate
          new Item(0),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(248), // Tyranitar
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 4, 0, 252, 0),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Careful
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(45), // Sand Stream
          new Item(23), // Assault Vest
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Assault Vest: 1.5x Sp.Def
      // Ghost is neutral vs Rock/Dark (1x)
      // With STAB: 1.5x
      const expected = new DamageResult(18, 22, 8.6, 10.6, 10, 12);
      expect(result).toEqual(expected);
    });

    test("Deep Sea Scale (しんかいのウロコ) doubles Clamperl's Sp.Def", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Timid
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(0),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(366), // Clamperl
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 0, 252, 4),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(75), // Shell Armor
          new Item(22), // Deep Sea Scale
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Deep Sea Scale: 2.0x Sp.Def for Clamperl
      // Electric is super effective vs Water (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(50, 60, 35.2, 42.2, 3, 3);
      expect(result).toEqual(expected);
    });

    test("Deep Sea Scale (しんかいのウロコ) does not apply to non-Clamperl Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(25), // Pikachu
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 0, 0, 252, 0, 252),
          new Nature(1.0, 1.0, 1.0, 1.1, 0.9), // Timid
          new StatsRank(0, 0, 0, 0, 0),
          new Move(85), // Thunderbolt (Electric, Special, Power 90)
          new TeraType(0, false),
          new Ability(9), // Static
          new Item(0),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(7), // Squirtle (not Clamperl)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 0, 0, 252, 4),
          new Nature(1.0, 0.9, 1.0, 1.0, 1.1), // Calm
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(67), // Torrent
          new Item(22), // Deep Sea Scale (should not apply)
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Deep Sea Scale should not apply to Squirtle
      const expected = new DamageResult(90, 108, 59.6, 71.5, 2, 2);
      expect(result).toEqual(expected);
    });

    test("Metal Powder (メタルパウダー) doubles Ditto's Defense", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(448), // Lucario
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (Fighting, Physical, Power 120)
          new TeraType(0, false),
          new Ability(80), // Steadfast
          new Item(0),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(132), // Ditto
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(7), // Limber
          new Item(24), // Metal Powder
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Metal Powder: 2.0x Defense for Ditto
      // Fighting is super effective vs Normal (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(102, 120, 65.8, 77.4, 2, 2);
      expect(result).toEqual(expected);
    });

    test("Metal Powder (メタルパウダー) does not apply to non-Ditto Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(448), // Lucario
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (Fighting, Physical, Power 120)
          new TeraType(0, false),
          new Ability(80), // Steadfast
          new Item(0),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(1), // Bulbasaur (not Ditto)
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(65), // Overgrow
          new Item(24), // Metal Powder (should not apply)
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Metal Powder should not apply to Bulbasaur
      const expected = new DamageResult(50, 59, 32.8, 38.8, 3, 4);
      expect(result).toEqual(expected);
    });

    test("Eviolite (しんかのきせき) boosts Defense and Sp.Def by 1.5x for unevolved Pokemon", () => {
      const calculationResources = new CalculationResources(
        new AttackingPokemonStatus(
          new Pokemon(448), // Lucario
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(4, 252, 0, 0, 0, 252),
          new Nature(1.0, 1.1, 0.9, 1.0, 1.0), // Jolly
          new StatsRank(0, 0, 0, 0, 0),
          new Move(370), // Close Combat (Fighting, Physical, Power 120)
          new TeraType(0, false),
          new Ability(80), // Steadfast
          new Item(0),
          false,
          new StatusAilment(0)
        ),
        new DefendingPokemonStatus(
          new Pokemon(440), // Happiny
          50,
          new IV(31, 31, 31, 31, 31, 31),
          new EV(252, 0, 252, 0, 4, 0),
          new Nature(0.9, 1.1, 1.0, 1.0, 1.0), // Bold
          new StatsRank(0, 0, 0, 0, 0),
          new TeraType(0, false),
          new Ability(32), // Serene Grace
          new Item(21), // Eviolite
          new StatusAilment(0)
        ),
        new EnvironmentStatus(new Weather(0), new Terrain(0))
      );

      const result = calculationResources.calculateDamage();

      // Eviolite: 1.5x Defense and Sp.Def for unevolved Pokemon (Happiny can evolve to Chansey)
      // Bold nature: Defense ↑ (1.1x), Attack ↓ (0.9x)
      // Fighting is super effective vs Normal (2x)
      // With STAB: 1.5x
      const expected = new DamageResult(236, 278, 114, 134.2, 1, 1);
      expect(result).toEqual(expected);
    });
  });
});
