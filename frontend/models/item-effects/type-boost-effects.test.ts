import { TypeBoostItemEffect } from "./type-boost-effects";
import { ItemEffectContext } from "./item-effect-types";
import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";
import { Item } from "../item";

describe("Type Boost Items", () => {
  describe("Type Boost Items (タイプ強化系)", () => {
    test("applies when Type Boost Item is equipped", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(7), // Type Boost Items
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Electric)
      };

      expect(TypeBoostItemEffect.applies(context)).toBe(true);
      expect(TypeBoostItemEffect.getModifier(context)).toBe(4915); // 1.2×
    });

    test("applies to any move type (abstract item)", () => {
      const fireContext: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(7),
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(52), // Ember (Fire)
      };

      const waterContext: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(7),
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(55), // Water Gun (Water)
      };

      expect(TypeBoostItemEffect.applies(fireContext)).toBe(true);
      expect(TypeBoostItemEffect.applies(waterContext)).toBe(true);
    });

    test("does not apply without Type Boost Item", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(0), // No item
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt
      };

      expect(TypeBoostItemEffect.applies(context)).toBe(false);
      expect(TypeBoostItemEffect.getModifier(context)).toBe(4096);
    });

    test("has boostedType set to null (abstract item)", () => {
      expect(TypeBoostItemEffect.boostedType).toBeNull();
    });
  });
});
