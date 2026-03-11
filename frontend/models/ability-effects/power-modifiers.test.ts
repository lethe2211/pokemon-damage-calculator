import {
  IronFistEffect,
  TechnicianEffect,
  ToughClawsEffect,
  SheerForceEffect,
  SandForceEffect,
  SolarPowerEffect,
} from "./power-modifiers";
import { Ability } from "../ability";
import { Move } from "../move";
import { Type } from "../type";
import { Weather } from "../weather";
import { AbilityEffectContext } from "./ability-effect-types";

describe("Power Modifier Abilities", () => {
  describe("Iron Fist (てつのこぶし)", () => {
    test("applies to Drain Punch", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(89), // Iron Fist
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(409), // Drain Punch
      };

      expect(IronFistEffect.applies(context)).toBe(true);
      expect(IronFistEffect.getModifier(context)).toBe(4915);
    });

    test("does not apply to non-punching moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(89),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(1), // Pound (not a punch)
      };

      expect(IronFistEffect.applies(context)).toBe(false);
      expect(IronFistEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without Iron Fist ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1), // Different ability
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(409), // Drain Punch
      };

      expect(IronFistEffect.applies(context)).toBe(false);
      expect(IronFistEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Technician (テクニシャン)", () => {
    test("applies to moves with power 60 or less", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(101), // Technician
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(418), // Bullet Punch (power 40)
      };

      expect(TechnicianEffect.applies(context)).toBe(true);
      expect(TechnicianEffect.getModifier(context)).toBe(6144);
    });

    test("does not apply to moves with power greater than 60", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(101),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw (power 80)
      };

      expect(TechnicianEffect.applies(context)).toBe(false);
      expect(TechnicianEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Tough Claws (かたいツメ)", () => {
    test("applies to contact moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(181), // Tough Claws
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337), // Dragon Claw (contact move)
      };

      expect(ToughClawsEffect.applies(context)).toBe(true);
      expect(ToughClawsEffect.getModifier(context)).toBe(5325);
    });

    test("does not apply without Tough Claws ability", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(1),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(337),
      };

      expect(ToughClawsEffect.applies(context)).toBe(false);
      expect(ToughClawsEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Sheer Force (ちからずく)", () => {
    test("applies to Fire Punch (has secondary effect)", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(125), // Sheer Force
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(7), // Fire Punch (10% burn)
      };

      expect(SheerForceEffect.applies(context)).toBe(true);
      expect(SheerForceEffect.getModifier(context)).toBe(5325);
    });

    test("does not apply to moves without secondary effects", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(125),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(1), // Pound (no secondary effect)
      };

      expect(SheerForceEffect.applies(context)).toBe(false);
      expect(SheerForceEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Sand Force (すなのちから)", () => {
    test("applies to Rock-type move in Sandstorm", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(159), // Sand Force
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("Sandstorm"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Rock"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SandForceEffect.applies(context)).toBe(true);
      expect(SandForceEffect.getModifier(context)).toBe(5325);
    });

    test("applies to Ground-type move in Sandstorm", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(159),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("Sandstorm"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Ground"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SandForceEffect.applies(context)).toBe(true);
      expect(SandForceEffect.getModifier(context)).toBe(5325);
    });

    test("does not apply without Sandstorm weather", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(159),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("None"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Rock"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SandForceEffect.applies(context)).toBe(false);
      expect(SandForceEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply to non-Rock/Ground/Steel moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(159),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("Sandstorm"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: {
          type: Type.fromNameEn("Fire"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      };

      expect(SandForceEffect.applies(context)).toBe(false);
      expect(SandForceEffect.getModifier(context)).toBe(4096);
    });
  });

  describe("Solar Power (サンパワー)", () => {
    test("applies to special moves in harsh sunlight", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(94), // Solar Power
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("Harsh sunlight"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(53), // Flamethrower (Special move)
      };

      expect(SolarPowerEffect.applies(context)).toBe(true);
      expect(SolarPowerEffect.getModifier(context)).toBe(6144);
    });

    test("does not apply to physical moves", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(94),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("Harsh sunlight"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(7), // Fire Punch (Physical move)
      };

      expect(SolarPowerEffect.applies(context)).toBe(false);
      expect(SolarPowerEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply without harsh sunlight", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(94),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("None"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(53), // Flamethrower (Special move)
      };

      expect(SolarPowerEffect.applies(context)).toBe(false);
      expect(SolarPowerEffect.getModifier(context)).toBe(4096);
    });

    test("does not apply in rain", () => {
      const context: AbilityEffectContext = {
        attackingPokemon: {
          ability: new Ability(94),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        defendingPokemon: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        environment: {
          weather: Weather.fromNameEn("Rain"),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        move: new Move(53), // Flamethrower (Special move)
      };

      expect(SolarPowerEffect.applies(context)).toBe(false);
      expect(SolarPowerEffect.getModifier(context)).toBe(4096);
    });
  });
});
