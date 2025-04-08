import React from "react";
import { Town } from "./Town";
import { SettingsData } from "../hooks/useSettings";
import { BonusRound } from "../domain/bonus";
import { Shield } from "./Shield";
import { allBonusCompleted, BonusData } from "../hooks/useBonus";
import { Limits } from "./Limits";

interface GameProps {
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
  bonusData: BonusData;
  updateBonusData: (newBonusData: Partial<BonusData>) => void;
}

export function Game({
  settingsData,
  updateSettings,
  bonusData,
  updateBonusData,
}: GameProps) {
  if (BonusRound.NONE === bonusData.round || allBonusCompleted(bonusData)) {
    return (
      <Town
        settingsData={settingsData}
        updateSettings={updateSettings}
        bonusData={bonusData}
        updateBonusData={updateBonusData}
      />
    );
  } else if (BonusRound.SHIELD === bonusData.round) {
    return (
      <Shield
        settingsData={settingsData}
        bonusData={bonusData}
        updateBonusData={updateBonusData}
      />
    );
  } else if (BonusRound.LIMITS === bonusData.round) {
    return (
      <Limits
        settingsData={settingsData}
        bonusData={bonusData}
        updateBonusData={updateBonusData}
      />
    );
  }

  return <></>;
}
