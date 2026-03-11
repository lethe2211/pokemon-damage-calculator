import { roundDown, roundOffIncluding5 } from "../lib/util";
import { Ability } from "./ability";
import { AttackingPokemonStatus } from "./attacking-pokemon-status";
import { DamageResult } from "./damage-result";
import { DefendingPokemonStatus } from "./defending-pokemon-status";
import { EnvironmentStatus } from "./environment-status";
import { MoveCategory } from "./move";
import { Stats } from "./stats";
import { StatusAilment } from "./status-ailment";
import { Terrain } from "./terrain";
import { Type, TypeCompatibility } from "./type";
import { Weather } from "./weather";
import { AbilityEffectRegistry } from "./ability-effects/ability-effect-registry";
import { AbilityEffectContext } from "./ability-effects/ability-effect-types";

export class CalculationResources {
  attackingPokemonStatus: AttackingPokemonStatus;
  defendingPokemonStatus: DefendingPokemonStatus;
  environmentStatus: EnvironmentStatus;

  constructor(
    attackingPokemonStatus: AttackingPokemonStatus,
    defendingPokemonStatus: DefendingPokemonStatus,
    environmentStatus: EnvironmentStatus
  ) {
    this.attackingPokemonStatus = attackingPokemonStatus;
    this.defendingPokemonStatus = defendingPokemonStatus;
    this.environmentStatus = environmentStatus;
  }

  public updateAttackingPokemonStatus(
    attackingPokemonStatus: AttackingPokemonStatus
  ): CalculationResources {
    return new CalculationResources(
      attackingPokemonStatus,
      this.defendingPokemonStatus,
      this.environmentStatus
    );
  }

  /**
   * Get the effective type of the move after type conversion abilities.
   * Type conversion abilities (Pixilate, Aerilate, Galvanize, Refrigerate)
   * convert Normal-type moves to another type.
   * @returns The effective type of the move (converted or original)
   */
  private getEffectiveMoveType(): Type {
    const abilityRegistry = AbilityEffectRegistry.getInstance();
    const context: AbilityEffectContext = {
      attackingPokemon: this.attackingPokemonStatus,
      defendingPokemon: this.defendingPokemonStatus,
      environment: this.environmentStatus,
      move: this.attackingPokemonStatus.move,
    };

    const conversion = abilityRegistry.getTypeConversion(context);
    if (conversion) {
      return conversion.targetType;
    }

    return this.attackingPokemonStatus.move.type;
  }

