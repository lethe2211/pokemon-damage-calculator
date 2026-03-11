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
    test("returns registered power modifiers (Phase 2)", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const powerModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.POWER_MODIFIER
      );
      // Phase 2 + Phase 5a: 6 power modifiers (Iron Fist, Technician, Tough Claws, Sheer Force, Sand Force, Solar Power)
      expect(powerModifiers).toEqual([89, 101, 181, 125, 159, 94]);
    });

    test("returns registered attack modifiers (Phase 3)", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const attackModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.ATTACK_MODIFIER
      );
      // Phase 3: 5 attack modifiers (Hustle, Guts, Huge Power, Pure Power, Heatproof)
      expect(attackModifiers).toEqual([55, 62, 37, 74, 85]);
    });

    test("returns registered defense modifiers (Phase 3)", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const defenseModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.DEFENSE_MODIFIER
      );
      // Phase 3: No defense modifiers (Thick Fat and Heatproof were moved away)
      expect(defenseModifiers).toEqual([]);
    });

    test("returns registered damage modifiers (Phase 4)", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const damageModifiers = registry.getRegisteredAbilities(
        AbilityEffectCategory.DAMAGE_MODIFIER
      );
      // Phase 4: 7 damage modifiers
      // Filter, Solid Rock, Prism Armor, Multiscale, Tinted Lens, Sniper, Thick Fat
      expect(damageModifiers).toEqual([111, 116, 232, 136, 110, 97, 47]);
    });

    test("returns registered type immunities (Phase 4)", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const typeImmunities = registry.getRegisteredAbilities(
        AbilityEffectCategory.TYPE_IMMUNITY
      );
      // Phase 4: 7 type immunities (Levitate, Sap Sipper, Volt Absorb, Water Absorb, Flash Fire, Lightning Rod, Storm Drain)
      expect(typeImmunities).toEqual([26, 157, 10, 11, 18, 31, 114]);
    });

    test("returns registered type conversions (Phase 5a + 5b)", () => {
      const registry = AbilityEffectRegistry.getInstance();

      const typeConversions = registry.getRegisteredAbilities(
        AbilityEffectCategory.TYPE_CONVERSION
      );
      // Phase 5a + 5b: 5 type conversion abilities (Pixilate, Aerilate, Galvanize, Refrigerate, Normalize)
      expect(typeConversions).toEqual([182, 184, 206, 174, 96]);
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
