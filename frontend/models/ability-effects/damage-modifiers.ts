import {
  DamageModifierEffect,
  AbilityEffectCategory,
  AbilityEffectContext,
} from "./ability-effect-types";
import { Type } from "../type";

/**
 * Final damage-modifying ability effects.
 * These abilities affect the final damage value after most calculations.
 */

/**
 * Filter (フィルター)
 * Ability ID: 111
 *
 * Reduces damage from super-effective moves by 25%.
 * Modifier: 3072/4096 (approximately 0.75×)
 *
 * Example Pokemon: Mr. Mime, Aggron (Mega)
 */
export const FilterEffect: DamageModifierEffect = {
  abilityId: 111,
  abilityName: "Filter",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Reduces damage from super-effective moves by 25%",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if defending Pokemon has Filter
    if (context.defendingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is super effective (type effectiveness > 1.0)
    return (
      context.typeEffectiveness !== undefined &&
      context.typeEffectiveness > 1.0
    );
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 3072 : 4096;
  },
};

/**
 * Solid Rock (ハードロック)
 * Ability ID: 116
 *
 * Reduces damage from super-effective moves by 25%.
 * Modifier: 3072/4096 (approximately 0.75×)
 *
 * Example Pokemon: Rhyperior, Camerupt, Tyrunt
 *
 * Note: Has the same effect as Filter.
 */
export const SolidRockEffect: DamageModifierEffect = {
  abilityId: 116,
  abilityName: "Solid Rock",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Reduces damage from super-effective moves by 25%",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if defending Pokemon has Solid Rock
    if (context.defendingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is super effective
    return (
      context.typeEffectiveness !== undefined &&
      context.typeEffectiveness > 1.0
    );
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 3072 : 4096;
  },
};

/**
 * Prism Armor (プリズムアーマー)
 * Ability ID: 232
 *
 * Reduces damage from super-effective moves by 25%.
 * Modifier: 3072/4096 (approximately 0.75×)
 *
 * Example Pokemon: Necrozma
 *
 * Note: Has the same effect as Filter and Solid Rock.
 */
export const PrismArmorEffect: DamageModifierEffect = {
  abilityId: 232,
  abilityName: "Prism Armor",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Reduces damage from super-effective moves by 25%",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if defending Pokemon has Prism Armor
    if (context.defendingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is super effective
    return (
      context.typeEffectiveness !== undefined &&
      context.typeEffectiveness > 1.0
    );
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 3072 : 4096;
  },
};

/**
 * Multiscale (マルチスケイル)
 * Ability ID: 136
 *
 * Reduces damage by 50% when HP is full.
 * Modifier: 2048/4096 (approximately 0.5×)
 *
 * Example Pokemon: Dragonite, Lugia, Lunala
 */
export const MultiscaleEffect: DamageModifierEffect = {
  abilityId: 136,
  abilityName: "Multiscale",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Reduces damage by 50% when HP is full",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if defending Pokemon has Multiscale
    if (context.defendingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if HP is full
    if (
      context.defenderCurrentHP === undefined ||
      context.defenderMaxHP === undefined
    ) {
      return false;
    }

    return context.defenderCurrentHP >= context.defenderMaxHP;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 2048 : 4096;
  },
};

/**
 * Tinted Lens (いろめがね)
 * Ability ID: 110
 *
 * Doubles damage against Pokemon that resist the move.
 * Modifier: 8192/4096 (approximately 2.0×)
 *
 * Example Pokemon: Butterfree, Yanmega, Sigilyph
 */
export const TintedLensEffect: DamageModifierEffect = {
  abilityId: 110,
  abilityName: "Tinted Lens",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Doubles damage against Pokemon that resist the move",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Tinted Lens
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is not very effective (type effectiveness < 1.0)
    return (
      context.typeEffectiveness !== undefined &&
      context.typeEffectiveness > 0 &&
      context.typeEffectiveness < 1.0
    );
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

/**
 * Sniper (スナイパー)
 * Ability ID: 97
 *
 * Increases critical hit damage by 50% (from 1.5× to 2.25×).
 * Modifier: 6144/4096 (approximately 1.5×)
 *
 * Example Pokemon: Kingdra, Remoraid, Octillery
 *
 * Note: This modifier is applied on top of the critical hit multiplier.
 */
export const SniperEffect: DamageModifierEffect = {
  abilityId: 97,
  abilityName: "Sniper",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Increases critical hit damage by 50%",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if attacking Pokemon has Sniper
    if (context.attackingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if it's a critical hit
    return context.attackingPokemon.isCriticalHit;
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Thick Fat (あついしぼう)
 * Ability ID: 47
 *
 * Halves damage from Fire-type and Ice-type moves.
 * Modifier: 2048/4096 (approximately 0.5×)
 *
 * Example Pokemon: Snorlax, Mamoswine, Walrein
 *
 * Note: This is a damage modifier that directly reduces final damage,
 * not a defense stat modifier.
 */
export const ThickFatEffect: DamageModifierEffect = {
  abilityId: 47,
  abilityName: "Thick Fat",
  category: AbilityEffectCategory.DAMAGE_MODIFIER,
  description: "Halves damage from Fire and Ice-type moves",
  timing: "AFTER_STAB",

  applies(context: AbilityEffectContext): boolean {
    // Check if defending Pokemon has Thick Fat
    if (context.defendingPokemon.ability.id !== this.abilityId) {
      return false;
    }

    // Check if move is Fire or Ice type
    const moveType = context.move.type;
    return (
      moveType.equals(Type.fromNameEn("Fire")) ||
      moveType.equals(Type.fromNameEn("Ice"))
    );
  },

  getModifier(context: AbilityEffectContext): number {
    return this.applies(context) ? 2048 : 4096;
  },
};


/**
 * Export all damage modifier effects for registration.
 */
export const damageModifierEffects: DamageModifierEffect[] = [
  FilterEffect,
  SolidRockEffect,
  PrismArmorEffect,
  MultiscaleEffect,
  TintedLensEffect,
  SniperEffect,
  ThickFatEffect,
];
