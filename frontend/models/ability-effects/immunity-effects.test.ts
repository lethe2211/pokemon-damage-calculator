import {
  LevitateEffect,
  SapSipperEffect,
  VoltAbsorbEffect,
  WaterAbsorbEffect,
  FlashFireEffect,
  LightningRodEffect,
  StormDrainEffect,
} from "./immunity-effects";
import { Type } from "../type";

describe("Type Immunity Abilities", () => {
  describe("Levitate (ふゆう)", () => {
    test("grants immunity to Ground type", () => {
      expect(LevitateEffect.abilityId).toBe(26);
      expect(LevitateEffect.immuneToType.equals(Type.fromNameEn("Ground"))).toBe(
        true
      );
    });

    test("does not grant immunity to other types", () => {
      expect(
        LevitateEffect.immuneToType.equals(Type.fromNameEn("Water"))
      ).toBe(false);
      expect(LevitateEffect.immuneToType.equals(Type.fromNameEn("Fire"))).toBe(
        false
      );
    });
  });

  describe("Sap Sipper (そうしょく)", () => {
    test("grants immunity to Grass type", () => {
      expect(SapSipperEffect.abilityId).toBe(157);
      expect(
        SapSipperEffect.immuneToType.equals(Type.fromNameEn("Grass"))
      ).toBe(true);
    });

    test("has onImmunity callback", () => {
      expect(SapSipperEffect.onImmunity).toBeDefined();
    });
  });

  describe("Volt Absorb (ちくでん)", () => {
    test("grants immunity to Electric type", () => {
      expect(VoltAbsorbEffect.abilityId).toBe(10);
      expect(
        VoltAbsorbEffect.immuneToType.equals(Type.fromNameEn("Electric"))
      ).toBe(true);
    });

    test("has onImmunity callback", () => {
      expect(VoltAbsorbEffect.onImmunity).toBeDefined();
    });
  });

  describe("Water Absorb (ちょすい)", () => {
    test("grants immunity to Water type", () => {
      expect(WaterAbsorbEffect.abilityId).toBe(11);
      expect(
        WaterAbsorbEffect.immuneToType.equals(Type.fromNameEn("Water"))
      ).toBe(true);
    });

    test("has onImmunity callback", () => {
      expect(WaterAbsorbEffect.onImmunity).toBeDefined();
    });
  });

  describe("Flash Fire (もらいび)", () => {
    test("grants immunity to Fire type", () => {
      expect(FlashFireEffect.abilityId).toBe(18);
      expect(FlashFireEffect.immuneToType.equals(Type.fromNameEn("Fire"))).toBe(
        true
      );
    });

    test("has onImmunity callback", () => {
      expect(FlashFireEffect.onImmunity).toBeDefined();
    });
  });

  describe("Lightning Rod (ひらいしん)", () => {
    test("grants immunity to Electric type", () => {
      expect(LightningRodEffect.abilityId).toBe(31);
      expect(
        LightningRodEffect.immuneToType.equals(Type.fromNameEn("Electric"))
      ).toBe(true);
    });

    test("has onImmunity callback", () => {
      expect(LightningRodEffect.onImmunity).toBeDefined();
    });
  });

  describe("Storm Drain (よびみず)", () => {
    test("grants immunity to Water type", () => {
      expect(StormDrainEffect.abilityId).toBe(114);
      expect(
        StormDrainEffect.immuneToType.equals(Type.fromNameEn("Water"))
      ).toBe(true);
    });

    test("has onImmunity callback", () => {
      expect(StormDrainEffect.onImmunity).toBeDefined();
    });
  });
});