  // 【2】最終威力
  calculateFinalPower(): number {
    let power = this.attackingPokemonStatus.move.power;

    // TODO:
    // オーラブレイク× 3072 ÷ 4096 → 四捨五入
    // とうそうしん弱化× 3072 ÷ 4096 → 四捨五入
    // そうだいしょう(1体)× 4506 ÷ 4096 → 四捨五入
    // エレキスキン× 4915 ÷ 4096 → 四捨五入
    // スカイスキン× 4915 ÷ 4096 → 四捨五入
    // ノーマルスキン× 4915 ÷ 4096 → 四捨五入
    // フェアリースキン× 4915 ÷ 4096 → 四捨五入
    // フリーズスキン× 4915 ÷ 4096 → 四捨五入
    // てつのこぶし× 4915 ÷ 4096 → 四捨五入
    // すてみ× 4915 ÷ 4096 → 四捨五入
    // そうだいしょう(2体)× 4915 ÷ 4096 → 四捨五入
    // とうそうしん強化× 5120 ÷ 4096 → 四捨五入
    // バッテリー× 5325 ÷ 4096 → 四捨五入
    // ちからずく× 5325 ÷ 4096 → 四捨五入
    // すなのちから× 5325 ÷ 4096 → 四捨五入
    // アナライズ× 5325 ÷ 4096 → 四捨五入
    // かたいツメ× 5325 ÷ 4096 → 四捨五入
    // そうだいしょう(3体)× 5325 ÷ 4096 → 四捨五入
    // パンクロック× 5325 ÷ 4096 → 四捨五入
    // パワースポット× 5325 ÷ 4096 → 四捨五入
    // フェアリーオーラ× 5448 ÷ 4096 → 四捨五入
    // ダークオーラ× 5448 ÷ 4096 → 四捨五入
    // そうだいしょう(4体)× 5734 ÷ 4096 → 四捨五入
    // きれあじ× 6144 ÷ 4096 → 四捨五入
    // テクニシャン× 6144 ÷ 4096 → 四捨五入
    // ねつぼうそう× 6144 ÷ 4096 → 四捨五入
    // どくぼうそう× 6144 ÷ 4096 → 四捨五入
    // がんじょうあご× 6144 ÷ 4096 → 四捨五入
    // メガランチャー× 6144 ÷ 4096 → 四捨五入
    // はがねのせいしん× 6144 ÷ 4096 → 四捨五入
    // そうだいしょう(5体)× 6144 ÷ 4096 → 四捨五入
    // たいねつ× 2048 ÷ 4096 → 四捨五入
    // かんそうはだ× 5120 ÷ 4096 → 四捨五入
    // ちからのハチマキ× 4505 ÷ 4096 → 四捨五入
    // ものしりメガネ× 4505 ÷ 4096 → 四捨五入
    // パンチグローブ× 4506 ÷ 4096 → 四捨五入
    // プレート、もくたん、おこう等× 4915 ÷ 4096 → 四捨五入
    // こんごうだま× 4915 ÷ 4096 → 四捨五入
    // しらたま× 4915 ÷ 4096 → 四捨五入
    // はっきんだま× 4915 ÷ 4096 → 四捨五入
    // こころのしずく※× 4915 ÷ 4096 → 四捨五入
    // ノーマルジュエル× 5325 ÷ 4096 → 四捨五入
    // ソーラービーム+雨等× 2048 ÷ 4096 → 四捨五入
    // ソーラーブレード+雨等× 2048 ÷ 4096 → 四捨五入
    // さきどり× 6144 ÷ 4096 → 四捨五入
    // はたきおとす× 6144 ÷ 4096 → 四捨五入
    // てだすけ× 6144 ÷ 4096 → 四捨五入
    // Gのちから+じゅうりょく× 6144 ÷ 4096 → 四捨五入
    // ワイドフォース+サイコフィールド× 6144 ÷ 4096 → 四捨五入
    // じゅうでん× 8192 ÷ 4096 → 四捨五入
    // からげんき+状態異常× 8192 ÷ 4096 → 四捨五入
    // しおみず+HP半分以下× 8192 ÷ 4096 → 四捨五入
    // ベノムショック+どく・もうどく× 8192 ÷ 4096 → 四捨五入
    // かたきうち+前ターンに味方が倒されている× 8192 ÷ 4096 → 四捨五入
    // クロスサンダー+クロスフレイムの後× 8192 ÷ 4096 → 四捨五入
    // クロスフレイム+クロスサンダーの後× 8192 ÷ 4096 → 四捨五入
    // ライジングボルト+エレキフィールド× 8192 ÷ 4096 → 四捨五入

    // Ability-based power modifiers
    const abilityRegistry = AbilityEffectRegistry.getInstance();
    const context: AbilityEffectContext = {
      attackingPokemon: this.attackingPokemonStatus,
      defendingPokemon: this.defendingPokemonStatus,
      environment: this.environmentStatus,
      move: this.attackingPokemonStatus.move,
      currentPower: power,
    };
    const abilityPowerModifier = abilityRegistry.getPowerModifier(context);
    power = roundOffIncluding5((power * abilityPowerModifier) / 4096);

    // Type conversion abilities (Pixilate, Aerilate, Galvanize, Refrigerate)
    // These abilities convert Normal-type moves to another type and boost power by 20%
    const typeConversion = abilityRegistry.getTypeConversion(context);
    if (typeConversion) {
      power = roundOffIncluding5((power * typeConversion.powerModifier) / 4096);
    }

    // フィールド弱化	× 2048 ÷ 4096 → 四捨五入
    power = roundOffIncluding5(
      (power * this.calculateNegativeAdjustmentByTerrain()) / 4096
    );

    // フィールド強化	× 5325 ÷ 4096 → 四捨五入
    power = roundOffIncluding5(
      (power * this.calculatePositiveAdjustmentByTerrain()) / 4096
    );

    // TODO:
    // みずあそび× 1352 ÷ 4096 → 四捨五入
    // どろあそび× 1352 ÷ 4096 → 四捨五入

    if (power < 1) {
      return 1;
    }
    /* eslint-disable no-constant-condition */
    // TODO: Need to exclude some moves that will not be the target of this adjustment
    else if (
      this.attackingPokemonStatus.move.type.equals(
        this.attackingPokemonStatus.teraType.type
      ) &&
      false
    ) {
      return 60;
    }
    /* eslint-enable no-constant-condition */
    else {
      return power;
    }
  }

