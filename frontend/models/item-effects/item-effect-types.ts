import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";

/**
 * Context object passed to item effects for evaluation.
 * Contains all information needed to determine if an item applies
 * and calculate its modifier value.
 */
export interface ItemEffectContext {
  attackingPokemon: AttackingPokemonStatus;
  defendingPokemon: DefendingPokemonStatus;
  environment: EnvironmentStatus;
  move: Move;
  currentPower?: number;
  currentAttack?: number;
  currentDefense?: number;
  currentDamage?: number;
  // Additional fields for damage modifier items
  typeEffectiveness?: number; // Type compatibility multiplier (e.g., 2.0 for super effective)
  defenderCurrentHP?: number; // Current HP of defending Pokemon
  defenderMaxHP?: number; // Maximum HP of defending Pokemon
}

/**
 * Categories of item effects based on where they apply in the damage calculation.
 */
export enum ItemEffectCategory {
  POWER_MODIFIER = "POWER_MODIFIER",
  ATTACK_MODIFIER = "ATTACK_MODIFIER",
  DEFENSE_MODIFIER = "DEFENSE_MODIFIER",
  DAMAGE_MODIFIER = "DAMAGE_MODIFIER",
  TYPE_BOOST = "TYPE_BOOST",
}

/**
 * Base interface for all item effects.
 * Each item effect must implement this interface.
 */
export interface ItemEffect {
  /** Item ID from item_data_sv.json */
  itemId: number;

  /** Item name (English or Japanese) */
  itemName: string;

  /** Category of this effect */
  category: ItemEffectCategory;

  /** Human-readable description of the effect */
  description: string;

  /**
   * Determines if this item effect applies in the given context.
   * @param context - Current calculation context
   * @returns true if the item effect should be applied
   */
  applies(context: ItemEffectContext): boolean;

  /**
   * Returns the modifier value for this item effect.
   * Modifiers follow the pattern: value × modifier ÷ 4096
   * @param context - Current calculation context
   * @returns Modifier value (4096 = no effect, 6144 = 1.5×, 2048 = 0.5×, etc.)
   */
  getModifier(context: ItemEffectContext): number;
}

/**
 * Specialized interface for power-modifying items.
 * These items affect the move's power before damage calculation.
 */
export interface PowerModifierEffect extends ItemEffect {
  category: ItemEffectCategory.POWER_MODIFIER;

  /**
   * Optional predicate to check if a move qualifies for this item.
   * @param move - Move to check
   * @returns true if the move qualifies
   */
  moveCondition?: (move: Move) => boolean;
}

/**
 * Specialized interface for attack stat-modifying items.
 * These items affect the attacker's Attack or Special Attack stat.
 */
export interface AttackModifierEffect extends ItemEffect {
  category: ItemEffectCategory.ATTACK_MODIFIER;

  /** Whether this item affects physical moves */
  affectsPhysical: boolean;

  /** Whether this item affects special moves */
  affectsSpecial: boolean;
}

/**
 * Specialized interface for defense stat-modifying items.
 * These items affect the defender's Defense or Special Defense stat.
 */
export interface DefenseModifierEffect extends ItemEffect {
  category: ItemEffectCategory.DEFENSE_MODIFIER;

  /** Whether this item affects physical defense */
  affectsPhysical: boolean;

  /** Whether this item affects special defense */
  affectsSpecial: boolean;
}

/**
 * Specialized interface for final damage-modifying items.
 * These items affect the final damage value after most calculations.
 */
export interface DamageModifierEffect extends ItemEffect {
  category: ItemEffectCategory.DAMAGE_MODIFIER;

  /** When this modifier should be applied in the damage calculation sequence */
  timing: "BEFORE_STAB" | "AFTER_STAB";
}

/**
 * Interface for type-boosting items.
 * These items boost the power of moves of a specific type.
 * Examples: Plates, Incenses, Charcoal, Mystic Water, etc.
 */
export interface TypeBoostEffect extends ItemEffect {
  category: ItemEffectCategory.TYPE_BOOST;

  /** Type that this item boosts (null for abstract items like ID 7) */
  boostedType: import("../type").Type | null;
}
