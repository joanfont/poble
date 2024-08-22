import { useCallback, useState } from "react";
import { Bonus } from "../domain/bonus";
import { Town } from "../domain/towns";

export interface BonusData {
  bonusRound: Bonus;
  shieldTowns: Town[];
}

const defaultBonusData: BonusData = {
  bonusRound: Bonus.NONE,
  shieldTowns: [],
};

function loadBonusData(): BonusData {
  const storedBonusData = localStorage.getItem("bonus");
  const bonusData = storedBonusData != null ? JSON.parse(storedBonusData) : {};
  return {
    ...defaultBonusData,
    ...bonusData,
  };
}

export function useBonusRound(): [
  BonusData,
  (newBonusData: Partial<BonusData>) => void
] {
  const [bonusData, setBonusData] = useState<BonusData>(loadBonusData());

  const updateBonusData = useCallback(
    (newBonusData: Partial<BonusData>) => {
      const updatedBonusData = {
        ...bonusData,
        ...newBonusData,
      };

      setBonusData(updatedBonusData);
      localStorage.setItem("bonus", JSON.stringify(updatedBonusData));
    },
    [bonusData]
  );

  return [bonusData, updateBonusData];
}
