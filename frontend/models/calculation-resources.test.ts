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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
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
        new EnvironmentStatus()
      );

      const expected = new DamageResult(30, 36, 15.6, 18.7, 6, 7);
      const actual = calculationResources.calculateDamage();
      expect(actual).toEqual(expected);
    });
  });
});
