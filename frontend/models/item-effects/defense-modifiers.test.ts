import {
  EvioliteEffect,
  DeepSeaScaleEffect,
  AssaultVestEffect,
  MetalPowderEffect,
} from "./defense-modifiers";
import { ItemEffectContext } from "./item-effect-types";
import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";
import { Item } from "../item";
import { Pokemon } from "../pokemon";

describe("Defense Modifier Items", () => {
  describe("Eviolite (しんかのきせき)", () => {
    test("applies when Eviolite is equipped", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1), // Bulbasaur (can evolve)
          item: new Item(21), // Eviolite
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(EvioliteEffect.applies(context)).toBe(true);
      expect(EvioliteEffect.getModifier(context)).toBe(6144); // 1.5×
    });

    test("applies to both physical and special defense", () => {
      const physicalContext: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1),
          item: new Item(21), // Eviolite
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Physical
      };

      const specialContext: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1),
          item: new Item(21), // Eviolite
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Special
      };

      expect(EvioliteEffect.applies(physicalContext)).toBe(true);
      expect(EvioliteEffect.applies(specialContext)).toBe(true);
    });

    test("does not apply without Eviolite", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1),
          item: new Item(0), // No item
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36),
      };

      expect(EvioliteEffect.applies(context)).toBe(false);
      expect(EvioliteEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Deep Sea Scale (しんかいのウロコ)", () => {
    test("applies to Clamperl against special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(366), // Clamperl
          item: new Item(22), // Deep Sea Scale
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(DeepSeaScaleEffect.applies(context)).toBe(true);
      expect(DeepSeaScaleEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("does not apply to non-Clamperl Pokemon", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(22), // Deep Sea Scale
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Special
      };

      expect(DeepSeaScaleEffect.applies(context)).toBe(false);
      expect(DeepSeaScaleEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to Clamperl against physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(366), // Clamperl
          item: new Item(22), // Deep Sea Scale
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(DeepSeaScaleEffect.applies(context)).toBe(false);
      expect(DeepSeaScaleEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Assault Vest (とつげきチョッキ)", () => {
    test("applies against special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1), // Bulbasaur
          item: new Item(23), // Assault Vest
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(AssaultVestEffect.applies(context)).toBe(true);
      expect(AssaultVestEffect.getModifier(context)).toBe(6144); // 1.5×
    });

    test("does not apply against physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1),
          item: new Item(23), // Assault Vest
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(AssaultVestEffect.applies(context)).toBe(false);
      expect(AssaultVestEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Assault Vest", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(1),
          item: new Item(0), // No item
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Special
      };

      expect(AssaultVestEffect.applies(context)).toBe(false);
      expect(AssaultVestEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Metal Powder (メタルパウダー)", () => {
    test("applies to Ditto against physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(132), // Ditto
          item: new Item(24), // Metal Powder
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(MetalPowderEffect.applies(context)).toBe(true);
      expect(MetalPowderEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("does not apply to non-Ditto Pokemon", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(24), // Metal Powder
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Physical
      };

      expect(MetalPowderEffect.applies(context)).toBe(false);
      expect(MetalPowderEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to Ditto against special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {} as AttackingPokemonStatus,
        defendingPokemon: {
          pokemon: new Pokemon(132), // Ditto
          item: new Item(24), // Metal Powder
        } as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(MetalPowderEffect.applies(context)).toBe(false);
      expect(MetalPowderEffect.getModifier(context)).toBe(4096);
    });
  });
});
