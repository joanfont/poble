import React from "react";
import { Town } from "./Town";
import { SettingsData } from "../hooks/useSettings";
import { Bonus } from "../domain/bonus";
import { Shield } from "./Shield";

export interface GameProps {
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
  bonusRound: Bonus;
  updateBonusRound: (bonusRound: Bonus) => void;
}

export function Game({
  settingsData,
  updateSettings,
  bonusRound,
  updateBonusRound,
}: GameProps) {
  if (Bonus.NONE === bonusRound) {
    return (
      <Town
        settingsData={settingsData}
        updateSettings={updateSettings}
        bonusRound={bonusRound}
        updateBonusRound={updateBonusRound}
      />
    );
  } else if (Bonus.SHIELD === bonusRound) {
    return (
      <Shield
        settingsData={settingsData}
        bonusRound={bonusRound}
        updateBonusRound={updateBonusRound}
      />
    );
  }

  return <></>;
}
