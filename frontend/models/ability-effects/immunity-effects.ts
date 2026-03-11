import { TypeImmunityEffect } from "./ability-effect-types";
import { Type } from "../type";

/**
 * Type immunity ability effects.
 * These abilities grant immunity to specific move types.
 */

/**
 * Levitate (ふゆう)
 * Ability ID: 26
 *
 * Grants immunity to Ground-type moves.
 *
 * Example Pokemon: Gengar, Bronzong, Flygon
 */
export const LevitateEffect: TypeImmunityEffect = {
  abilityId: 26,
  abilityName: "Levitate",
  immuneToType: Type.fromNameEn("Ground"),
};

/**
 * Sap Sipper (そうしょく)
 * Ability ID: 157
 *
 * Grants immunity to Grass-type moves.
 * When hit by a Grass move, raises Attack by 1 stage.
 *
 * Example Pokemon: Azumarill, Bouffalant, Gogoat
 *
 * Note: The Attack boost is not implemented in this damage calculator.
 */
export const SapSipperEffect: TypeImmunityEffect = {
  abilityId: 157,
  abilityName: "Sap Sipper",
  immuneToType: Type.fromNameEn("Grass"),
  onImmunity: (context) => {
    // In a full implementation, this would raise the Attack stat
    // For this damage calculator, we only implement the immunity
    console.log(
      `${context.defendingPokemon.pokemon} is immune to Grass moves (Sap Sipper)`
    );
  },
};

/**
 * Volt Absorb (ちくでん)
 * Ability ID: 10
 *
 * Grants immunity to Electric-type moves.
 * When hit by an Electric move, restores 1/4 of max HP.
 *
 * Example Pokemon: Jolteon, Lanturn, Pachirisu
 *
 * Note: The HP restoration is not implemented in this damage calculator.
 */
export const VoltAbsorbEffect: TypeImmunityEffect = {
  abilityId: 10,
  abilityName: "Volt Absorb",
  immuneToType: Type.fromNameEn("Electric"),
  onImmunity: (context) => {
    // In a full implementation, this would restore HP
    console.log(
      `${context.defendingPokemon.pokemon} is immune to Electric moves (Volt Absorb)`
    );
  },
};

/**
 * Water Absorb (ちょすい)
 * Ability ID: 11
 *
 * Grants immunity to Water-type moves.
 * When hit by a Water move, restores 1/4 of max HP.
 *
 * Example Pokemon: Vaporeon, Poliwrath, Lapras
 *
 * Note: The HP restoration is not implemented in this damage calculator.
 */
export const WaterAbsorbEffect: TypeImmunityEffect = {
  abilityId: 11,
  abilityName: "Water Absorb",
  immuneToType: Type.fromNameEn("Water"),
  onImmunity: (context) => {
    // In a full implementation, this would restore HP
    console.log(
      `${context.defendingPokemon.pokemon} is immune to Water moves (Water Absorb)`
    );
  },
};

/**
 * Flash Fire (もらいび)
 * Ability ID: 18
 *
 * Grants immunity to Fire-type moves.
 * When hit by a Fire move, powers up Fire-type moves by 50%.
 *
 * Example Pokemon: Heatran, Chandelure, Arcanine
 *
 * Note: The power boost is not implemented in this damage calculator.
 */
export const FlashFireEffect: TypeImmunityEffect = {
  abilityId: 18,
  abilityName: "Flash Fire",
  immuneToType: Type.fromNameEn("Fire"),
  onImmunity: (context) => {
    // In a full implementation, this would activate Flash Fire boost
    console.log(
      `${context.defendingPokemon.pokemon} is immune to Fire moves (Flash Fire)`
    );
  },
};

/**
 * Lightning Rod (ひらいしん)
 * Ability ID: 31
 *
 * Grants immunity to Electric-type moves.
 * When hit by an Electric move, raises Special Attack by 1 stage.
 *
 * Example Pokemon: Raichu, Rhyhorn, Cubone
 *
 * Note: The Special Attack boost is not implemented in this damage calculator.
 */
export const LightningRodEffect: TypeImmunityEffect = {
  abilityId: 31,
  abilityName: "Lightning Rod",
  immuneToType: Type.fromNameEn("Electric"),
  onImmunity: (context) => {
    // In a full implementation, this would raise Special Attack
    console.log(
      `${context.defendingPokemon.pokemon} is immune to Electric moves (Lightning Rod)`
    );
  },
};

/**
 * Storm Drain (よびみず)
 * Ability ID: 114
 *
 * Grants immunity to Water-type moves.
 * When hit by a Water move, raises Special Attack by 1 stage.
 *
 * Example Pokemon: Gastrodon, Cradily, Lumineon
 *
 * Note: The Special Attack boost is not implemented in this damage calculator.
 */
export const StormDrainEffect: TypeImmunityEffect = {
  abilityId: 114,
  abilityName: "Storm Drain",
  immuneToType: Type.fromNameEn("Water"),
  onImmunity: (context) => {
    // In a full implementation, this would raise Special Attack
    console.log(
      `${context.defendingPokemon.pokemon} is immune to Water moves (Storm Drain)`
    );
  },
};

/**
 * Export all type immunity effects for registration.
 */
export const typeImmunityEffects: TypeImmunityEffect[] = [
  LevitateEffect,
  SapSipperEffect,
  VoltAbsorbEffect,
  WaterAbsorbEffect,
  FlashFireEffect,
  LightningRodEffect,
  StormDrainEffect,
];
