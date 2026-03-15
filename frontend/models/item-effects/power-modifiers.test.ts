import {
  SoulDewEffect,
  MuscleBandEffect,
  NormalGemEffect,
  PunchGlovesEffect,
  WiseGlassesEffect,
  FairyFeatherEffect,
} from "./power-modifiers";
// LifeOrbEffect and ExpertBeltEffect moved to damage-modifiers.ts
import { ItemEffectContext } from "./item-effect-types";
import { AttackingPokemonStatus } from "../attacking-pokemon-status";
import { DefendingPokemonStatus } from "../defending-pokemon-status";
import { EnvironmentStatus } from "../environment-status";
import { Move } from "../move";
import { Item } from "../item";
import { Pokemon } from "../pokemon";

describe("Power Modifier Items", () => {
  // Life Orb moved to damage-modifiers.test.ts

  describe("Soul Dew (こころのしずく)", () => {
    test("applies to Latias with Psychic move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(380), // Latias (ID 380)
          item: new Item(3), // Soul Dew
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(94), // Psychic
      };

      expect(SoulDewEffect.applies(context)).toBe(true);
      expect(SoulDewEffect.getModifier(context)).toBe(4915); // 1.2×
    });

    test("applies to Latios with Dragon move", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(381), // Latios (ID 381)
          item: new Item(3), // Soul Dew
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(225), // Dragon Claw
      };

      expect(SoulDewEffect.applies(context)).toBe(true);
      expect(SoulDewEffect.getModifier(context)).toBe(4915);
    });

    test("does not apply to other Pokemon", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(25), // Pikachu
          item: new Item(3), // Soul Dew
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(94), // Psychic
      };

      expect(SoulDewEffect.applies(context)).toBe(false);
      expect(SoulDewEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to non-Psychic/Dragon moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          pokemon: new Pokemon(380), // Latias
          item: new Item(3), // Soul Dew
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt
      };

      expect(SoulDewEffect.applies(context)).toBe(false);
      expect(SoulDewEffect.getModifier(context)).toBe(4096);
    });
  });

  // Expert Belt moved to damage-modifiers.test.ts

  describe("Muscle Band (ちからのハチマキ)", () => {
    test("applies to physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(10), // Muscle Band
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(MuscleBandEffect.applies(context)).toBe(true);
      expect(MuscleBandEffect.getModifier(context)).toBe(4505); // 1.1×
    });

    test("does not apply to special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(10), // Muscle Band
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(MuscleBandEffect.applies(context)).toBe(false);
      expect(MuscleBandEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Normal Gem (ノーマルジュエル)", () => {
    test("applies to Normal-type moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(11), // Normal Gem
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(33), // Tackle (Normal)
      };

      expect(NormalGemEffect.applies(context)).toBe(true);
      expect(NormalGemEffect.getModifier(context)).toBe(5325); // 1.3×
    });

    test("does not apply to non-Normal moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(11), // Normal Gem
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Electric)
      };

      expect(NormalGemEffect.applies(context)).toBe(false);
      expect(NormalGemEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Punch Gloves (パンチグローブ)", () => {
    test("applies to punching moves (Drain Punch)", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(12), // Punch Gloves
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(409), // Drain Punch
      };

      expect(PunchGlovesEffect.applies(context)).toBe(true);
      expect(PunchGlovesEffect.getModifier(context)).toBe(4505); // 1.1×
    });

    test("applies to Fire Punch", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(12), // Punch Gloves
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(7), // Fire Punch
      };

      expect(PunchGlovesEffect.applies(context)).toBe(true);
      expect(PunchGlovesEffect.getModifier(context)).toBe(4505);
    });

    test("does not apply to non-punching moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(12), // Punch Gloves
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt
      };

      expect(PunchGlovesEffect.applies(context)).toBe(false);
      expect(PunchGlovesEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Wise Glasses (ものしりメガネ)", () => {
    test("applies to special moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(15), // Wise Glasses
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Special)
      };

      expect(WiseGlassesEffect.applies(context)).toBe(true);
      expect(WiseGlassesEffect.getModifier(context)).toBe(4505); // 1.1×
    });

    test("does not apply to physical moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(15), // Wise Glasses
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(36), // Take Down (Physical)
      };

      expect(WiseGlassesEffect.applies(context)).toBe(false);
      expect(WiseGlassesEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Fairy Feather (ようせいのハネ)", () => {
    test("applies to Fairy-type moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(16), // Fairy Feather
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(584), // Dazzling Gleam (Fairy)
      };

      expect(FairyFeatherEffect.applies(context)).toBe(true);
      expect(FairyFeatherEffect.getModifier(context)).toBe(4915); // 1.2×
    });

    test("does not apply to non-Fairy moves", () => {
      const context: ItemEffectContext = {
        attackingPokemon: {
          item: new Item(16), // Fairy Feather
        } as AttackingPokemonStatus,
        defendingPokemon: {} as DefendingPokemonStatus,
        environment: {} as EnvironmentStatus,
        move: new Move(85), // Thunderbolt (Electric)
      };

      expect(FairyFeatherEffect.applies(context)).toBe(false);
      expect(FairyFeatherEffect.getModifier(context)).toBe(4096);
    });
  });
});
