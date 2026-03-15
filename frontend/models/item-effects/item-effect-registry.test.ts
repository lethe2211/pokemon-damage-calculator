import { ItemEffectRegistry } from "./item-effect-registry";
import { ItemEffectContext } from "./item-effect-types";
import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";
import { Item } from "../item";

describe("ItemEffectRegistry", () => {
  describe("Singleton Pattern", () => {
    test("getInstance returns the same instance", () => {
      const registry1 = ItemEffectRegistry.getInstance();
      const registry2 = ItemEffectRegistry.getInstance();

      expect(registry1).toBe(registry2);
    });
  });

  describe("Default Behavior (No Effects Registered)", () => {
    const registry = ItemEffectRegistry.getInstance();

    // Create minimal context for testing
    const createContext = (attackingItemId = 0, defendingItemId = 0): ItemEffectContext => ({
      attackingPokemon: {
        item: new Item(attackingItemId),
      } as AttackingPokemonStatus,
      defendingPokemon: {
        item: new Item(defendingItemId),
      } as DefendingPokemonStatus,
      environment: {} as EnvironmentStatus,
      move: {} as Move,
    });

    test("getPowerModifier returns 4096 (no effect) when no item equipped", () => {
      const context = createContext(0, 0);
      expect(registry.getPowerModifier(context)).toBe(4096);
    });

    test("getAttackModifier returns 4096 (no effect) when no item equipped", () => {
      const context = createContext(0, 0);
      expect(registry.getAttackModifier(context)).toBe(4096);
    });

    test("getDefenseModifier returns 4096 (no effect) when no item equipped", () => {
      const context = createContext(0, 0);
      expect(registry.getDefenseModifier(context)).toBe(4096);
    });

    test("getDamageModifier returns 4096 (no effect) for BEFORE_STAB timing", () => {
      const context = createContext(0, 0);
      expect(registry.getDamageModifier(context, "BEFORE_STAB")).toBe(4096);
    });

    test("getDamageModifier returns 4096 (no effect) for AFTER_STAB timing", () => {
      const context = createContext(0, 0);
      expect(registry.getDamageModifier(context, "AFTER_STAB")).toBe(4096);
    });

    test("getTypeBoost returns 4096 (no effect) when no item equipped", () => {
      const context = createContext(0, 0);
      expect(registry.getTypeBoost(context)).toBe(4096);
    });

    test("returns 4096 for items without registered effects", () => {
      // ID 25 = "Other Items" with no effects
      const context = createContext(25, 25);

      expect(registry.getPowerModifier(context)).toBe(4096);
      expect(registry.getAttackModifier(context)).toBe(4096);
      expect(registry.getDefenseModifier(context)).toBe(4096);
      expect(registry.getTypeBoost(context)).toBe(4096);
    });
  });
});
