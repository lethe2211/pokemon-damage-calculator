import { DamageResult } from "../models/damage-result";

type Props = {
  damageResult: DamageResult;
};

const Result: React.FC<Props> = ({ damageResult }) => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
      <div>
        <div className="w-full bg-neutral-200">
          <div
            className="bg-primary p-0.5 text-center text-xs font-medium leading-none text-primary-100"
            style={{ width: "25%" }}
          >
            25%
          </div>
        </div>
        <div>
          <span>{damageResult.minDamage}~{damageResult.maxDamage}</span>
          <span>{damageResult.minDamageRatio}%~{damageResult.maxDamageRatio}%</span>
          <span>乱数{damageResult.minKakutei}発、確定{damageResult.maxKakutei}発</span>
        </div>
      </div>
    </footer>
  );
};

export default Result;
