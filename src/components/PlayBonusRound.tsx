import React from "react";
import { useTranslation } from "react-i18next";
import { Bonus, ROUNDS } from "../domain/bonus";

interface PlayBonusRoundPayload {
  bonusRound: Bonus;
  nextBonusRound: Bonus;
  setBonusRound: (bonusRound: Bonus) => void;
}

export function PlayBonusRound({
  bonusRound,
  nextBonusRound,
  setBonusRound,
}: PlayBonusRoundPayload) {
  const { t } = useTranslation();
  return (
    <button
      className="rounded font-bold border-2 p-1 uppercase bg-green-600 hover:bg-green-500 active:bg-green-700 text-white w-full"
      onClick={() => setBonusRound(nextBonusRound)}
    >
      {t("playBonusRound")} ({bonusRound}/{ROUNDS})
    </button>
  );
}
