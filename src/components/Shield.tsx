import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Town, pickManyWithTown } from "../domain/towns";
import { useTranslation } from "react-i18next";
import { getDayString, useTodays } from "../hooks/useTodays";
import { BonusRound } from "../domain/bonus";
import { SettingsData } from "../hooks/useSettings";
import { PlayBonusRound } from "./PlayBonusRound";
import { BonusData } from "../hooks/useBonus";

interface ShieldProps {
  settingsData: SettingsData;
  bonusData: BonusData;
  updateBonusData: (bonusData: Partial<BonusData>) => void;
}

export function Shield({
  settingsData,
  bonusData,
  updateBonusData,
}: ShieldProps) {
  const { t } = useTranslation();

  const [canPlayNextRound, setCanPlayNextRound] = useState(false);
  const [canPlay, setCanPlay] = useState(true);

  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  const [todays] = useTodays(dayString);
  const { town } = todays;

  let randomTowns = bonusData.shield.towns;
  if (randomTowns.length === 0 && undefined !== town) {
    randomTowns = pickManyWithTown(town, 4);
    updateBonusData({ shield: { towns: randomTowns } });
  }

  const checkTown = (selectedTown: Town) => {
    if (canPlay) {
      if (selectedTown.code === town?.code) {
        setCanPlayNextRound(true);
        toast.success(t("welldone"));
      } else {
        setCanPlayNextRound(false);
        setCanPlay(false);
        toast.error(t("incorrect"));
      }
    } else {
      toast.error(t("bonusRoundNoMoreTries"));
    }
  };

  return (
    <div className="flex-grow flex flex-col mx-2">
      <div className="grid grid-cols-2 gap-4 space-x-4 mt-4 mb-4">
        {randomTowns.map((town: Town) => {
          return (
            <button key={town.code} onClick={() => checkTown(town)}>
              <div className="grid place-content-center">
                <img
                  className={`pointer-events-none h-52 transition-transform duration-700 ease-in dark:invert`}
                  alt="shield to guess"
                  src={`images/towns/${town?.code.toLowerCase()}/shield.svg`}
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex my-2">
        {canPlayNextRound && (
          <PlayBonusRound
            nextBonusRound={BonusRound.LIMITS}
            bonusData={bonusData}
            updateBonusData={updateBonusData}
          />
        )}
      </div>
    </div>
  );
}
