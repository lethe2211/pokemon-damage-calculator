import { roundDown, roundOff, roundOffIncluding5 } from "../lib/util";
import { AttackingPokemonStatus } from "./attacking-pokemon-status";
import { DamageResult } from "./damage-result";
import { DefendingPokemonStatus } from "./defending-pokemon-status";
import { EnvironmentStatus } from "./environment-status";
import { Move, MoveCategory } from "./move";
import { Stats } from "./stats";
import { TypeCompatibility } from "./type";

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

  calculateFinalPower(): number {
    let power = this.attackingPokemonStatus.move.power;

    // TODO: Calculate this value
    const adjustment = 4096;

    const roundedPower = roundOffIncluding5((power * adjustment) / 4096);

    if (roundedPower < 1) {
      return 1;
    } else if (
      this.attackingPokemonStatus.move.type ===
        this.attackingPokemonStatus.teraType.type &&
      false // TODO: Need to exclude some moves that will not be the target of this adjustment
    ) {
      return 60;
    } else {
      return roundedPower;
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
      attackValue = attackValue;

      // TODO: Calculate this value
      const adjustment = 4096;

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

      // TODO: はりきり 6144 ÷ 4096 → 切り捨て
      attackValue = attackValue;

      // TODO: Calculate this value
      const adjustment = 4096;

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

      // TODO: ゆき+こおりタイプでぼうぎょ強化6144÷4096→切り捨て
      defenseValue = defenseValue;

      // TODO: Calculate this value
      const adjustment = 4096;

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

      // TODO: すなあらし+いわタイプでとくぼう強化6144÷4096→切り捨て
      defenseValue = defenseValue;

      // TODO: Calculate this value
      const adjustment = 4096;

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

  calculateDamangeAdjustment(): number {
    // TODO: Implement it
    return 4096;
  }

  calculateRateByTypeCompatibility(): number {
    const moveType = this.attackingPokemonStatus.move.type;

    let rate = 1;

    const typeCompatibilityWithType1 = moveType.hasTypeCompatibilityWith(
      this.defendingPokemonStatus.pokemon.type1
    );
    const typeCompatibilityWithType2 =
      this.defendingPokemonStatus.pokemon.type2 === null
        ? null
        : moveType.hasTypeCompatibilityWith(
            this.defendingPokemonStatus.pokemon.type2
          );

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
    finalDefense: number,
    damageAdjustment: number
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
    // ×天気弱化 2048÷4096→五捨五超入
    // ×天気強化 6144÷4096→五捨五超入
    // ×きょけんとつげき 8192÷4096→五捨五超入
    finalDamage = finalDamage;

    // ×急所 6144÷4096→五捨五超入
    if (this.attackingPokemonStatus.isCriticalHit) {
      finalDamage = roundOffIncluding5(finalDamage * 6144 / 4096);
    }
    console.log(`×急所 6144÷4096→五捨五超入: ${finalDamage}`)

    // ×乱数(0.85, 0.86, …… 0.99, 1.00 の何れか)→切り捨て
    let minFinalDamage = roundDown(finalDamage * 0.85);
    let maxFinalDamage = roundDown(finalDamage * 1.0);
    console.log(
      `×乱数(0.85, 0.86, …… 0.99, 1.00 の何れか)→切り捨て: ${minFinalDamage} ${maxFinalDamage}`
    );

    // ×タイプ一致6144÷4096→五捨五超入
    // TODO: または てきおうりょく8192÷4096→五捨五超入
    // TODO: または てきおうりょく+テラスタル9216÷4096→五捨五超入
    if (
      this.attackingPokemonStatus.pokemon.type1.equals(
        this.attackingPokemonStatus.move.type
      ) ||
      (this.attackingPokemonStatus.pokemon.type2 !== null &&
        this.attackingPokemonStatus.pokemon.type2.equals(
          this.attackingPokemonStatus.move.type
        ))
    ) {
      minFinalDamage = roundOffIncluding5((minFinalDamage * 6144) / 4096);
      maxFinalDamage = roundOffIncluding5((maxFinalDamage * 6144) / 4096);
    }
    console.log(
      `×タイプ一致6144÷4096→五捨五超入: ${minFinalDamage} ${maxFinalDamage}`
    );

    // ×タイプ相性→切り捨て
    minFinalDamage = roundDown(
      minFinalDamage * this.calculateRateByTypeCompatibility()
    );
    maxFinalDamage = roundDown(
      maxFinalDamage * this.calculateRateByTypeCompatibility()
    );
    console.log(`×タイプ相性→切り捨て: ${minFinalDamage} ${maxFinalDamage}`);

    // TODO: ×やけど 2048÷4096→五捨五超入
    minFinalDamage = minFinalDamage;
    maxFinalDamage = maxFinalDamage;

    // ×【7】ダメージの補正値÷4096→五捨五超入
    minFinalDamage = roundOffIncluding5(
      (minFinalDamage * damageAdjustment) / 4096
    );
    maxFinalDamage = roundOffIncluding5(
      (maxFinalDamage * damageAdjustment) / 4096
    );
    console.log(
      `×【7】ダメージの補正値÷4096→五捨五超入: ${minFinalDamage} ${maxFinalDamage}`
    );

    // TODO: ×Z技まもる1024÷4096→五捨五超入
    // TODO: ×ダイマックス技まもる1024÷4096→五捨五超入
    minFinalDamage = minFinalDamage;
    maxFinalDamage = maxFinalDamage;

    // TODO: →タイプ相性が0ではないときダメージが1より小さければ1にする
    minFinalDamage = minFinalDamage;
    maxFinalDamage = maxFinalDamage;

    return [minFinalDamage, maxFinalDamage];
  }

  public calculateDamage(): DamageResult {
    const attackerStats = this.attackingPokemonStatus.calculateStats();
    const defenderStats = this.defendingPokemonStatus.calculateStats();

    const finalPower = this.calculateFinalPower();

    const finalAttack = this.calculateFinalAttack(attackerStats);
    const finalDefense = this.calculateFinalDefense(defenderStats);

    const damageAdjustment = this.calculateDamangeAdjustment();

    const [minFinalDamage, maxFinalDamage] = this.calculateFinalDamage(
      finalPower,
      finalAttack,
      finalDefense,
      damageAdjustment
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
