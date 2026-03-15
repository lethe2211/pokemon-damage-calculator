import {
  TypeBoostEffect,
  ItemEffectCategory,
  ItemEffectContext,
} from "./item-effect-types";

/**
 * Type Boost Items (タイプ強化系)
 * ID: 7
 * Effect: Boosts moves of a specific type by 1.2×
 * Modifier: 4915
 *
 * This is an abstract item representing all type-boosting items such as:
 * - Plates: Flame Plate (Fire), Splash Plate (Water), Zap Plate (Electric), etc.
 * - Incenses: Rose Incense (Grass), Sea Incense (Water), etc.
 * - Type items: Charcoal (Fire), Mystic Water (Water), Magnet (Electric),
 *   Miracle Seed (Grass), Never-Melt Ice (Ice), Black Belt (Fighting),
 *   Poison Barb (Poison), Soft Sand (Ground), Sharp Beak (Flying),
 *   Twisted Spoon (Psychic), Silver Powder (Bug), Hard Stone (Rock),
 *   Spell Tag (Ghost), Dragon Fang (Dragon), Black Glasses (Dark),
 *   Metal Coat (Steel), Silk Scarf (Normal), Pixie Plate (Fairy)
 *
 * Note: In a complete implementation, the UI would allow selecting which
 * specific type is boosted. For now, we assume it boosts the move's type.
 */
export const TypeBoostItemEffect: TypeBoostEffect = {
  itemId: 7,
  itemName: "Type Boost Items",
  category: ItemEffectCategory.TYPE_BOOST,
  description: "Boosts moves of specific type by 1.2×",
  boostedType: null, // Determined at runtime based on move type

  applies(context: ItemEffectContext): boolean {
    if (context.attackingPokemon.item.id !== this.itemId) {
      return false;
    }

    // Since this is an abstract item, we assume it boosts the move's type
    // In a complete implementation, the UI would specify which type is boosted
    // and we would check: context.move.type.equals(this.boostedType)
    return true;
  },

  getModifier(context: ItemEffectContext): number {
    return this.applies(context) ? 4915 : 4096; // 1.2× boost
  },
};

// Export all type boost effects for registration
export const ALL_TYPE_BOOST_EFFECTS: TypeBoostEffect[] = [TypeBoostItemEffect];
