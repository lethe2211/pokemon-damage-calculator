import {
  ChoiceBandEffect,
  ChoiceSpecsEffect,
  DeepSeaToothEffect,
  LightBallEffect,
  ThickClubEffect,
} from "./attack-modifiers";
import { ItemEffectContext } from "./item-effect-types";
import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";
import { Item } from "../item";
import { Pokemon } from "../pokemon";

describe("Attack Modifier Items", () => {
  describe("Choice Band (こだわりハチマキ)", () => {
    test("applies to physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(4), // Choice Band
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(ChoiceBandEffect.applies(context)).toBe(true);
      expect(ChoiceBandEffect.getModifier(context)).toBe(6144); // 1.5×
    });

    test("does not apply to special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(4), // Choice Band
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(ChoiceBandEffect.applies(context)).toBe(false);
      expect(ChoiceBandEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Choice Band", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(0), // No item
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(ChoiceBandEffect.applies(context)).toBe(false);
      expect(ChoiceBandEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Choice Specs (こだわりメガネ)", () => {
    test("applies to special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(5), // Choice Specs
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(ChoiceSpecsEffect.applies(context)).toBe(true);
      expect(ChoiceSpecsEffect.getModifier(context)).toBe(6144); // 1.5×
    });

    test("does not apply to physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(5), // Choice Specs
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(ChoiceSpecsEffect.applies(context)).toBe(false);
      expect(ChoiceSpecsEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Deep Sea Tooth (しんかいのキバ)", () => {
    test("applies to Clamperl with special move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(366), // Clamperl
          item: new Item(6), // Deep Sea Tooth
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(352), // Water Pulse (Special)
      };

      expect(DeepSeaToothEffect.applies(context)).toBe(true);
      expect(DeepSeaToothEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("does not apply to non-Clamperl Pokemon", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(6), // Deep Sea Tooth
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(DeepSeaToothEffect.applies(context)).toBe(false);
      expect(DeepSeaToothEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to Clamperl with physical move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(366), // Clamperl
          item: new Item(6), // Deep Sea Tooth
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(DeepSeaToothEffect.applies(context)).toBe(false);
      expect(DeepSeaToothEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Light Ball (でんきだま)", () => {
    test("applies to Pikachu", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(9), // Light Ball
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(LightBallEffect.applies(context)).toBe(true);
      expect(LightBallEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("applies to Pikachu with physical move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(9), // Light Ball
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(9), // Thunder Punch (Physical)
      };

      expect(LightBallEffect.applies(context)).toBe(true);
      expect(LightBallEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("does not apply to non-Pikachu Pokemon", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(1), // Bulbasaur
          item: new Item(9), // Light Ball
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt
      };

      expect(LightBallEffect.applies(context)).toBe(false);
      expect(LightBallEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Thick Club (ふといホネ)", () => {
    test("applies to Cubone with physical move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(104), // Cubone
          item: new Item(14), // Thick Club
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(ThickClubEffect.applies(context)).toBe(true);
      expect(ThickClubEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("applies to Marowak with physical move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(105), // Marowak
          item: new Item(14), // Thick Club
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(ThickClubEffect.applies(context)).toBe(true);
      expect(ThickClubEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("applies to Alolan Marowak with physical move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(10115), // Alolan Marowak
          item: new Item(14), // Thick Club
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(ThickClubEffect.applies(context)).toBe(true);
      expect(ThickClubEffect.getModifier(context)).toBe(8192); // 2.0×
    });

    test("does not apply to non-Cubone/Marowak Pokemon", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(14), // Thick Club
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down
      };

      expect(ThickClubEffect.applies(context)).toBe(false);
      expect(ThickClubEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to Cubone with special move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(104), // Cubone
          item: new Item(14), // Thick Club
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(ThickClubEffect.applies(context)).toBe(false);
      expect(ThickClubEffect.getModifier(context)).toBe(4096);
    });
  });
});
