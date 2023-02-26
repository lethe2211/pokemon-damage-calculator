import { AttackingPokemonStatus } from "./attacking-pokemon-status";
import { DamageResult } from "./damage-result";
import { DefendingPokemonStatus } from "./defending-pokemon-status";
import { EnvironmentStatus } from "./environment-status";

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

  public calculateDamage(): DamageResult {
    const statsAttacker = this.attackingPokemonStatus.calculateStats();
    const statsDefender = this.defendingPokemonStatus.calculateStats();

    // TODO: Need to fix
    const damage1 = Math.floor(this.attackingPokemonStatus.level * 2 / 5 + 2);
    const damage2 = Math.floor(damage1 * this.attackingPokemonStatus.move.power * statsAttacker.attack / statsDefender.defense);
    const damage3 = Math.floor(damage2 / 50 + 2);

    const minDamage = Math.floor(damage3 * 0.85);
    const maxDamage = damage3;

    const minDamageRatio = Math.round((minDamage / statsDefender.hp) * 100 * 10) / 10;
    const maxDamageRatio = Math.round((maxDamage / statsDefender.hp) * 100 * 10) / 10;

    const maxKakutei = Math.floor(statsDefender.hp / minDamage) + ((statsDefender.hp % minDamage > 0) ? 1 : 0)
    const minKakutei = Math.floor(statsDefender.hp / maxDamage) + ((statsDefender.hp % maxDamage > 0) ? 1 : 0)

    return new DamageResult(minDamage, maxDamage, minDamageRatio, maxDamageRatio, maxKakutei, minKakutei);
  }
}