  calculateNegativeAdjustmentByTerrain(): number {
    const type1 = this.defendingPokemonStatus.teraType.isEnabled
      ? this.defendingPokemonStatus.teraType.type
      : this.defendingPokemonStatus.pokemon.type1;
    const type2 = this.defendingPokemonStatus.teraType.isEnabled
      ? null
      : this.defendingPokemonStatus.pokemon.type2;

    // 「浮いている」 := 以下のいずれか
    // ひこうタイプのポケモン
    // 特性がふゆうのポケモン
    // TODO: ふうせんを持っているポケモン
    // TODO: でんじふゆう状態・テレキネシス状態のポケモン
    const defendingPokemonIsFloating =
      type1.equals(Type.fromNameEn("Flying")) ||
      (type2 !== null && type2.equals(Type.fromNameEn("Flying"))) ||
      this.defendingPokemonStatus.ability.equals(new Ability(26));

    if (!defendingPokemonIsFloating) {
      if (
        this.environmentStatus.terrain.equals(
          Terrain.fromNameEn("Grassy Terrain")
        )
      ) {
        return 4096;
        // TODO: グラスフィールド下で「じしん」「じならし」の威力が0.5倍（<-どの値？）
      } else if (
        // ミストフィールド下でドラゴン技の威力が0.5倍
        this.environmentStatus.terrain.equals(
          Terrain.fromNameEn("Misty Terrain")
        ) &&
        this.getEffectiveMoveType().equals(Type.fromNameEn("Dragon"))
      ) {
        return 2048;
      } else {
        return 4096;
      }
    } else {
      return 4096;
    }
  }

  calculatePositiveAdjustmentByTerrain(): number {
    const type1 = this.attackingPokemonStatus.teraType.isEnabled
      ? this.attackingPokemonStatus.teraType.type
      : this.attackingPokemonStatus.pokemon.type1;
    const type2 = this.attackingPokemonStatus.teraType.isEnabled
      ? null
      : this.attackingPokemonStatus.pokemon.type2;

    const attackingPokemonIsFloating =
      type1.equals(Type.fromNameEn("Flying")) ||
      (type2 !== null && type2.equals(Type.fromNameEn("Flying"))) ||
      this.attackingPokemonStatus.ability.equals(new Ability(26));

    if (!attackingPokemonIsFloating) {
      if (
        this.environmentStatus.terrain.equals(
          Terrain.fromNameEn("Electric Terrain")
        )
      ) {
        if (this.getEffectiveMoveType().equals(Type.fromNameEn("Electric"))) {
          return 5325;
        } else {
          return 4096;
        }
      } else if (
        this.environmentStatus.terrain.equals(
          Terrain.fromNameEn("Grassy Terrain")
        ) &&
        this.getEffectiveMoveType().equals(Type.fromNameEn("Grass"))
      ) {
        return 5325;
      } else if (
        this.environmentStatus.terrain.equals(
          Terrain.fromNameEn("Misty Terrain")
        )
      ) {
        return 4096;
        // TODO: ミストフィールド下で「ミストバースト」の威力が1.5倍（<-どの値？）
      } else if (
        this.environmentStatus.terrain.equals(
          Terrain.fromNameEn("Psychic Terrain")
        ) &&
        this.getEffectiveMoveType().equals(Type.fromNameEn("Psychic"))
      ) {
        return 5325;
      } else {
        return 4096;
      }
    } else {
      return 4096;
    }
  }

