import {
  PowerModifierEffect,
  AbilityEffectCategory,
  AbilityEffectContext,
} from "./ability-effect-types";
import { Weather } from "../weather";
import { Type } from "../type";
import { MoveCategory } from "../move";

/**
 * Power-modifying ability effects.
 * These abilities affect the move's power before damage calculation.
 */

/**
 * List of punching moves that benefit from Iron Fist.
 * Source: Bulbapedia and PokeAPI
 */
const PUNCHING_MOVES = [
  4,   // Comet Punch (すいせいパンチ)
  5,   // Mega Punch (メガトンパンチ)
  7,   // Fire Punch (ほのおのパンチ)
  8,   // Ice Punch (れいとうパンチ)
  9,   // Thunder Punch (かみなりパンチ)
  183, // Mach Punch (マッハパンチ)
  327, // Hammer Arm (アームハンマー)
  359, // Meteor Mash (コメットパンチ)
  409, // Drain Punch (ドレインパンチ)
  418, // Bullet Punch (バレットパンチ)
  612, // Plasma Fists (プラズマフィスト)
  667, // Ice Hammer (アイスハンマー)
  820, // Thunder Punch (らいめいげき) - Different move in Gen 8
  // Note: This list may not be complete. Add more as needed.
];

/**
 * Iron Fist (てつのこぶし)
 * Ability ID: 89
 *
 * Powers up punching moves by 20%.
 * Modifier: 4915/4096 (approximately 1.2×)
 *
 * Example Pokemon: Hitmonchan, Conkeldurr, Crabominable
 */
export const IronFistEffect: PowerModifierEffect = {
  abilityId: 89,
  abilityName: "Iron Fist",
  category: AbilityEffectCategory.POWER_MODIFIER,
  description: "Powers up punching moves by 20%",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Iron Fist
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is a punching move
    return PUNCHING_MOVES.includes(context.move.id);
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 4915 : 4096;
  },

  moveCondition(move: import("../move").Move) {
    return PUNCHING_MOVES.includes(move.id);
  },
};

/**
 * Technician (テクニシャン)
 * Ability ID: 101
 *
 * Powers up moves with base power 60 or less by 50%.
 * Modifier: 6144/4096 (approximately 1.5×)
 *
 * Example Pokemon: Scizor, Breloom, Scyther
 */
export const TechnicianEffect: PowerModifierEffect = {
  abilityId: 101,
  abilityName: "Technician",
  category: AbilityEffectCategory.POWER_MODIFIER,
  description: "Powers up moves with base power 60 or less by 50%",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Technician
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Technician applies to moves with base power ≤ 60
    return context.move.power > 0 && context.move.power <= 60;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },

  moveCondition(move: import("../move").Move) {
    return move.power > 0 && move.power <= 60;
  },
};

/**
 * Tough Claws (かたいツメ)
 * Ability ID: 181
 *
 * Powers up contact moves by 30%.
 * Modifier: 5325/4096 (approximately 1.3×)
 *
 * Example Pokemon: Metagross, Charizard-Mega-X, Perrserker
 *
 * Note: For simplicity, we assume all physical moves except for specific
 * ranged moves are contact moves. This is a simplification and may need
 * refinement in the future.
 */
export const ToughClawsEffect: PowerModifierEffect = {
  abilityId: 181,
  abilityName: "Tough Claws",
  category: AbilityEffectCategory.POWER_MODIFIER,
  description: "Powers up contact moves by 30%",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Tough Claws
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // For Phase 2, we use a simplified heuristic:
    // Assume most physical moves make contact
    // We exclude known ranged physical moves
    const nonContactMoves: number[] = [
      // Ranged physical moves (partial list)
      // This should be expanded in future phases
    ];

    return !nonContactMoves.includes(context.move.id);
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 5325 : 4096;
  },

  moveCondition(_move) {
    // Simplified condition - assume most moves make contact
    return true;
  },
};

