import { AbilityEffectRegistry } from "./ability-effect-registry";
import { AbilityEffectCategory } from "./ability-effect-types";
import { Ability } from "../ability";
import { Type } from "../type";

describe("AbilityEffectRegistry", () => {
  describe("Singleton pattern", () => {
    test("getInstance returns the same instance", () => {
      const instance1 = AbilityEffectRegistry.getInstance();
      const instance2 = AbilityEffectRegistry.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("getRegisteredAbilities", () => {
    test("returns empty array for each category in Phase 1", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const powerModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.POWER_MODIFIER
      );
      expect(powerModifiers).toEqual([]);

      const attackModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.ATTACK_MODIFIER
      );
      expect(attackModifiers).toEqual([]);

      const defenseModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.DEFENSE_MODIFIER
      );
      expect(defenseModifiers).toEqual([]);

      const damageModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.DAMAGE_MODIFIER
      );
      expect(damageModifiers).toEqual([]);

      const typeImmunities = registry.getRegisteredAbilities(
        AbilityEffectCategory.TYPE_IMMUNITY
      );
      expect(typeImmunities).toEqual([]);
    });
  });

  describe("Modifier methods return default values in Phase 1", () => {
    // Mock context with minimal required properties for testing
    // Using `as any` is acceptable in test code for creating mocks
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const mockContext = {
      attackingPokemon: {
        ability: new Ability(1), // Any ability ID
      } as any,
      defendingPokemon: {
        ability: new Ability(1), // Any ability ID
      } as any,
      environment: {} as any,
      move: {
        type: Type.fromNameEn("Normal"), // Any type
      } as any,
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */

    test("getPowerModifier returns 4096 (no effect)", () => {
      const registry = AbilityEffectRegistry.getInstance();
      const modifier = registry.getPowerModifier(mockContext);
      expect(modifier).toBe(4096);
    });

    test("getAttackModifier returns 4096 (no effect)", () => {
      const registry = AbilityEffectRegistry.getInstance();
      const modifier = registry.getAttackModifier(mockContext);
      expect(modifier).toBe(4096);
    });

    test("getDefenseModifier returns 4096 (no effect)", () => {
      const registry = AbilityEffectRegistry.getInstance();
      const modifier = registry.getDefenseModifier(mockContext);
      expect(modifier).toBe(4096);
    });

    test("getDamageModifier returns 4096 (no effect)", () => {
      const registry = AbilityEffectRegistry.getInstance();
      const modifier = registry.getDamageModifier(mockContext);
      expect(modifier).toBe(4096);
    });

    test("checkTypeImmunity returns false (no immunity)", () => {
      const registry = AbilityEffectRegistry.getInstance();
      const isImmune = registry.checkTypeImmunity(mockContext);
      expect(isImmune).toBe(false);
    });
  });
});
