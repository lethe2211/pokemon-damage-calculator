export class DamageResult {
  minDamage: number;
  maxDamage: number;
  minDamageRatio: number;
  maxDamageRatio: number;
  maxKakutei: number;
  minKakutei: number;

  constructor(
    minDamage: number,
    maxDamage: number,
    minDamageRatio: number,
    maxDamageRatio: number,
    maxKakutei: number,
    minKakutei: number
  ) {
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.minDamageRatio = minDamageRatio;
    this.maxDamageRatio = maxDamageRatio;
    this.maxKakutei = maxKakutei;
    this.minKakutei = minKakutei;
  }
}
