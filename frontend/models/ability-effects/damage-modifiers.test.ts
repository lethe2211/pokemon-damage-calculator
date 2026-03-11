import {
  FilterEffect,
  SolidRockEffect,
  PrismArmorEffect,
  MultiscaleEffect,
  TintedLensEffect,
  SniperEffect,
  ThickFatEffect,
} from "./damage-modifiers";
import { Ability } from "../ability";
import { Type } from "../type";
import { AbilityEffectContext } from "./ability-effect-types";

describe("Damage Modifier Abilities", () => {
  describe("Filter (フィルター)", () => {
    test("applies when move is super effective", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(111), // Filter
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 2.0, // Super effective
      };

      expect(FilterEffect.applies(context)).toBe(true);
      expect(FilterEffect.getModifier(context)).toBe(3072);
    });

    test("does not apply when move is neutral", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(111),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 1.0, // Neutral
      };

      expect(FilterEffect.applies(context)).toBe(false);
      expect(FilterEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Filter ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(1), // Different ability
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 2.0,
      };

      expect(FilterEffect.applies(context)).toBe(false);
      expect(FilterEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Solid Rock (ハードロック)", () => {
    test("applies when move is super effective", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(116), // Solid Rock
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 4.0, // Double super effective
      };

      expect(SolidRockEffect.applies(context)).toBe(true);
      expect(SolidRockEffect.getModifier(context)).toBe(3072);
    });
  });

  describe("Prism Armor (プリズムアーマー)", () => {
    test("applies when move is super effective", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(232), // Prism Armor
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 2.0,
      };

      expect(PrismArmorEffect.applies(context)).toBe(true);
      expect(PrismArmorEffect.getModifier(context)).toBe(3072);
    });
  });

  describe("Multiscale (マルチスケイル)", () => {
    test("applies when HP is full", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(136), // Multiscale
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defenderCurrentHP: 100,
        defenderMaxHP: 100,
      };

      expect(MultiscaleEffect.applies(context)).toBe(true);
      expect(MultiscaleEffect.getModifier(context)).toBe(2048);
    });

    test("does not apply when HP is not full", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(136),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defenderCurrentHP: 99,
        defenderMaxHP: 100,
      };

      expect(MultiscaleEffect.applies(context)).toBe(false);
      expect(MultiscaleEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply when HP info is missing", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(136),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(MultiscaleEffect.applies(context)).toBe(false);
      expect(MultiscaleEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Tinted Lens (いろめがね)", () => {
    test("applies when move is not very effective", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(110), // Tinted Lens
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 0.5, // Not very effective
      };

      expect(TintedLensEffect.applies(context)).toBe(true);
      expect(TintedLensEffect.getModifier(context)).toBe(8192);
    });

    test("does not apply when move is super effective", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(110),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 2.0,
      };

      expect(TintedLensEffect.applies(context)).toBe(false);
      expect(TintedLensEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply when move has no effect", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(110),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        typeEffectiveness: 0, // No effect
      };

      expect(TintedLensEffect.applies(context)).toBe(false);
      expect(TintedLensEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Sniper (スナイパー)", () => {
    test("applies on critical hit", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(97), // Sniper
          isCriticalHit: true,
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SniperEffect.applies(context)).toBe(true);
      expect(SniperEffect.getModifier(context)).toBe(6144);
    });

    test("does not apply on non-critical hit", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(97),
          isCriticalHit: false,
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SniperEffect.applies(context)).toBe(false);
      expect(SniperEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Sniper ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1),
          isCriticalHit: true,
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SniperEffect.applies(context)).toBe(false);
      expect(SniperEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Thick Fat (あついしぼう)", () => {
    test("applies to Fire-type moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(47), // Thick Fat
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(ThickFatEffect.applies(context)).toBe(true);
      expect(ThickFatEffect.getModifier(context)).toBe(2048);
    });

    test("applies to Ice-type moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(47),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Ice"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(ThickFatEffect.applies(context)).toBe(true);
      expect(ThickFatEffect.getModifier(context)).toBe(2048);
    });

    test("does not apply to other types", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(47),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Water"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(ThickFatEffect.applies(context)).toBe(false);
      expect(ThickFatEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Thick Fat ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(1), // Different ability
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(ThickFatEffect.applies(context)).toBe(false);
      expect(ThickFatEffect.getModifier(context)).toBe(4096);
    });
  });

});