  calculateFinalAttack(attackerStats: Stats): number {
    let attackValue = 0;
    if (
      this.attackingPokemonStatus.move.category.equals(
        MoveCategory.fromNameEn("Physical")
      )
    ) {
      // 攻撃側のこうげき × こうげきランク → 切り捨て
      attackValue = roundDown(
        attackerStats.attack *
          this.calculateFinalAttackAdjustmentByStatsRank(
            this.attackingPokemonStatus.statsRank.attack
          )
      );

      // TODO: はりきり 6144 ÷ 4096 → 切り捨て
      attackValue = attackValue; // eslint-disable-line no-self-assign

      // Ability-based attack modifiers
      const abilityRegistry = AbilityEffectRegistry.getInstance();
      const context: AbilityEffectContext = {
        attackingPokemon: this.attackingPokemonStatus,
        defendingPokemon: this.defendingPokemonStatus,
        environment: this.environmentStatus,
        move: this.attackingPokemonStatus.move,
        currentAttack: attackValue,
      };
      const adjustment = abilityRegistry.getAttackModifier(context);

      // ×【3】攻撃の補正値 ÷ 4096 → 五捨五超入
      attackValue = roundOffIncluding5((attackValue * adjustment) / 4096);

      // 1より小さければ1にする
      if (attackValue < 1) attackValue = 1;
    } else if (
      this.attackingPokemonStatus.move.category.equals(
        MoveCategory.fromNameEn("Special")
      )
    ) {
      // 攻撃側のとくこう × とくこうランク → 切り捨て
      attackValue = roundDown(
        attackerStats.spAtk *
          this.calculateFinalAttackAdjustmentByStatsRank(
            this.attackingPokemonStatus.statsRank.spAtk
          )
      );

      // Ability-based attack modifiers (special)
      const abilityRegistry = AbilityEffectRegistry.getInstance();
      const context: AbilityEffectContext = {
        attackingPokemon: this.attackingPokemonStatus,
        defendingPokemon: this.defendingPokemonStatus,
        environment: this.environmentStatus,
        move: this.attackingPokemonStatus.move,
        currentAttack: attackValue,
      };
      const adjustment = abilityRegistry.getAttackModifier(context);

      // ×【3】攻撃の補正値 ÷ 4096 → 五捨五超入
      attackValue = roundOffIncluding5((attackValue * adjustment) / 4096);

      // 1より小さければ1にする
      if (attackValue < 1) attackValue = 1;
    } else {
      console.error("Move is neither a physical one nor a special one");
    }

    return attackValue;
  }

  calculateFinalAttackAdjustmentByStatsRank(statsRankValue: number): number {
    if (this.attackingPokemonStatus.isCriticalHit) {
      // Ignore a negative attack stats rank if critical hit
      switch (statsRankValue) {
        case 6:
          return 8 / 2;
        case 5:
          return 7 / 2;
        case 4:
          return 6 / 2;
        case 3:
          return 5 / 2;
        case 2:
          return 4 / 2;
        case 1:
          return 3 / 2;
        case 0:
          return 1;
        case -1:
          return 1;
        case -2:
          return 1;
        case -3:
          return 1;
        case -4:
          return 1;
        case -5:
          return 1;
        case -6:
          return 1;
        default:
          console.log(`Stats Rank must be -6 ~ 6: ${statsRankValue}`);
          return 1;
      }
    } else {
      switch (statsRankValue) {
        case 6:
          return 8 / 2;
        case 5:
          return 7 / 2;
        case 4:
          return 6 / 2;
        case 3:
          return 5 / 2;
        case 2:
          return 4 / 2;
        case 1:
          return 3 / 2;
        case 0:
          return 1;
        case -1:
          return 2 / 3;
        case -2:
          return 2 / 4;
        case -3:
          return 2 / 5;
        case -4:
          return 2 / 6;
        case -5:
          return 2 / 7;
        case -6:
          return 2 / 8;
        default:
          console.log(`Stats Rank must be -6 ~ 6: ${statsRankValue}`);
          return 1;
      }
    }
  }

