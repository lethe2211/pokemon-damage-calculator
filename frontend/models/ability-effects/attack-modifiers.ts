import {
  AttackModifierEffect,
  AbilityEffectCategory,
  AbilityEffectContext,
} from "./ability-effect-types";
import { Type } from "../type";

/**
 * Attack stat-modifying ability effects.
 * These abilities affect the attacker's Attack or Special Attack stat.
 */

/**
 * Hustle (はりきり)
 * Ability ID: 55
 *
 * Boosts the Attack stat by 50%, but lowers accuracy of physical moves.
 * Modifier: 6144/4096 (approximately 1.5×)
 *
 * Example Pokemon: Rampardos, Togekiss, Durant
 *
 * Note: This implementation only handles the attack boost.
 * The accuracy reduction is not implemented in this damage calculator.
 */
export const HustleEffect: AttackModifierEffect = {
  abilityId: 55,
  abilityName: "Hustle",
  category: AbilityEffectCategory.ATTACK_MODIFIER,
  description: "Boosts Attack stat by 50% (physical moves only)",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Hustle
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Hustle only affects physical moves
    return context.move.category.id === 0;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Guts (こんじょう)
 * Ability ID: 62
 *
 * Boosts the Attack stat by 50% when inflicted with a status condition.
 * Modifier: 6144/4096 (approximately 1.5×)
 *
 * Example Pokemon: Heracross, Machamp, Ursaring
 *
 * Note: Guts also negates the Attack reduction from burn status.
 * The burn reduction negation is handled separately in the burn calculation.
 */
export const GutsEffect: AttackModifierEffect = {
  abilityId: 62,
  abilityName: "Guts",
  category: AbilityEffectCategory.ATTACK_MODIFIER,
  description: "Boosts Attack by 50% when affected by status condition",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Guts
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Guts only affects physical moves
    if (context.move.category.id !== 0) {
      return false;
    }

    // Check if Pokemon has any status condition (id !== 0 means afflicted)
    return context.attackingPokemon.statusAilment.id !== 0;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Huge Power (ちからもち)
 * Ability ID: 37
 *
 * Doubles the Attack stat.
 * Modifier: 8192/4096 (approximately 2.0×)
 *
 * Example Pokemon: Azumarill, Diggersby
 */
export const HugePowerEffect: AttackModifierEffect = {
  abilityId: 37,
  abilityName: "Huge Power",
  category: AbilityEffectCategory.ATTACK_MODIFIER,
  description: "Doubles the Attack stat",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Huge Power
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Huge Power only affects physical moves
    return context.move.category.id === 0;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

/**
 * Pure Power (ヨガパワー)
 * Ability ID: 74
 *
 * Doubles the Attack stat.
 * Modifier: 8192/4096 (approximately 2.0×)
 *
 * Example Pokemon: Medicham, Meditite
 *
 * Note: Pure Power has the exact same effect as Huge Power.
 */
export const PurePowerEffect: AttackModifierEffect = {
  abilityId: 74,
  abilityName: "Pure Power",
  category: AbilityEffectCategory.ATTACK_MODIFIER,
  description: "Doubles the Attack stat",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Pure Power
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Pure Power only affects physical moves
    return context.move.category.id === 0;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

/**
 * Heatproof (たいねつ)
 * Ability ID: 85
 *
 * Halves the attacking Pokemon's Attack or Special Attack when
 * the defending Pokemon with Heatproof is hit by a Fire-type move.
 * Modifier: 2048/4096 (approximately 0.5×)
 *
 * Example Pokemon: Bronzor, Bronzong
 *
 * Note: This is a defensive ability that reduces the attacker's offensive stat.
 * Unlike most attack modifiers, this checks the defender's ability.
 * Heatproof also reduces burn damage, but that is not implemented
 * in this damage calculator.
 */
export const HeatproofEffect: AttackModifierEffect = {
  abilityId: 85,
  abilityName: "Heatproof",
  category: AbilityEffectCategory.ATTACK_MODIFIER,
  description: "Halves opponent's Attack/Special Attack for Fire-type moves",
  affectsPhysical: true,
  affectsSpecial: true,

  applies(context: AbilityEffectContext): boolean {
    // Check if DEFENDING Pokemon has Heatproof (defensive ability)
    if (context.defendingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is Fire type
    if (!context.move.type.equals(Type.fromNameEn("Fire"))) {
      return false;
    }

    // Applies to both physical and special Fire-type moves
    return context.move.category.id === 0 || context.move.category.id === 1;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 2048 : 4096;
  },
};

/**
 * Export all attack modifier effects for registration.
 */
export const attackModifierEffects: AttackModifierEffect[] = [
  HustleEffect,
  GutsEffect,
  HugePowerEffect,
  PurePowerEffect,
  HeatproofEffect,
];
