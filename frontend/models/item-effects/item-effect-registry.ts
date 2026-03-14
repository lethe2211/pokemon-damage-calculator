import {
  ItemEffect,
  ItemEffectContext,
  TypeBoostEffect,
  DamageModifierEffect,
} from "./item-effect-types";
import { ALL_POWER_MODIFIERS } from "./power-modifiers";
import { ALL_ATTACK_MODIFIERS } from "./attack-modifiers";
import { ALL_DEFENSE_MODIFIERS } from "./defense-modifiers";
import { ALL_DAMAGE_MODIFIERS } from "./damage-modifiers";
import { ALL_TYPE_BOOST_EFFECTS } from "./type-boost-effects";

/**
 * Central registry for all item effects in the game.
 * Implements Singleton pattern to ensure a single source of truth.
 *
 * This registry manages all item effects and provides methods to query
 * and apply effects during damage calculations.
 */
export class ItemEffectRegistry {
  private static instance: ItemEffectRegistry;

  // Map of item ID to list of effects (multiple effects per item possible)
  private powerModifiers: Map<number, ItemEffect[]> = new Map();
  private attackModifiers: Map<number, ItemEffect[]> = new Map();
  private defenseModifiers: Map<number, ItemEffect[]> = new Map();
  private damageModifiers: Map<number, DamageModifierEffect[]> = new Map();
  private typeBoosts: Map<number, TypeBoostEffect> = new Map();

  private constructor() {
    // Private constructor to enforce Singleton pattern
    this.registerAllEffects();
  }

  /**
   * Gets the singleton instance of the registry.
   * @returns The ItemEffectRegistry instance
   */
  public static getInstance(): ItemEffectRegistry {
    if (!ItemEffectRegistry.instance) {
      ItemEffectRegistry.instance = new ItemEffectRegistry();
    }
    return ItemEffectRegistry.instance;
  }

  /**
   * Registers all item effects in the game.
   * Called once during construction.
   */
  private registerAllEffects(): void {
    // Phase 2: Power modifiers
    this.registerPowerModifiersPhase2();

    // Phase 3: Attack and Defense modifiers
    this.registerAttackModifiersPhase3();
    this.registerDefenseModifiersPhase3();

    // Phase 4: Damage modifiers and Type boosts
    this.registerDamageModifiersPhase4();
    this.registerTypeBoostsPhase4();
  }

  /**
   * Registers all power modifier effects (Phase 2).
   */
  private registerPowerModifiersPhase2(): void {
    for (const effect of ALL_POWER_MODIFIERS) {
      this.registerPowerModifier(effect);
    }
  }

  /**
   * Registers all attack modifier effects (Phase 3).
   */
  private registerAttackModifiersPhase3(): void {
    for (const effect of ALL_ATTACK_MODIFIERS) {
      this.registerAttackModifier(effect);
    }
  }

  /**
   * Registers all defense modifier effects (Phase 3).
   */
  private registerDefenseModifiersPhase3(): void {
    for (const effect of ALL_DEFENSE_MODIFIERS) {
      this.registerDefenseModifier(effect);
    }
  }

  /**
   * Registers all damage modifier effects (Phase 4).
   */
  private registerDamageModifiersPhase4(): void {
    for (const effect of ALL_DAMAGE_MODIFIERS) {
      this.registerDamageModifier(effect);
    }
  }

  /**
   * Registers all type boost effects (Phase 4).
   */
  private registerTypeBoostsPhase4(): void {
    for (const effect of ALL_TYPE_BOOST_EFFECTS) {
      this.registerTypeBoost(effect);
    }
  }

  /**
   * Registers a power modifier effect.
   * @param effect - The power modifier effect to register
   */
  private registerPowerModifier(effect: ItemEffect): void {
    const itemId = effect.itemId;
    if (!this.powerModifiers.has(itemId)) {
      this.powerModifiers.set(itemId, []);
    }
    this.powerModifiers.get(itemId)!.push(effect);
  }

  /**
   * Registers an attack modifier effect.
   * @param effect - The attack modifier effect to register
   */
  private registerAttackModifier(effect: ItemEffect): void {
    const itemId = effect.itemId;
    if (!this.attackModifiers.has(itemId)) {
      this.attackModifiers.set(itemId, []);
    }
    this.attackModifiers.get(itemId)!.push(effect);
  }

  /**
   * Registers a defense modifier effect.
   * @param effect - The defense modifier effect to register
   */
  private registerDefenseModifier(effect: ItemEffect): void {
    const itemId = effect.itemId;
    if (!this.defenseModifiers.has(itemId)) {
      this.defenseModifiers.set(itemId, []);
    }
    this.defenseModifiers.get(itemId)!.push(effect);
  }