  calculateFinalDefense(defenderStats: Stats): number {
    let defenseValue = 0;

    const type1 = this.defendingPokemonStatus.teraType.isEnabled
      ? this.defendingPokemonStatus.teraType.type
      : this.defendingPokemonStatus.pokemon.type1;
    const type2 = this.defendingPokemonStatus.teraType.isEnabled
      ? null
      : this.defendingPokemonStatus.pokemon.type2;

    if (
      this.attackingPokemonStatus.move.category.equals(
        MoveCategory.fromNameEn("Physical")
      )
    ) {
      // 防御側のぼうぎょ×ランク→切り捨て
      defenseValue = roundDown(
        defenderStats.defense *
          this.calculateFinalDefenseAdjustmentByStatsRank(
            this.defendingPokemonStatus.statsRank.defense
          )
      );

      // ゆき+こおりタイプでぼうぎょ強化6144÷4096→切り捨て
      if (
        this.environmentStatus.weather.equals(Weather.fromNameEn("Snow")) &&
        (type1.equals(Type.fromNameEn("Ice")) ||
          (type2 !== null && type2.equals(Type.fromNameEn("Ice"))))
      ) {
        defenseValue = roundDown((defenseValue * 6144) / 4096);
      }

      // Ability-based defense modifiers
      const abilityRegistry = AbilityEffectRegistry.getInstance();
      const context: AbilityEffectContext = {
        attackingPokemon: this.attackingPokemonStatus,
        defendingPokemon: this.defendingPokemonStatus,
        environment: this.environmentStatus,
        move: this.attackingPokemonStatus.move,
        currentDefense: defenseValue,
      };
      const adjustment = abilityRegistry.getDefenseModifier(context);

      // ×【5】防御の補正値 ÷ 4096→五捨五超入
      defenseValue = roundOffIncluding5((defenseValue * adjustment) / 4096);

      // 1より小さければ1にする
      if (defenseValue < 1) defenseValue = 1;
    } else if (
      this.attackingPokemonStatus.move.category.equals(
        MoveCategory.fromNameEn("Special")
      )
    ) {
      // 防御側のとくぼう×ランク→切り捨て
      defenseValue = roundDown(
        defenderStats.spDef *
          this.calculateFinalDefenseAdjustmentByStatsRank(
            this.defendingPokemonStatus.statsRank.spDef
          )
      );

      // すなあらし+いわタイプでとくぼう強化6144÷4096→切り捨て
      if (
        this.environmentStatus.weather.equals(
          Weather.fromNameEn("Sandstorm")
        ) &&
        (type1.equals(Type.fromNameEn("Rock")) ||
          (type2 !== null && type2.equals(Type.fromNameEn("Rock"))))
      ) {
        defenseValue = roundDown((defenseValue * 6144) / 4096);
      }

      // Ability-based defense modifiers (special)
      const abilityRegistry = AbilityEffectRegistry.getInstance();
      const context: AbilityEffectContext = {
        attackingPokemon: this.attackingPokemonStatus,
        defendingPokemon: this.defendingPokemonStatus,
        environment: this.environmentStatus,
        move: this.attackingPokemonStatus.move,
        currentDefense: defenseValue,
      };
      const adjustment = abilityRegistry.getDefenseModifier(context);

      // ×【5】防御の補正値 ÷ 4096→五捨五超入
      defenseValue = roundOffIncluding5((defenseValue * adjustment) / 4096);

      // 1より小さければ1にする
      if (defenseValue < 1) defenseValue = 1;
    } else {
      console.error("Move is neither a physical one nor a special one");
    }

    return defenseValue;
  }

  calculateFinalDefenseAdjustmentByStatsRank(statsRankValue: number): number {
    if (this.attackingPokemonStatus.isCriticalHit) {
      // Ignore a postive defense stats rank if critical hit
      switch (statsRankValue) {
        case 6:
          return 1;
        case 5:
          return 1;
        case 4:
          return 1;
        case 3:
          return 1;
        case 2:
          return 1;
        case 1:
          return 1;
        case 0:
          return 1;
        case -1:
          return 2 / 3;
        case -2:
          return 2 / 4;
        case -3:
          return 2 / 5;
        case -4:
          return 2 / 6;
        case -5:
          return 2 / 7;
        case -6:
          return 2 / 8;
        default:
          console.log(`Stats Rank must be -6 ~ 6: ${statsRankValue}`);
          return 1;
      }
    } else {
      switch (statsRankValue) {
        case 6:
          return 8 / 2;
        case 5:
          return 7 / 2;
        case 4:
          return 6 / 2;
        case 3:
          return 5 / 2;
        case 2:
          return 4 / 2;
        case 1:
          return 3 / 2;
        case 0:
          return 1;
        case -1:
          return 2 / 3;
        case -2:
          return 2 / 4;
        case -3:
          return 2 / 5;
        case -4:
          return 2 / 6;
        case -5:
          return 2 / 7;
        case -6:
          return 2 / 8;
        default:
          console.log(`Stats Rank must be -6 ~ 6: ${statsRankValue}`);
          return 1;
      }
    }
  }

  calculateDamageAdjustment(): number {
    // Ability-based damage modifiers
    const abilityRegistry = AbilityEffectRegistry.getInstance();
    const context: AbilityEffectContext = {
      attackingPokemon: this.attackingPokemonStatus,
      defendingPokemon: this.defendingPokemonStatus,
      environment: this.environmentStatus,
      move: this.attackingPokemonStatus.move,
    };
    return abilityRegistry.getDamageModifier(context);
  }

