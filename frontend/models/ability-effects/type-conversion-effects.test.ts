import {
  PixilateEffect,
  AerilateEffect,
  GalvanizeEffect,
  RefrigerateEffect,
  NormalizeEffect,
} from "./type-conversion-effects";
import { Move } from "../move";
import { Type } from "../type";

describe("Type Conversion Abilities", () => {
  describe("Pixilate (フェアリースキン)", () => {
    test("converts Normal-type moves to Fairy", () => {
      const move = new Move(1); // Pound (Normal-type)
      expect(PixilateEffect.appliesTo(move)).toBe(true);
      expect(PixilateEffect.targetType.equals(Type.fromNameEn("Fairy"))).toBe(
        true
      );
    });

    test("does not convert non-Normal-type moves", () => {
      const move = new Move(7); // Fire Punch (Fire-type)
      expect(PixilateEffect.appliesTo(move)).toBe(false);
    });

    test("has correct power modifier", () => {
      expect(PixilateEffect.powerModifier).toBe(4915);
    });

    test("has correct priority", () => {
      expect(PixilateEffect.priority).toBe(1);
    });
  });

  describe("Aerilate (スカイスキン)", () => {
    test("converts Normal-type moves to Flying", () => {
      const move = new Move(161); // Tri Attack (Normal-type)
      expect(AerilateEffect.appliesTo(move)).toBe(true);
      expect(AerilateEffect.targetType.equals(Type.fromNameEn("Flying"))).toBe(
        true
      );
    });

    test("does not convert non-Normal-type moves", () => {
      const move = new Move(53); // Flamethrower (Fire-type)
      expect(AerilateEffect.appliesTo(move)).toBe(false);
    });

    test("has correct priority", () => {
      expect(AerilateEffect.priority).toBe(2);
    });
  });

  describe("Galvanize (エレキスキン)", () => {
    test("converts Normal-type moves to Electric", () => {
      const move = new Move(38); // Double-Edge (Normal-type)
      expect(GalvanizeEffect.appliesTo(move)).toBe(true);
      expect(
        GalvanizeEffect.targetType.equals(Type.fromNameEn("Electric"))
      ).toBe(true);
    });

    test("does not convert non-Normal-type moves", () => {
      const move = new Move(85); // Thunder (Electric-type)
      expect(GalvanizeEffect.appliesTo(move)).toBe(false);
    });

    test("has correct priority", () => {
      expect(GalvanizeEffect.priority).toBe(3);
    });
  });

  describe("Refrigerate (フリーズスキン)", () => {
    test("converts Normal-type moves to Ice", () => {
      const move = new Move(36); // Take Down (Normal-type)
      expect(RefrigerateEffect.appliesTo(move)).toBe(true);
      expect(RefrigerateEffect.targetType.equals(Type.fromNameEn("Ice"))).toBe(
        true
      );
    });

    test("does not convert non-Normal-type moves", () => {
      const move = new Move(58); // Ice Beam (Ice-type)
      expect(RefrigerateEffect.appliesTo(move)).toBe(false);
    });

    test("has correct priority", () => {
      expect(RefrigerateEffect.priority).toBe(4);
    });
  });

  describe("Normalize (ノーマルスキン)", () => {
    test("converts Fire-type moves to Normal", () => {
      const move = new Move(7); // Fire Punch (Fire-type)
      expect(NormalizeEffect.appliesTo(move)).toBe(true);
      expect(NormalizeEffect.targetType.equals(Type.fromNameEn("Normal"))).toBe(
        true
      );
    });

    test("converts Electric-type moves to Normal", () => {
      const move = new Move(85); // Thunder (Electric-type)
      expect(NormalizeEffect.appliesTo(move)).toBe(true);
      expect(NormalizeEffect.targetType.equals(Type.fromNameEn("Normal"))).toBe(
        true
      );
    });

    test("does not convert Normal-type moves", () => {
      const move = new Move(1); // Pound (Normal-type)
      expect(NormalizeEffect.appliesTo(move)).toBe(false);
    });

    test("has correct power modifier", () => {
      expect(NormalizeEffect.powerModifier).toBe(4915);
    });

    test("has correct priority", () => {
      expect(NormalizeEffect.priority).toBe(5);
    });
  });

  describe("Priority ordering", () => {
    test("priorities are correctly ordered", () => {
      const effects = [
        PixilateEffect,
        AerilateEffect,
        GalvanizeEffect,
        RefrigerateEffect,
        NormalizeEffect,
      ];

      for (let i = 0; i < effects.length - 1; i++) {
        expect(effects[i].priority).toBeLessThan(effects[i + 1].priority);
      }
    });
  });
});