  /**
   * Registers a damage modifier effect.
   * @param effect - The damage modifier effect to register
   */
  private registerDamageModifier(effect: DamageModifierEffect): void {
    const itemId = effect.itemId;
    if (!this.damageModifiers.has(itemId)) {
      this.damageModifiers.set(itemId, []);
    }
    this.damageModifiers.get(itemId)!.push(effect);
  }

  /**
   * Registers a type boost effect.
   * @param effect - The type boost effect to register
   */
  private registerTypeBoost(effect: TypeBoostEffect): void {
    this.typeBoosts.set(effect.itemId, effect);
  }

  /**
   * Gets the combined power modifier from all applicable item effects.
   * @param context - The current calculation context
   * @returns Combined modifier value (4096 = no effect, multiply for boosts)
   */
  public getPowerModifier(context: ItemEffectContext): number {
    let combinedModifier = 4096;

    // Check attacking Pokemon's item
    const itemId = context.attackingPokemon.item.id;
    const effects = this.powerModifiers.get(itemId);

    if (effects) {
      for (const effect of effects) {
        if (effect.applies(context)) {
          const modifier = effect.getModifier(context);
          // Combine modifiers multiplicatively: (mod1 * mod2) / 4096
          combinedModifier = Math.floor(
            (combinedModifier * modifier) / 4096
          );
        }
      }
    }

    return combinedModifier;
  }

  /**
   * Gets the combined attack modifier from all applicable item effects.
   * @param context - The current calculation context
   * @returns Combined modifier value (4096 = no effect, multiply for boosts)
   */
  public getAttackModifier(context: ItemEffectContext): number {
    let combinedModifier = 4096;

    // Check attacking Pokemon's item
    const itemId = context.attackingPokemon.item.id;
    const effects = this.attackModifiers.get(itemId);

    if (effects) {
      for (const effect of effects) {
        if (effect.applies(context)) {
          const modifier = effect.getModifier(context);
          combinedModifier = Math.floor(
            (combinedModifier * modifier) / 4096
          );
        }
      }
    }

    return combinedModifier;
  }

  /**
   * Gets the combined defense modifier from all applicable item effects.
   * @param context - The current calculation context
   * @returns Combined modifier value (4096 = no effect, multiply for boosts)
   */
  public getDefenseModifier(context: ItemEffectContext): number {
    let combinedModifier = 4096;

    // Check defending Pokemon's item
    const itemId = context.defendingPokemon.item.id;
    const effects = this.defenseModifiers.get(itemId);

    if (effects) {
      for (const effect of effects) {
        if (effect.applies(context)) {
          const modifier = effect.getModifier(context);
          combinedModifier = Math.floor(
            (combinedModifier * modifier) / 4096
          );
        }
      }
    }

    return combinedModifier;
  }

  /**
   * Gets the combined damage modifier from all applicable item effects.
   * @param context - The current calculation context
   * @param timing - When to apply the modifier ("BEFORE_STAB" or "AFTER_STAB")
   * @returns Combined modifier value (4096 = no effect, multiply for reduction)
   */
  public getDamageModifier(
    context: ItemEffectContext,
    timing: "BEFORE_STAB" | "AFTER_STAB"
  ): number {
    let combinedModifier = 4096;

    // Check both attacking and defending Pokemon's items
    // Some damage modifiers like Life Orb and Expert Belt apply to attacker
    // Others like Damage-Reducing Berries apply to defender
    const attackerItemId = context.attackingPokemon.item.id;
    const defenderItemId = context.defendingPokemon.item.id;

    // Process attacker's items first
    const attackerEffects = this.damageModifiers.get(attackerItemId);
    if (attackerEffects) {
      for (const effect of attackerEffects) {
        if (effect.timing === timing && effect.applies(context)) {
          const modifier = effect.getModifier(context);
          combinedModifier = Math.floor(
            (combinedModifier * modifier) / 4096
          );
        }
      }
    }

    // Then process defender's items
    const defenderEffects = this.damageModifiers.get(defenderItemId);
    if (defenderEffects) {
      for (const effect of defenderEffects) {
        if (effect.timing === timing && effect.applies(context)) {
          const modifier = effect.getModifier(context);
          combinedModifier = Math.floor(
            (combinedModifier * modifier) / 4096
          );
        }
      }
    }

    return combinedModifier;
  }

  /**
   * Gets the type boost modifier from the attacking Pokemon's item.
   * @param context - The current calculation context
   * @returns Modifier value (4096 = no effect, 4915 = 1.2× boost)
   */
  public getTypeBoost(context: ItemEffectContext): number {
    // Check attacking Pokemon's item
    const itemId = context.attackingPokemon.item.id;
    const effect = this.typeBoosts.get(itemId);

    if (effect && effect.applies(context)) {
      return effect.getModifier(context);
    }

    return 4096; // No effect
  }
}
