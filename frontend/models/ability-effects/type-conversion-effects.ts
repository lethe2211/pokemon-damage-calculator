import { TypeConversionEffect } from "./ability-effect-types";
import { Type } from "../type";
import { Move } from "../move";

/**
 * Pixilate (フェアリースキン)
 * Ability ID: 182
 * Converts Normal-type moves to Fairy-type and increases power by 20%.
 * Example Pokemon: Sylveon, Mega Altaria
 */
export const PixilateEffect: TypeConversionEffect = {
  abilityId: 182,
  abilityName: "Pixilate",
  sourceType: Type.fromNameEn("Normal"),
  targetType: Type.fromNameEn("Fairy"),
  powerModifier: 4915,
  priority: 1,

  appliesTo(move: Move): boolean {
    return move.type.equals(this.sourceType);
  },
};

/**
 * Aerilate (スカイスキン)
 * Ability ID: 184
 * Converts Normal-type moves to Flying-type and increases power by 20%.
 * Example Pokemon: Mega Salamence, Mega Pinsir
 */
export const AerilateEffect: TypeConversionEffect = {
  abilityId: 184,
  abilityName: "Aerilate",
  sourceType: Type.fromNameEn("Normal"),
  targetType: Type.fromNameEn("Flying"),
  powerModifier: 4915,
  priority: 2,

  appliesTo(move: Move): boolean {
    return move.type.equals(this.sourceType);
  },
};

/**
 * Galvanize (エレキスキン)
 * Ability ID: 206
 * Converts Normal-type moves to Electric-type and increases power by 20%.
 * Example Pokemon: Alolan Golem, Geodude-Alola
 */
export const GalvanizeEffect: TypeConversionEffect = {
  abilityId: 206,
  abilityName: "Galvanize",
  sourceType: Type.fromNameEn("Normal"),
  targetType: Type.fromNameEn("Electric"),
  powerModifier: 4915,
  priority: 3,

  appliesTo(move: Move): boolean {
    return move.type.equals(this.sourceType);
  },
};

/**
 * Refrigerate (フリーズスキン)
 * Ability ID: 174
 * Converts Normal-type moves to Ice-type and increases power by 20%.
 * Example Pokemon: Mega Glalie, Aurorus
 */
export const RefrigerateEffect: TypeConversionEffect = {
  abilityId: 174,
  abilityName: "Refrigerate",
  sourceType: Type.fromNameEn("Normal"),
  targetType: Type.fromNameEn("Ice"),
  powerModifier: 4915,
  priority: 4,

  appliesTo(move: Move): boolean {
    return move.type.equals(this.sourceType);
  },
};

/**
 * Normalize (ノーマルスキン)
 * Ability ID: 96
 * Converts all moves to Normal-type and increases power by 20%.
 * Example Pokemon: Delcatty, Skitty
 *
 * Note: Unlike other type conversion abilities, Normalize converts
 * ALL non-Normal moves to Normal, not just Normal moves to another type.
 */
export const NormalizeEffect: TypeConversionEffect = {
  abilityId: 96,
  abilityName: "Normalize",
  sourceType: Type.fromNameEn("Normal"), // Not used in appliesTo logic
  targetType: Type.fromNameEn("Normal"),
  powerModifier: 4915,
  priority: 5,

  appliesTo(move: Move): boolean {
    // Normalize converts all NON-Normal moves to Normal
    return !move.type.equals(Type.fromNameEn("Normal"));
  },
};

/**
 * Export all type conversion effects for registration.
 */
export const typeConversionEffects: TypeConversionEffect[] = [
  PixilateEffect,
  AerilateEffect,
  GalvanizeEffect,
  RefrigerateEffect,
  NormalizeEffect,
];
