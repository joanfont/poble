import { useCallback, useEffect, useState } from "react";
import { BonusRound } from "../domain/bonus";
import { Town } from "../domain/towns";

export interface LimitGuess {
  town: Town;
  valid: boolean;
}

export interface BonusData {
  round: BonusRound;
  passedRounds: BonusRound[];
  shield: {
    towns: Town[];
  };
  limits: {
    guesses: LimitGuess[];
  };
}

const defaultBonusData: BonusData = {
  round: BonusRound.NONE,
  passedRounds: [],
  shield: {
    towns: [],
  },
  limits: {
    guesses: [],
  },
};

function loadAllBonusData(): { [key: string]: BonusData } {
  const storedBonusData = localStorage.getItem("bonus");
  return storedBonusData != null ? JSON.parse(storedBonusData) : {};
}

function saveBonusData(dayString: string, bonusData: BonusData): void {
  const allBonusData = loadAllBonusData();
  localStorage.setItem(
    "bonus",
    JSON.stringify({
      ...allBonusData,
      [dayString]: bonusData,
    })
  );
}

export function useBonus(
  dayString: string
): [BonusData, (newBonusData: Partial<BonusData>) => void] {
  const [bonusData, setBonusData] = useState<BonusData>(defaultBonusData);

  const addBonusData = useCallback(
    (newBonusData: Partial<BonusData>) => {
      const updatedBonusData = {
        ...bonusData,
        ...newBonusData,
      };

      setBonusData(updatedBonusData);
      saveBonusData(dayString, updatedBonusData);
    },
    [bonusData, dayString]
  );

  useEffect(() => {
    const bonusData = loadAllBonusData()[dayString] ?? defaultBonusData;
    setBonusData(bonusData);
  }, [dayString]);

  return [bonusData, addBonusData];
}

export function allBonusCompleted(bonusData: BonusData): boolean {
  return (
    bonusData.passedRounds.includes(BonusRound.SHIELD) &&
    bonusData.passedRounds.includes(BonusRound.LIMITS)
  );
}