  calculateAdjustmentByWeather(): number {
    if (
      this.environmentStatus.weather.equals(
        Weather.fromNameEn("Harsh sunlight")
      )
    ) {
      if (this.getEffectiveMoveType().equals(Type.fromNameEn("Fire"))) {
        return 6144;
      } else if (this.getEffectiveMoveType().equals(Type.fromNameEn("Water"))) {
        return 2048;
      } else {
        return 4096;
      }
    } else if (
      this.environmentStatus.weather.equals(Weather.fromNameEn("Rain"))
    ) {
      if (this.getEffectiveMoveType().equals(Type.fromNameEn("Fire"))) {
        return 2048;
      } else if (this.getEffectiveMoveType().equals(Type.fromNameEn("Water"))) {
        return 6144;
      } else {
        return 4096;
      }
    } else {
      return 4096;
    }
  }

  calculateAdjustmentBySameTypeAttackBonus(): number {
    // 1. テラスタル
    // 2. 技のタイプ == もとのタイプ
    // 3. 技のタイプ == テラスタイプ
    // 4. てきおうりょく
    //
    // 1 && 2 && 3 && 4 -> 9216÷4096→五捨五超入
    // 1 && 2 && 3 && (not 4) -> 8192÷4096→五捨五超入
    // 1 && 2 && (not 3) && 4 -> 6144÷4096→五捨五超入
    // 1 && 2 && (not 3) && (not 4) -> 6144÷4096→五捨五超入
    // 1 && (not 2) && 3 && 4 -> 8192÷4096→五捨五超入
    // 1 && (not 2) && 3 && (not 4) -> 6144÷4096→五捨五超入
    // 1 && (not 2) && (not 3) && 4 -> 補正なし
    // 1 && (not 2) && (not 3) && (not 4) -> 補正なし
    // (not 1) && 2 && 3 && 4 -> 8192÷4096→五捨五超入
    // (not 1) && 2 && 3 && (not 4) -> 6144÷4096→五捨五超入
    // (not 1) && 2 && (not 3) && 4 -> 8192÷4096→五捨五超入
    // (not 1) && 2 && (not 3) && (not 4) -> 6144÷4096→五捨五超入
    // (not 1) && (not 2) && 3 && 4 -> 補正なし
    // (not 1) && (not 2) && 3 && (not 4) -> 補正なし
    // (not 1) && (not 2) && (not 3) && 4 -> 補正なし
    // (not 1) && (not 2) && (not 3) && (not 4) -> 補正なし
    const isTerastallized = this.attackingPokemonStatus.teraType.isEnabled;
    const effectiveMoveType = this.getEffectiveMoveType();
    const moveTypeHasSameTypeAsOriginalType =
      this.attackingPokemonStatus.pokemon.type1.equals(effectiveMoveType) ||
      (this.attackingPokemonStatus.pokemon.type2 !== null &&
        this.attackingPokemonStatus.pokemon.type2.equals(effectiveMoveType));
    const moveTypeHasSameTypeAsTeraType =
      this.attackingPokemonStatus.teraType.type.equals(effectiveMoveType);
    const abilityIsAdaptability = this.attackingPokemonStatus.ability.id === 91;

    if (isTerastallized) {
      if (moveTypeHasSameTypeAsOriginalType) {
        if (moveTypeHasSameTypeAsTeraType) {
          if (abilityIsAdaptability) {
            return 9216;
          } else {
            return 8192;
          }
        } else {
          return 6144;
        }
      } else {
        if (moveTypeHasSameTypeAsTeraType) {
          if (abilityIsAdaptability) {
            return 8192;
          } else {
            return 6144;
          }
        } else {
          return 4096;
        }
      }
    } else {
      if (moveTypeHasSameTypeAsOriginalType) {
        if (abilityIsAdaptability) {
          return 8192;
        } else {
          return 6144;
        }
      } else {
        return 4096;
      }
    }
  }

