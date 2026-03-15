import {
  DefenseModifierEffect,
  ItemEffectCategory,
  ItemEffectContext,
} from "./item-effect-types";
import { MoveCategory } from "../move";

/**
 * Eviolite (しんかのきせき)
 * ID: 21
 * Effect: Boosts Defense and Special Defense by 1.5× if Pokemon can still evolve
 * Modifier: 6144
 *
 * Note: This implementation assumes Pokemon can evolve.
 * A complete implementation would check evolution data.
 */
export const EvioliteEffect: DefenseModifierEffect = {
  itemId: 21,
  itemName: "Eviolite",
  category: ItemEffectCategory.DEFENSE_MODIFIER,
  description: "Boosts Defense and Special Defense by 1.5× if can evolve",
  affectsPhysical: true,
  affectsSpecial: true,

  applies(context: ItemEffectContext): boolean {
    if (context.defendingPokemon.item.id !== this.itemId) {
      return false;
    }

    // TODO: Check if Pokemon can still evolve
    // For now, we assume it can evolve if Eviolite is equipped
    // A complete implementation would maintain a list of fully-evolved Pokemon
    // or check evolution chain data
    return true;
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Deep Sea Scale (しんかいのウロコ)
 * ID: 22
 * Effect: Doubles Clamperl's Special Defense
 * Modifier: 8192
 * Only works for Clamperl (Pokemon ID: 366)
 */
export const DeepSeaScaleEffect: DefenseModifierEffect = {
  itemId: 22,
  itemName: "Deep Sea Scale",
  category: ItemEffectCategory.DEFENSE_MODIFIER,
  description: "Doubles Clamperl's Special Defense",
  affectsPhysical: false,
  affectsSpecial: true,

  applies(context: ItemEffectContext): boolean {
    if (context.defendingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if Pokemon is Clamperl (ID 366)
    const pokemonId = context.defendingPokemon.pokemon.id;
    if (pokemonId !== 366) {
      return false;
    }

    return context.move.category.equals(MoveCategory.fromNameEn("Special"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

/**
 * Assault Vest (とつげきチョッキ)
 * ID: 23
 * Effect: Boosts Special Defense by 1.5×
 * Modifier: 6144
 */
export const AssaultVestEffect: DefenseModifierEffect = {
  itemId: 23,
  itemName: "Assault Vest",
  category: ItemEffectCategory.DEFENSE_MODIFIER,
  description: "Boosts Special Defense by 1.5×",
  affectsPhysical: false,
  affectsSpecial: true,

  applies(context: ItemEffectContext): boolean {
    if (context.defendingPokemon.item.id !== this.itemId) {
      return false;
    }

    return context.move.category.equals(MoveCategory.fromNameEn("Special"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Metal Powder (メタルパウダー)
 * ID: 24
 * Effect: Doubles Ditto's Defense
 * Modifier: 8192
 * Only works for Ditto (Pokemon ID: 132)
 */
export const MetalPowderEffect: DefenseModifierEffect = {
  itemId: 24,
  itemName: "Metal Powder",
  category: ItemEffectCategory.DEFENSE_MODIFIER,
  description: "Doubles Ditto's Defense",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: ItemEffectContext): boolean {
    if (context.defendingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if Pokemon is Ditto (ID 132)
    const pokemonId = context.defendingPokemon.pokemon.id;
    if (pokemonId !== 132) {
      return false;
    }

    return context.move.category.equals(MoveCategory.fromNameEn("Physical"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

// Export all defense modifier effects for registration
export const ALL_DEFENSE_MODIFIERS: DefenseModifierEffect[] = [
  EvioliteEffect,
  DeepSeaScaleEffect,
  AssaultVestEffect,
  MetalPowderEffect,
];
