import {
  AttackModifierEffect,
  ItemEffectCategory,
  ItemEffectContext,
} from "./item-effect-types";
import { MoveCategory } from "../move";

/**
 * Choice Band (こだわりハチマキ)
 * ID: 4
 * Effect: Boosts Attack by 1.5× for physical moves
 * Modifier: 6144
 */
export const ChoiceBandEffect: AttackModifierEffect = {
  itemId: 4,
  itemName: "Choice Band",
  category: ItemEffectCategory.ATTACK_MODIFIER,
  description: "Boosts Attack by 1.5×",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }
    return context.move.category.equals(MoveCategory.fromNameEn("Physical"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Choice Specs (こだわりメガネ)
 * ID: 5
 * Effect: Boosts Special Attack by 1.5× for special moves
 * Modifier: 6144
 */
export const ChoiceSpecsEffect: AttackModifierEffect = {
  itemId: 5,
  itemName: "Choice Specs",
  category: ItemEffectCategory.ATTACK_MODIFIER,
  description: "Boosts Special Attack by 1.5×",
  affectsPhysical: false,
  affectsSpecial: true,

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }
    return context.move.category.equals(MoveCategory.fromNameEn("Special"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 6144 : 4096;
  },
};

/**
 * Deep Sea Tooth (しんかいのキバ)
 * ID: 6
 * Effect: Doubles Clamperl's Special Attack
 * Modifier: 8192
 * Only works for Clamperl (Pokemon ID: 366)
 */
export const DeepSeaToothEffect: AttackModifierEffect = {
  itemId: 6,
  itemName: "Deep Sea Tooth",
  category: ItemEffectCategory.ATTACK_MODIFIER,
  description: "Doubles Clamperl's Special Attack",
  affectsPhysical: false,
  affectsSpecial: true,

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if Pokemon is Clamperl (ID 366)
    const pokemonId = context.attackingPokemon.pokemon.id;
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
 * Light Ball (でんきだま)
 * ID: 9
 * Effect: Doubles Pikachu's Attack and Special Attack
 * Modifier: 8192
 * Only works for Pikachu (Pokemon ID: 25)
 */
export const LightBallEffect: AttackModifierEffect = {
  itemId: 9,
  itemName: "Light Ball",
  category: ItemEffectCategory.ATTACK_MODIFIER,
  description: "Doubles Pikachu's Attack and Special Attack",
  affectsPhysical: true,
  affectsSpecial: true,

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if Pokemon is Pikachu (ID 25)
    return context.attackingPokemon.pokemon.id === 25;
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

/**
 * Thick Club (ふといホネ)
 * ID: 14
 * Effect: Doubles Cubone/Marowak's Attack
 * Modifier: 8192
 * Only works for Cubone (ID 104), Marowak (ID 105), and Alolan Marowak (ID 10115)
 */
export const ThickClubEffect: AttackModifierEffect = {
  itemId: 14,
  itemName: "Thick Club",
  category: ItemEffectCategory.ATTACK_MODIFIER,
  description: "Doubles Cubone/Marowak/Alolan Marowak's Attack",
  affectsPhysical: true,
  affectsSpecial: false,

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if Pokemon is Cubone (ID 104), Marowak (ID 105), or Alolan Marowak (ID 10115)
    const pokemonId = context.attackingPokemon.pokemon.id;
    if (pokemonId !== 104 && pokemonId !== 105 && pokemonId !== 10115) {
      return false;
    }

    return context.move.category.equals(MoveCategory.fromNameEn("Physical"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 8192 : 4096;
  },
};

// Export all attack modifier effects for registration
export const ALL_ATTACK_MODIFIERS: AttackModifierEffect[] = [
  ChoiceBandEffect,
  ChoiceSpecsEffect,
  DeepSeaToothEffect,
  LightBallEffect,
  ThickClubEffect,
];
