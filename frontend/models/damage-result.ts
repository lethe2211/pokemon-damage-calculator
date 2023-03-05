export class DamageResult {
  minDamage: number;
  maxDamage: number;
  minDamageRatio: number;
  maxDamageRatio: number;
  minKakutei: number;
  maxKakutei: number;

  constructor(
    minDamage: number,
    maxDamage: number,
    minDamageRatio: number,
    maxDamageRatio: number,
    minKakutei: number,
    maxKakutei: number
  ) {
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.minDamageRatio = minDamageRatio;
    this.maxDamageRatio = maxDamageRatio;
    this.minKakutei = minKakutei;
    this.maxKakutei = maxKakutei;
  }
}
