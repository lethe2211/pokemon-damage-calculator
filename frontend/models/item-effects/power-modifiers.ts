import {
  PowerModifierEffect,
  ItemEffectCategory,
  ItemEffectContext,
} from "./item-effect-types";
import { Type } from "../type";
import { MoveCategory } from "../move";

// List of punching moves (for Punch Gloves)
const PUNCHING_MOVES = [
  7, // Fire Punch
  8, // Ice Punch
  9, // Thunder Punch
  409, // Drain Punch
  612, // Meteor Mash
  8, // Mach Punch (duplicated - need to verify)
  325, // Shadow Punch
  418, // Bullet Punch
  331, // Hammer Arm
  360, // Focus Punch
  370, // Close Combat
  409, // Drain Punch
  408, // Power-Up Punch
  447, // Dizzy Punch
  // Add more punching moves as needed
];

// Life Orb moved to damage-modifiers.ts (applied after type effectiveness)

/**
 * Soul Dew (こころのしずく)
 * ID: 3
 * Effect: Boosts Psychic and Dragon-type moves by 1.2× for Latios/Latias
 * Modifier: 4915
 */
export const SoulDewEffect: PowerModifierEffect = {
  itemId: 3,
  itemName: "Soul Dew",
  category: ItemEffectCategory.POWER_MODIFIER,
  description: "Boosts Psychic and Dragon-type moves by 1.2× for Latios/Latias",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if Pokemon is Latias (ID 380) or Latios (ID 381)
    const pokemonId = context.attackingPokemon.pokemon.id;
    if (pokemonId !== 380 && pokemonId !== 381) {
      return false;
    }

    // Check if move is Psychic or Dragon type
    const moveType = context.move.type;
    return (
      moveType.equals(Type.fromNameEn("Psychic")) ||
      moveType.equals(Type.fromNameEn("Dragon"))
    );
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4915 : 4096;
  },

  moveCondition(move) {
    const moveType = move.type;
    return (
      moveType.equals(Type.fromNameEn("Psychic")) ||
      moveType.equals(Type.fromNameEn("Dragon"))
    );
  },
};

// Expert Belt moved to damage-modifiers.ts (applied after type effectiveness)

/**
 * Muscle Band (ちからのハチマキ)
 * ID: 10
 * Effect: Boosts physical moves by 1.1×
 * Modifier: 4505
 */
export const MuscleBandEffect: PowerModifierEffect = {
  itemId: 10,
  itemName: "Muscle Band",
  category: ItemEffectCategory.POWER_MODIFIER,
  description: "Boosts physical moves by 1.1×",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    return context.move.category.equals(MoveCategory.fromNameEn("Physical"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4505 : 4096;
  },

  moveCondition(move) {
    return move.category.equals(MoveCategory.fromNameEn("Physical"));
  },
};

/**
 * Normal Gem (ノーマルジュエル)
 * ID: 11
 * Effect: Boosts Normal-type moves by 1.3×
 * Modifier: 5325
 */
export const NormalGemEffect: PowerModifierEffect = {
  itemId: 11,
  itemName: "Normal Gem",
  category: ItemEffectCategory.POWER_MODIFIER,
  description: "Boosts Normal-type moves by 1.3×",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    return context.move.type.equals(Type.fromNameEn("Normal"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 5325 : 4096;
  },

  moveCondition(move) {
    return move.type.equals(Type.fromNameEn("Normal"));
  },
};

/**
 * Punch Gloves (パンチグローブ)
 * ID: 12
 * Effect: Boosts punching moves by 1.1×
 * Modifier: 4505
 */
export const PunchGlovesEffect: PowerModifierEffect = {
  itemId: 12,
  itemName: "Punch Gloves",
  category: ItemEffectCategory.POWER_MODIFIER,
  description: "Boosts punching moves by 1.1×",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    return PUNCHING_MOVES.includes(context.move.id);
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4505 : 4096;
  },

  moveCondition(move) {
    return PUNCHING_MOVES.includes(move.id);
  },
};

/**
 * Wise Glasses (ものしりメガネ)
 * ID: 15
 * Effect: Boosts special moves by 1.1×
 * Modifier: 4505
 */
export const WiseGlassesEffect: PowerModifierEffect = {
  itemId: 15,
  itemName: "Wise Glasses",
  category: ItemEffectCategory.POWER_MODIFIER,
  description: "Boosts special moves by 1.1×",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    return context.move.category.equals(MoveCategory.fromNameEn("Special"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4505 : 4096;
  },

  moveCondition(move) {
    return move.category.equals(MoveCategory.fromNameEn("Special"));
  },
};

/**
 * Fairy Feather (ようせいのハネ)
 * ID: 16
 * Effect: Boosts Fairy-type moves by 1.2×
 * Modifier: 4915
 */
export const FairyFeatherEffect: PowerModifierEffect = {
  itemId: 16,
  itemName: "Fairy Feather",
  category: ItemEffectCategory.POWER_MODIFIER,
  description: "Boosts Fairy-type moves by 1.2×",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    return context.move.type.equals(Type.fromNameEn("Fairy"));
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4915 : 4096;
  },

  moveCondition(move) {
    return move.type.equals(Type.fromNameEn("Fairy"));
  },
};

// Export all power modifier effects for registration
// Note: LifeOrbEffect and ExpertBeltEffect moved to damage-modifiers.ts
export const ALL_POWER_MODIFIERS: PowerModifierEffect[] = [
  SoulDewEffect,
  MuscleBandEffect,
  NormalGemEffect,
  PunchGlovesEffect,
  WiseGlassesEffect,
  FairyFeatherEffect,
];
