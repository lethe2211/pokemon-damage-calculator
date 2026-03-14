import {
  DamageReducingBerryEffect,
  ExpertBeltEffect,
  LifeOrbEffect,
} from "./damage-modifiers";
import { ItemEffectContext } from "./item-effect-types";
import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";
import { Item } from "../item";

describe("Damage Modifier Items", () => {
  describe("Damage-Reducing Berries (半減きのみ)", () => {
    test("applies when defending Pokemon has berry and move is super-effective", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          item: new Item(20), // Damage-Reducing Berries
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 2.0, // Super effective
      };

      expect(DamageReducingBerryEffect.applies(context)).toBe(true);
      expect(DamageReducingBerryEffect.getModifier(context)).toBe(2048); // 0.5×
    });

    test("applies when type effectiveness is 4.0", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          item: new Item(20),
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 4.0, // Double super effective
      };

      expect(DamageReducingBerryEffect.applies(context)).toBe(true);
      expect(DamageReducingBerryEffect.getModifier(context)).toBe(2048);
    });

    test("does not apply to neutral effectiveness moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          item: new Item(20),
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 1.0, // Neutral
      };

      expect(DamageReducingBerryEffect.applies(context)).toBe(false);
      expect(DamageReducingBerryEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to not very effective moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          item: new Item(20),
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 0.5, // Not very effective
      };

      expect(DamageReducingBerryEffect.applies(context)).toBe(false);
      expect(DamageReducingBerryEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without the berry", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          item: new Item(0), // No item
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 2.0,
      };

      expect(DamageReducingBerryEffect.applies(context)).toBe(false);
      expect(DamageReducingBerryEffect.getModifier(context)).toBe(4096);
    });

    test("has correct timing (AFTER_STAB)", () => {
      expect(DamageReducingBerryEffect.timing).toBe("AFTER_STAB");
    });
  });

  describe("Expert Belt (たつじんのおび)", () => {
    test("applies when move is super-effective", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(8), // Expert Belt
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 2.0, // Super effective
      };

      expect(ExpertBeltEffect.applies(context)).toBe(true);
      expect(ExpertBeltEffect.getModifier(context)).toBe(4915); // 1.2×
    });

    test("does not apply to neutral or not-very-effective moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(8), // Expert Belt
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 1.0, // Neutral
      };

      expect(ExpertBeltEffect.applies(context)).toBe(false);
      expect(ExpertBeltEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Expert Belt", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(0), // No item
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
        typeEffectiveness: 2.0,
      };

      expect(ExpertBeltEffect.applies(context)).toBe(false);
      expect(ExpertBeltEffect.getModifier(context)).toBe(4096);
    });

    test("has correct timing (AFTER_STAB)", () => {
      expect(ExpertBeltEffect.timing).toBe("AFTER_STAB");
    });
  });

  describe("Life Orb (いのちのたま)", () => {
    test("applies when Life Orb is equipped", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(2), // Life Orb
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
      };

      expect(LifeOrbEffect.applies(context)).toBe(true);
      expect(LifeOrbEffect.getModifier(context)).toBe(5324); // Correct: 5324/4096
    });

    test("does not apply without Life Orb", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(0), // No item
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
      };

      expect(LifeOrbEffect.applies(context)).toBe(false);
      expect(LifeOrbEffect.getModifier(context)).toBe(4096);
    });

    test("has correct timing (AFTER_STAB)", () => {
      expect(LifeOrbEffect.timing).toBe("AFTER_STAB");
    });

    test("uses correct multiplier 5324 (not 5325)", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(2), // Life Orb
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: {} as Move,
      };

      // Verify it's 5324, not 5325
      expect(LifeOrbEffect.getModifier(context)).toBe(5324);
      expect(LifeOrbEffect.getModifier(context)).not.toBe(5325);
    });
  });
});
