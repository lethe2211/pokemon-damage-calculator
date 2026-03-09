import {
  AbilityEffect,
  AbilityEffectCategory,
  AbilityEffectContext,
  TypeImmunityEffect,
} from "./ability-effect-types";
import { powerModifierEffects } from "./power-modifiers";
import { attackModifierEffects } from "./attack-modifiers";
import { defenseModifierEffects } from "./defense-modifiers";
import { damageModifierEffects } from "./damage-modifiers";
import { typeImmunityEffects } from "./immunity-effects";

/**
 * Central registry for all ability effects in the damage calculator.
 *
 * This registry uses the Strategy Pattern to manage ability effects,
 * making it easy to:
 * - Add new abilities without modifying existing code
 * - Test abilities in isolation
 * - Maintain a clear separation of concerns
 * - Query which abilities affect a particular calculation stage
 *
 * The registry is a Singleton to ensure only one instance exists
 * and effects are registered once at initialization.
 */
export class AbilityEffectRegistry {
  private static instance: AbilityEffectRegistry;

  private powerModifiers: Map<number, AbilityEffect[]>;
  private attackModifiers: Map<number, AbilityEffect[]>;
  private defenseModifiers: Map<number, AbilityEffect[]>;
  private damageModifiers: Map<number, AbilityEffect[]>;
  private typeImmunities: Map<number, TypeImmunityEffect>;

  private constructor() {
    this.powerModifiers = this.buildEffectMap(powerModifierEffects);
    this.attackModifiers = this.buildEffectMap(attackModifierEffects);
    this.defenseModifiers = this.buildEffectMap(defenseModifierEffects);
    this.damageModifiers = this.buildEffectMap(damageModifierEffects);
    this.typeImmunities = this.buildImmunityMap(typeImmunityEffects);
  }

  /**
   * Get the singleton instance of the registry.
   * @returns The AbilityEffectRegistry instance
   */
  public static getInstance(): AbilityEffectRegistry {
    if (!AbilityEffectRegistry.instance) {
      AbilityEffectRegistry.instance = new AbilityEffectRegistry();
    }
    return AbilityEffectRegistry.instance;
  }

  /**
   * Build a Map of ability ID to effects for fast lookup.
   * @param effects - Array of ability effects
   * @returns Map from ability ID to array of effects
   */
  private buildEffectMap(
    effects: AbilityEffect[]
  ): Map<number, AbilityEffect[]> {
    const map = new Map<number, AbilityEffect[]>();
    for (const effect of effects) {
      if (!map.has(effect.abilityId)) {
        map.set(effect.abilityId, []);
      }
      map.get(effect.abilityId)!.push(effect);
    }
    return map;
  }

  /**
   * Build a Map of ability ID to type immunity effect.
   * @param effects - Array of type immunity effects
   * @returns Map from ability ID to immunity effect
   */
  private buildImmunityMap(
    effects: TypeImmunityEffect[]
  ): Map<number, TypeImmunityEffect> {
    const map = new Map<number, TypeImmunityEffect>();
    for (const effect of effects) {
      map.set(effect.abilityId, effect);
    }
    return map;
  }

  /**
   * Calculate the combined power modifier for the current context.
   * Abilities that affect power are applied multiplicatively.
   *
   * @param context - Current calculation context
   * @returns Combined modifier value (4096 = no effect)
   */
  public getPowerModifier(context: AbilityEffectContext): number {
    const abilityId = context.attackingPokemon.ability.id;
    const effects = this.powerModifiers.get(abilityId) || [];

    let combinedModifier = 4096;
    for (const effect of effects) {
      if (effect.applies(context)) {
        const modifier = effect.getModifier(context);
        // Apply modifier: combinedModifier = combinedModifier * modifier / 4096
        combinedModifier = Math.floor((combinedModifier * modifier) / 4096);
      }
    }

    return combinedModifier;
  }

  /**
   * Calculate the attack modifier for the current context.
   *
   * @param context - Current calculation context
   * @returns Combined modifier value (4096 = no effect)
   */
  public getAttackModifier(context: AbilityEffectContext): number {
    const abilityId = context.attackingPokemon.ability.id;
    const effects = this.attackModifiers.get(abilityId) || [];

    let combinedModifier = 4096;
    for (const effect of effects) {
      if (effect.applies(context)) {
        const modifier = effect.getModifier(context);
        combinedModifier = Math.floor((combinedModifier * modifier) / 4096);
      }
    }

    return combinedModifier;
  }

  /**
   * Calculate the defense modifier for the current context.
   *
   * @param context - Current calculation context
   * @returns Combined modifier value (4096 = no effect)
   */
  public getDefenseModifier(context: AbilityEffectContext): number {
    const abilityId = context.defendingPokemon.ability.id;
    const effects = this.defenseModifiers.get(abilityId) || [];

    let combinedModifier = 4096;
    for (const effect of effects) {
      if (effect.applies(context)) {
        const modifier = effect.getModifier(context);
        combinedModifier = Math.floor((combinedModifier * modifier) / 4096);
      }
    }

    return combinedModifier;
  }

  /**
   * Calculate the damage modifier for the current context.
   * Checks both attacker and defender abilities.
   *
   * @param context - Current calculation context
   * @returns Combined modifier value (4096 = no effect)
   */
  public getDamageModifier(context: AbilityEffectContext): number {
    // Check both attacker and defender abilities
    const attackerEffects =
      this.damageModifiers.get(context.attackingPokemon.ability.id) || [];
    const defenderEffects =
      this.damageModifiers.get(context.defendingPokemon.ability.id) || [];

    let combinedModifier = 4096;

    for (const effect of [...attackerEffects, ...defenderEffects]) {
      if (effect.applies(context)) {
        const modifier = effect.getModifier(context);
        combinedModifier = Math.floor((combinedModifier * modifier) / 4096);
      }
    }

    return combinedModifier;
  }

  /**
   * Check if the defender is immune to the attacking move's type.
   *
   * @param context - Current calculation context
   * @returns true if immune, false otherwise
   */
  public checkTypeImmunity(context: AbilityEffectContext): boolean {
    const defenderAbilityId = context.defendingPokemon.ability.id;
    const immunity = this.typeImmunities.get(defenderAbilityId);

    if (!immunity) {
      return false;
    }

    const isImmune = immunity.immuneToType.equals(context.move.type);

    if (isImmune && immunity.onImmunity) {
      immunity.onImmunity(context);
    }

    return isImmune;
  }

  /**
   * Get all registered abilities by category for debugging/testing.
   *
   * @param category - Ability effect category
   * @returns Array of ability IDs registered in this category
   */
  public getRegisteredAbilities(category: AbilityEffectCategory): number[] {
    switch (category) {
      case AbilityEffectCategory.POWER_MODIFIER:
        return Array.from(this.powerModifiers.keys());
      case AbilityEffectCategory.ATTACK_MODIFIER:
        return Array.from(this.attackModifiers.keys());
      case AbilityEffectCategory.DEFENSE_MODIFIER:
        return Array.from(this.defenseModifiers.keys());
      case AbilityEffectCategory.DAMAGE_MODIFIER:
        return Array.from(this.damageModifiers.keys());
      case AbilityEffectCategory.TYPE_IMMUNITY:
        return Array.from(this.typeImmunities.keys());
      default:
        return [];
    }
  }
}
