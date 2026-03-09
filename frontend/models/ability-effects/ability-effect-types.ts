import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";

/**
 * Context object passed to ability effects for evaluation.
 * Contains all information needed to determine if an ability applies
 * and calculate its modifier value.
 */
export interface AbilityEffectContext {
  attackingPokemon: AttackingPokemonStatus;
  defendingPokemon: DefendingPokemonStatus;
  environment: EnvironmentStatus;
  move: Move;
  currentPower?: number;
  currentAttack?: number;
  currentDefense?: number;
  currentDamage?: number;
}

/**
 * Categories of ability effects based on where they apply in the damage calculation.
 */
export enum AbilityEffectCategory {
  POWER_MODIFIER = "POWER_MODIFIER",
  ATTACK_MODIFIER = "ATTACK_MODIFIER",
  DEFENSE_MODIFIER = "DEFENSE_MODIFIER",
  DAMAGE_MODIFIER = "DAMAGE_MODIFIER",
  TYPE_IMMUNITY = "TYPE_IMMUNITY",
}

/**
 * Base interface for all ability effects.
 * Each ability effect must implement this interface.
 */
export interface AbilityEffect {
  /** Ability ID from ability_data_sv.json */
  abilityId: number;

  /** Ability name (English or Japanese) */
  abilityName: string;

  /** Category of this effect */
  category: AbilityEffectCategory;

  /** Human-readable description of the effect */
  description: string;

  /**
   * Determines if this ability effect applies in the given context.
   * @param context - Current calculation context
   * @returns true if the ability effect should be applied
   */
  applies(context: AbilityEffectContext): boolean;

  /**
   * Returns the modifier value for this ability effect.
   * Modifiers follow the pattern: value × modifier ÷ 4096
   * @param context - Current calculation context
   * @returns Modifier value (4096 = no effect, 6144 = 1.5×, 2048 = 0.5×, etc.)
   */
  getModifier(context: AbilityEffectContext): number;
}

/**
 * Specialized interface for power-modifying abilities.
 * These abilities affect the move's power before damage calculation.
 */
export interface PowerModifierEffect extends AbilityEffect {
  category: AbilityEffectCategory.POWER_MODIFIER;

  /**
   * Optional predicate to check if a move qualifies for this ability.
   * @param move - Move to check
   * @returns true if the move qualifies
   */
  moveCondition?: (move: Move) => boolean;
}

/**
 * Specialized interface for attack stat-modifying abilities.
 * These abilities affect the attacker's Attack or Special Attack stat.
 */
export interface AttackModifierEffect extends AbilityEffect {
  category: AbilityEffectCategory.ATTACK_MODIFIER;

  /** Whether this ability affects physical moves */
  affectsPhysical: boolean;

  /** Whether this ability affects special moves */
  affectsSpecial: boolean;
}

/**
 * Specialized interface for defense stat-modifying abilities.
 * These abilities affect the defender's Defense or Special Defense stat.
 */
export interface DefenseModifierEffect extends AbilityEffect {
  category: AbilityEffectCategory.DEFENSE_MODIFIER;

  /**
   * Optional predicate to check if the move type qualifies for this ability.
   * @param moveType - Type to check
   * @returns true if the type qualifies
   */
  moveTypeCondition?: (moveType: import("../type").Type) => boolean;
}

/**
 * Specialized interface for final damage-modifying abilities.
 * These abilities affect the final damage value after most calculations.
 */
export interface DamageModifierEffect extends AbilityEffect {
  category: AbilityEffectCategory.DAMAGE_MODIFIER;

  /** When this modifier should be applied in the damage calculation sequence */
  timing: "BEFORE_STAB" | "AFTER_STAB";
}

/**
 * Interface for type immunity abilities.
 * These abilities grant immunity to specific move types.
 */
export interface TypeImmunityEffect {
  /** Ability ID from ability_data_sv.json */
  abilityId: number;

  /** Ability name (English or Japanese) */
  abilityName: string;

  /** Type that this ability grants immunity to */
  immuneToType: import("../type").Type;

  /**
   * Optional callback for side effects when immunity triggers.
   * For example, Sap Sipper raises Attack when hit by Grass moves.
   * @param context - Current calculation context
   */
  onImmunity?: (context: AbilityEffectContext) => void;
}
