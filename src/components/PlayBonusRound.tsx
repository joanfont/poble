import React from "react";
import { useTranslation } from "react-i18next";
import { BonusRound } from "../domain/bonus";
import { BonusData } from "../hooks/useBonus";

interface PlayBonusRoundProps {
  nextBonusRound: BonusRound;
  updateBonusData: (bonusData: Partial<BonusData>) => void;
}

export function PlayBonusRound({
  nextBonusRound,
  updateBonusData,
}: PlayBonusRoundProps) {
  const { t } = useTranslation();
  return (
    <button
      className="rounded font-bold border-2 p-1 uppercase bg-green-600 hover:bg-green-500 active:bg-green-700 text-white w-full"
      onClick={() => updateBonusData({ round: nextBonusRound })}
    >
      {t("playBonusRound")}
    </button>
  );
}