  calculateRateByTypeCompatibility(): number {
    // Check ability-based type immunity first
    const abilityRegistry = AbilityEffectRegistry.getInstance();
    const context: AbilityEffectContext = {
      attackingPokemon: this.attackingPokemonStatus,
      defendingPokemon: this.defendingPokemonStatus,
      environment: this.environmentStatus,
      move: this.attackingPokemonStatus.move,
    };

    if (abilityRegistry.checkTypeImmunity(context)) {
      return 0; // Immune
    }

    const moveType = this.getEffectiveMoveType();

    let rate = 1;

    const type1 = this.defendingPokemonStatus.teraType.isEnabled
      ? this.defendingPokemonStatus.teraType.type
      : this.defendingPokemonStatus.pokemon.type1;
    const type2 = this.defendingPokemonStatus.teraType.isEnabled
      ? null
      : this.defendingPokemonStatus.pokemon.type2;

    const typeCompatibilityWithType1 = moveType.hasTypeCompatibilityWith(type1);
    const typeCompatibilityWithType2 =
      type2 === null ? null : moveType.hasTypeCompatibilityWith(type2);

    if (
      typeCompatibilityWithType1.equals(
        TypeCompatibility.fromDescriptionEn("No effect")
      )
    ) {
      rate = 0;
    } else if (
      typeCompatibilityWithType1.equals(
        TypeCompatibility.fromDescriptionEn("Super effective")
      )
    ) {
      rate *= 2;
    } else if (
      typeCompatibilityWithType1.equals(
        TypeCompatibility.fromDescriptionEn("Not very effective")
      )
    ) {
      rate *= 0.5;
    }

    if (typeCompatibilityWithType2 !== null) {
      if (
        typeCompatibilityWithType2.equals(
          TypeCompatibility.fromDescriptionEn("No effect")
        )
      ) {
        rate = 0;
      } else if (
        typeCompatibilityWithType2.equals(
          TypeCompatibility.fromDescriptionEn("Super effective")
        )
      ) {
        rate *= 2;
      } else if (
        typeCompatibilityWithType2.equals(
          TypeCompatibility.fromDescriptionEn("Not very effective")
        )
      ) {
        rate *= 0.5;
      }
    }

    return rate;
  }

