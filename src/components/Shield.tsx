import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Town, pickManyWithTown } from "../domain/towns";
import { useTranslation } from "react-i18next";
import { getDayString, useTodays } from "../hooks/useTodays";
import { Bonus } from "../domain/bonus";
import { SettingsData } from "../hooks/useSettings";
import { PlayBonusRound } from "./PlayBonusRound";

const MAX_TRY_COUNT = 4;

interface ShieldProps {
  settingsData: SettingsData;
  bonusRound: Bonus;
  updateBonusRound: (bonusRound: Bonus) => void;
}

export function Shield({
  settingsData,
  bonusRound,
  updateBonusRound,
}: ShieldProps) {
  const { t } = useTranslation();

  const [canPlayNextRound, setCanPlayNextRound] = useState(false);

  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  const [todays] = useTodays(dayString);
  const { town } = todays;

  const randomTowns = undefined !== town ? pickManyWithTown(town, 4) : [];

  const checkTown = (selectedTown: Town) => {
    console.log(town);
    if (selectedTown.code === town?.code) {
      setCanPlayNextRound(true);
      toast.success(t("welldone"));
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
            nextBonusRound={Bonus.SHIELD}
            setBonusRound={updateBonusRound}
            bonusRound={bonusRound}
          />
        )}
      </div>
    </div>
  );
}