/**
 * Sheer Force (ちからずく)
 * Ability ID: 125
 *
 * Powers up moves with secondary effects by 30%, but removes the secondary effect.
 * Modifier: 5325/4096 (approximately 1.3×)
 *
 * Example Pokemon: Nidoking, Darmanitan, Landorus
 *
 * Note: For Phase 2, we use a hardcoded list of moves with secondary effects.
 * This should be moved to move metadata in future phases.
 */
export const SheerForceEffect: PowerModifierEffect = {
  abilityId: 125,
  abilityName: "Sheer Force",
  category: AbilityEffectCategory.POWER_MODIFIER,
  description: "Powers up moves with secondary effects by 30%",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Sheer Force
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // List of moves with secondary effects (partial list for Phase 2)
    // This should be expanded or moved to move metadata
    const movesWithSecondaryEffects = [
      // Common moves with secondary effects
      7,   // Fire Punch (10% burn chance)
      8,   // Ice Punch (10% freeze chance)
      9,   // Thunder Punch (10% paralysis chance)
      // Add more as needed
    ];

    return movesWithSecondaryEffects.includes(context.move.id);
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 5325 : 4096;
  },

  moveCondition(move: import("../move").Move) {
    const movesWithSecondaryEffects = [7, 8, 9];
    return movesWithSecondaryEffects.includes(move.id);
  },
};

/**
 * Sand Force (すなのちから)
 * Ability ID: 159
 *
 * Powers up Rock, Ground, and Steel-type moves by 30% in a sandstorm.
 * Modifier: 5325/4096 (approximately 1.3×)
 *
 * Example Pokemon: Excadrill, Landorus, Gigalith
 */
export const SandForceEffect: PowerModifierEffect = {
  abilityId: 159,
  abilityName: "Sand Force",
  category: AbilityEffectCategory.POWER_MODIFIER,
  description: "Powers up Rock/Ground/Steel moves by 30% in sandstorm",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Sand Force
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if weather is Sandstorm
    if (!context.environment.weather.equals(Weather.fromNameEn("Sandstorm"))) {
      return false;
    }

    // Check if move type is Rock, Ground, or Steel
    const moveType = context.move.type;
    return (
      moveType.equals(Type.fromNameEn("Rock")) ||
      moveType.equals(Type.fromNameEn("Ground")) ||
      moveType.equals(Type.fromNameEn("Steel"))
    );
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 5325 : 4096;
  },

  moveCondition(move: import("../move").Move) {
    return (
      move.type.equals(Type.fromNameEn("Rock")) ||
      move.type.equals(Type.fromNameEn("Ground")) ||
      move.type.equals(Type.fromNameEn("Steel"))
    );
  },
};

/**
 * Solar Power (サンパワー)
 * Ability ID: 94
 *
 * Powers up special moves by 50% in harsh sunlight.
 * Modifier: 6144/4096 (approximately 1.5×)
 *
 * Example Pokemon: Charizard, Heliolisk, Tropius
 */
export const SolarPowerEffect: PowerModifierEffect = {
  abilityId: 94,
  abilityName: "Solar Power",
  category: AbilityEffectCategory.POWER_MODIFIER,
  description: "Powers up special moves by 50% in harsh sunlight",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Solar Power
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if weather is Harsh sunlight
    if (!context.environment.weather.equals(Weather.fromNameEn("Harsh sunlight"))) {
      return false;
    }

    // Check if move is special category
    return context.move.category.equals(MoveCategory.fromNameEn("Special"));
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },

  moveCondition(move: import("../move").Move) {
    return move.category.equals(MoveCategory.fromNameEn("Special"));
  },
};

/**
 * Export all power modifier effects for registration.
 */
export const powerModifierEffects: PowerModifierEffect[] = [
  IronFistEffect,
  TechnicianEffect,
  ToughClawsEffect,
  SheerForceEffect,
  SandForceEffect,
  SolarPowerEffect,
];
