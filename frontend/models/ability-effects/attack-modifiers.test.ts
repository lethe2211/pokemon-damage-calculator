import {
  HustleEffect,
  GutsEffect,
  HugePowerEffect,
  PurePowerEffect,
  HeatproofEffect,
} from "./attack-modifiers";
import { Ability } from "../ability";
import { Move } from "../move";
import { StatusAilment } from "../status-ailment";
import { Type } from "../type";
import { AbilityEffectContext } from "./ability-effect-types";

describe("Attack Modifier Abilities", () => {
  describe("Hustle (はりきり)", () => {
    test("applies to physical moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(55), // Hustle
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw (physical move)
      };

      expect(HustleEffect.applies(context)).toBe(true);
      expect(HustleEffect.getModifier(context)).toBe(6144);
    });

    test("does not apply to special moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(55),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(56), // Flamethrower (special move)
      };

      expect(HustleEffect.applies(context)).toBe(false);
      expect(HustleEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Hustle ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1), // Different ability
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw
      };

      expect(HustleEffect.applies(context)).toBe(false);
      expect(HustleEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Guts (こんじょう)", () => {
    test("applies to physical moves when afflicted with status condition", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(62), // Guts
          statusAilment: StatusAilment.fromNameEn("Burn"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw (physical move)
      };

      expect(GutsEffect.applies(context)).toBe(true);
      expect(GutsEffect.getModifier(context)).toBe(6144);
    });

    test("applies with paralysis status", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(62),
          statusAilment: StatusAilment.fromNameEn("Paralysis"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337),
      };

      expect(GutsEffect.applies(context)).toBe(true);
      expect(GutsEffect.getModifier(context)).toBe(6144);
    });

    test("does not apply without status condition", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(62),
          statusAilment: StatusAilment.fromNameEn("None"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337),
      };

      expect(GutsEffect.applies(context)).toBe(false);
      expect(GutsEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to special moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(62),
          statusAilment: StatusAilment.fromNameEn("Burn"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(56), // Flamethrower (special move)
      };

      expect(GutsEffect.applies(context)).toBe(false);
      expect(GutsEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Guts ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1),
          statusAilment: StatusAilment.fromNameEn("Burn"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337),
      };

      expect(GutsEffect.applies(context)).toBe(false);
      expect(GutsEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Huge Power (ちからもち)", () => {
    test("applies to physical moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(37), // Huge Power
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw (physical move)
      };

      expect(HugePowerEffect.applies(context)).toBe(true);
      expect(HugePowerEffect.getModifier(context)).toBe(8192);
    });

    test("does not apply to special moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(37),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(56), // Flamethrower (special move)
      };

      expect(HugePowerEffect.applies(context)).toBe(false);
      expect(HugePowerEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Huge Power ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337),
      };

      expect(HugePowerEffect.applies(context)).toBe(false);
      expect(HugePowerEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Pure Power (ヨガパワー)", () => {
    test("applies to physical moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(74), // Pure Power
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw (physical move)
      };

      expect(PurePowerEffect.applies(context)).toBe(true);
      expect(PurePowerEffect.getModifier(context)).toBe(8192);
    });

    test("does not apply to special moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(74),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(56), // Flamethrower (special move)
      };

      expect(PurePowerEffect.applies(context)).toBe(false);
      expect(PurePowerEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Pure Power ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337),
      };

      expect(PurePowerEffect.applies(context)).toBe(false);
      expect(PurePowerEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Heatproof (たいねつ)", () => {
    test("applies to physical Fire-type moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(85), // Heatproof (defending Pokemon's ability)
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
          category: { id: 0 }, // Physical move
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(HeatproofEffect.applies(context)).toBe(true);
      expect(HeatproofEffect.getModifier(context)).toBe(2048);
    });

    test("applies to special Fire-type moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(85),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
          category: { id: 1 }, // Special move
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(HeatproofEffect.applies(context)).toBe(true);
      expect(HeatproofEffect.getModifier(context)).toBe(2048);
    });

    test("does not apply to non-Fire-type moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(85),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Water"),
          category: { id: 1 },
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(HeatproofEffect.applies(context)).toBe(false);
      expect(HeatproofEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Heatproof ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(1), // Different ability
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
          category: { id: 0 },
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(HeatproofEffect.applies(context)).toBe(false);
      expect(HeatproofEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to status moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {
          ability: new Ability(85),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
          category: { id: 2 }, // Status move
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(HeatproofEffect.applies(context)).toBe(false);
      expect(HeatproofEffect.getModifier(context)).toBe(4096);
    });
  });
});
