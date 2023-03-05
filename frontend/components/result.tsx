import { DamageResult } from "../models/damage-result";

type Props = {
  damageResult: DamageResult;
};

const Result: React.FC<Props> = ({ damageResult }) => {
  const calculateBarRatioForMin = () => {
    if (damageResult.maxDamageRatio >= 100) {
      return "0";
    } else {
      return (100 - damageResult.maxDamageRatio).toString();
    }
  };

  const calculateBarRatioForMax = () => {
    if (damageResult.minDamageRatio >= 100) {
      return "0";
    } else if (damageResult.maxDamageRatio >= 100) {
      return (100 - damageResult.minDamageRatio).toString();
    } else {
      return (
        damageResult.maxDamageRatio - damageResult.minDamageRatio
      ).toString();
    }
  };

  const calculateBarColorForMin = () => {
    if (damageResult.minDamageRatio >= 75) {
      return "bg-red-600";
    } else if (damageResult.minDamageRatio >= 50) {
      return "bg-orange-600";
    } else {
      return "bg-green-600";
    }
  };

  const calculateBarColorForMax = () => {
    if (damageResult.maxDamageRatio >= 75) {
      return "bg-red-200";
    } else if (damageResult.maxDamageRatio >= 50) {
      return "bg-orange-200";
    } else {
      return "bg-green-200";
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white">
      <div className="w-full">
        <div className="overflow-hidden h-2.5 mb-2 w-full flex bg-gray-200 rounded">
          <div
            className={`flex flex-col ${calculateBarColorForMin()}`}
            style={{ width: `${calculateBarRatioForMin()}%` }}
          ></div>
          <div
            className={`flex flex-col ${calculateBarColorForMax()}`}
            style={{
              width: `${calculateBarRatioForMax()}%`,
            }}
          ></div>
        </div>
        <div>
          <span>
            {damageResult.minDamage} ~ {damageResult.maxDamage}
          </span>
          <span>
            （{damageResult.minDamageRatio}% ~ {damageResult.maxDamageRatio}%）
          </span>
          {damageResult.minKakutei === -1 || damageResult.maxKakutei === -1 ? (
            <span>効果なし</span>
          ) : damageResult.minKakutei !== damageResult.maxKakutei ? (
            <>
              <span>乱数{damageResult.minKakutei}発、</span>
              <span>確定{damageResult.maxKakutei}発</span>
            </>
          ) : (
            <span>確定{damageResult.maxKakutei}発</span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Result;
