import React from "react";
import { Town } from "./Town";
import { SettingsData } from "../hooks/useSettings";
import { Bonus } from "../domain/bonus";
import { Shield } from "./Shield";
import { BonusData } from "../hooks/useBonusRound";

interface GameProps {
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
  bonusData: BonusData;
  updateBonusData: (bonusData: Partial<BonusData>) => void;
}

export function Game({
  settingsData,
  updateSettings,
  bonusData,
  updateBonusData,
}: GameProps) {
  const bonusRound = bonusData.bonusRound;
  if (Bonus.NONE === bonusRound) {
    return (
      <Town
        settingsData={settingsData}
        updateSettings={updateSettings}
        bonusData={bonusData}
        updateBonusData={updateBonusData}
      />
    );
  } else if (Bonus.SHIELD === bonusRound) {
    return (
      <Shield
        settingsData={settingsData}
        bonusData={bonusData}
        updateBonusData={updateBonusData}
      />
    );
  }

  return <></>;
}