  calculateFinalDamage(
    finalPower: number,
    finalAttack: number,
    finalDefense: number
  ): [number, number] {
    let finalDamage = 0;

    // 攻撃側のレベル×2÷5+2→切り捨て
    finalDamage = roundDown((this.attackingPokemonStatus.level * 2) / 5 + 2);
    console.log(`攻撃側のレベル×2÷5+2→切り捨て: ${finalDamage}`);

    // ×【2】最終威力×【4】最終攻撃÷【6】最終防御→切り捨て
    finalDamage = roundDown(
      (finalDamage * finalPower * finalAttack) / finalDefense
    );
    console.log(
      `×【2】最終威力×【4】最終攻撃÷【6】最終防御→切り捨て: ${finalDamage}`
    );

    // ÷50+2→切り捨て
    finalDamage = roundDown(finalDamage / 50 + 2);
    console.log(`÷50+2→切り捨て: ${finalDamage}`);

    // TODO:
    // ×複数対象3072÷4096→五捨五超入
    // ×おやこあい(2発目)1024÷4096→五捨五超入
    finalDamage = finalDamage; // eslint-disable-line no-self-assign

    // ×天気弱化 2048÷4096→五捨五超入
    // ×天気強化 6144÷4096→五捨五超入
    const adjustmentByWeather = this.calculateAdjustmentByWeather();
    finalDamage = roundOffIncluding5(
      (finalDamage * adjustmentByWeather) / 4096
    );
    console.log(
      `×天気弱化 2048÷4096→五捨五超入 ×天気強化 6144÷4096→五捨五超入: ${finalDamage}`
    );

    // TODO: ×きょけんとつげき 8192÷4096→五捨五超入
    finalDamage = finalDamage; // eslint-disable-line no-self-assign

    // ×急所 6144÷4096→五捨五超入
    if (this.attackingPokemonStatus.isCriticalHit) {
      finalDamage = roundOffIncluding5((finalDamage * 6144) / 4096);
    }
    console.log(`×急所 6144÷4096→五捨五超入: ${finalDamage}`);

    // ×乱数(0.85, 0.86, …… 0.99, 1.00 の何れか)→切り捨て
    let minFinalDamage = roundDown(finalDamage * 0.85);
    let maxFinalDamage = roundDown(finalDamage * 1.0);
    console.log(
      `×乱数(0.85, 0.86, …… 0.99, 1.00 の何れか)→切り捨て: ${minFinalDamage} ${maxFinalDamage}`
    );

    // ×タイプ一致6144÷4096→五捨五超入
    // または てきおうりょく8192÷4096→五捨五超入
    // または てきおうりょく+テラスタル9216÷4096→五捨五超入
    const adjustmentBySameTypeAttackBonus =
      this.calculateAdjustmentBySameTypeAttackBonus();
    if (adjustmentBySameTypeAttackBonus !== 4096) {
      minFinalDamage = roundOffIncluding5(
        (minFinalDamage * adjustmentBySameTypeAttackBonus) / 4096
      );
      maxFinalDamage = roundOffIncluding5(
        (maxFinalDamage * adjustmentBySameTypeAttackBonus) / 4096
      );
    }
    console.log(
      `×タイプ一致6144÷4096→五捨五超入 または てきおうりょく8192÷4096→五捨五超入 または てきおうりょく+テラスタル9216÷4096→五捨五超入: ${minFinalDamage} ${maxFinalDamage}`
    );

    // ×タイプ相性→切り捨て
    minFinalDamage = roundDown(
      minFinalDamage * this.calculateRateByTypeCompatibility()
    );
    maxFinalDamage = roundDown(
      maxFinalDamage * this.calculateRateByTypeCompatibility()
    );
    console.log(`×タイプ相性→切り捨て: ${minFinalDamage} ${maxFinalDamage}`);

    // ×やけど 2048÷4096→五捨五超入
    // Note: Guts (こんじょう, ID: 62) negates the burn attack reduction
    if (
      this.attackingPokemonStatus.move.category.equals(
        MoveCategory.fromNameEn("Physical")
      ) &&
      this.attackingPokemonStatus.statusAilment.equals(
        StatusAilment.fromNameEn("Burn")
      ) &&
      this.attackingPokemonStatus.ability.id !== 62 // Guts negates burn reduction
    ) {
      minFinalDamage = roundOffIncluding5((minFinalDamage * 2048) / 4096);
      maxFinalDamage = roundOffIncluding5((maxFinalDamage * 2048) / 4096);
    }
    console.log(
      `×やけど 2048÷4096→五捨五超入: ${minFinalDamage} ${maxFinalDamage}`
    );

    // ×【7】ダメージの補正値÷4096→五捨五超入
    const damageAdjustment = this.calculateDamageAdjustment();
    minFinalDamage = roundOffIncluding5((minFinalDamage * damageAdjustment) / 4096);
    maxFinalDamage = roundOffIncluding5((maxFinalDamage * damageAdjustment) / 4096);

    // TODO: ×Z技まもる1024÷4096→五捨五超入
    // TODO: ×ダイマックス技まもる1024÷4096→五捨五超入
    minFinalDamage = minFinalDamage; // eslint-disable-line no-self-assign
    maxFinalDamage = maxFinalDamage; // eslint-disable-line no-self-assign

    // →タイプ相性が0ではないときダメージが1より小さければ1にする
    if (this.calculateRateByTypeCompatibility() !== 0) {
      minFinalDamage = Math.max(minFinalDamage, 1);
      maxFinalDamage = Math.max(maxFinalDamage, 1);
    }
    console.log(
      `→タイプ相性が0ではないときダメージが1より小さければ1にする: ${minFinalDamage} ${maxFinalDamage}`
    );

    return [minFinalDamage, maxFinalDamage];
  }

  public calculateDamage(): DamageResult {
    const attackerStats = this.attackingPokemonStatus.calculateStats();
    const defenderStats = this.defendingPokemonStatus.calculateStats();

    const finalPower = this.calculateFinalPower();

    const finalAttack = this.calculateFinalAttack(attackerStats);
    const finalDefense = this.calculateFinalDefense(defenderStats);

    const [minFinalDamage, maxFinalDamage] = this.calculateFinalDamage(
      finalPower,
      finalAttack,
      finalDefense
    );

    const minDamageRatio =
      roundDown((minFinalDamage / defenderStats.hp) * 100 * 10) / 10;
    const maxDamageRatio =
      roundDown((maxFinalDamage / defenderStats.hp) * 100 * 10) / 10;

    const maxKakutei =
      minFinalDamage === 0
        ? -1
        : roundDown(defenderStats.hp / minFinalDamage) +
          (defenderStats.hp % minFinalDamage > 0 ? 1 : 0);
    const minKakutei =
      maxFinalDamage === 0
        ? -1
        : roundDown(defenderStats.hp / maxFinalDamage) +
          (defenderStats.hp % maxFinalDamage > 0 ? 1 : 0);

    return new DamageResult(
      minFinalDamage,
      maxFinalDamage,
      minDamageRatio,
      maxDamageRatio,
      minKakutei,
      maxKakutei
    );
  }
}
