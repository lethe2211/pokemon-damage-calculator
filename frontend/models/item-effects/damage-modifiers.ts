import {
  DamageModifierEffect,
  ItemEffectCategory,
  ItemEffectContext,
} from "./item-effect-types";

/**
 * Damage-Reducing Berries (半減きのみ)
 * ID: 20
 * Effect: Reduces super-effective damage by 50%
 * Modifier: 2048
 * Timing: AFTER_STAB
 *
 * This is an abstract item representing type-specific berries such as:
 * - Occa Berry (Fire), Passho Berry (Water), Wacan Berry (Electric)
 * - Rindo Berry (Grass), Yache Berry (Ice), Chople Berry (Fighting)
 * - Kebia Berry (Poison), Shuca Berry (Ground), Coba Berry (Flying)
 * - Payapa Berry (Psychic), Tanga Berry (Bug), Charti Berry (Rock)
 * - Kasib Berry (Ghost), Haban Berry (Dragon), Colbur Berry (Dark)
 * - Babiri Berry (Steel), Chilan Berry (Normal), Roseli Berry (Fairy)
 */
export const DamageReducingBerryEffect: DamageModifierEffect = {
  itemId: 20,
  itemName: "Damage-Reducing Berries",
  category: ItemEffectCategory.DAMAGE_MODIFIER,
  description: "Reduces super-effective damage by 50%",
  timing: "AFTER_STAB",

  applies(context: ItemEffectContext): boolean {
    if (context.defendingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if move is super-effective (typeEffectiveness > 1.0)
    return (
      context.typeEffectiveness !== undefined &&
      context.typeEffectiveness > 1.0
    );
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 2048 : 4096; // 0.5× reduction
  },
};

/**
 * Expert Belt (たつじんのおび)
 * ID: 8
 * Effect: Boosts super-effective moves by 1.2×
 * Modifier: 4915 (1.2×)
 * Timing: AFTER_STAB
 *
 * Applied BEFORE Life Orb according to damage calculation order.
 */
export const ExpertBeltEffect: DamageModifierEffect = {
  itemId: 8,
  itemName: "Expert Belt",
  category: ItemEffectCategory.DAMAGE_MODIFIER,
  description: "Boosts super-effective moves by 1.2×",
  timing: "AFTER_STAB",

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Check if move is super-effective (typeEffectiveness > 1.0)
    return (
      context.typeEffectiveness !== undefined &&
      context.typeEffectiveness > 1.0
    );
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4915 : 4096; // 1.2× boost
  },
};

/**
 * Life Orb (いのちのたま)
 * ID: 2
 * Effect: Boosts damage by 1.3× (5324/4096)
 * Modifier: 5324
 * Timing: AFTER_STAB
 *
 * Applied AFTER Expert Belt according to damage calculation order.
 * Reference: https://wiki.xn--rckteqa2e.com/wiki/いのちのたま
 */
export const LifeOrbEffect: DamageModifierEffect = {
  itemId: 2,
  itemName: "Life Orb",
  category: ItemEffectCategory.DAMAGE_MODIFIER,
  description: "Boosts damage by 1.3× (5324/4096)",
  timing: "AFTER_STAB",

  applies(context: ItemEffectContext): boolean {
    return context.attackingPokemon.item.id === this.itemId;
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 5324 : 4096; // Correct multiplier: 5324/4096
  },
};

// Export all damage modifier effects for registration
// Order matters: Expert Belt is applied before Life Orb
export const ALL_DAMAGE_MODIFIERS: DamageModifierEffect[] = [
  DamageReducingBerryEffect,
  ExpertBeltEffect, // Applied first
  LifeOrbEffect, // Applied second (after Expert Belt)
];
