import { DefenseModifierEffect } from "./ability-effect-types";

/**
 * Defense stat-modifying ability effects.
 * These abilities affect the defender's Defense or Special Defense stat.
 *
 * Note: Thick Fat and Heatproof were moved to damage-modifiers.ts
 * as they affect final damage, not defense stats.
 */

/**
 * Export all defense modifier effects for registration.
 */
export const defenseModifierEffects: DefenseModifierEffect[] = [];
