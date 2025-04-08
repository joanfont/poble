import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Town, pickManyWithTown } from "../domain/towns";
import { useTranslation } from "react-i18next";
import { getDayString, useTodays } from "../hooks/useTodays";
import { BonusRound } from "../domain/bonus";
import { SettingsData } from "../hooks/useSettings";
import { PlayBonusRound } from "./PlayBonusRound";
import { gameEnded } from "../domain/game";
import { Share } from "./Share";
import { BonusData } from "../hooks/useBonus";

interface ShieldProps {
  settingsData: SettingsData;
  bonusData: BonusData;
  updateBonusData: (newBonusData: Partial<BonusData>) => void;
}

export function Shield({
  settingsData,
  bonusData,
  updateBonusData,
}: ShieldProps) {
  const { t } = useTranslation();

  const canPlayNextRound = bonusData.passedRounds.includes(BonusRound.SHIELD);

  const [canPlay, setCanPlay] = useState(true);

  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  const [todays] = useTodays(dayString);
  const { town, guesses } = todays;

  const gameIsEnded = gameEnded(guesses);

  let randomTowns = bonusData.shield.towns;
  if (randomTowns.length === 0 && undefined !== town) {
    randomTowns = pickManyWithTown(town, 4);
    updateBonusData({ shield: { towns: randomTowns } });
  }

  const checkTown = (selectedTown: Town) => {
    if (canPlay) {
      if (selectedTown.code === town?.code) {
        updateBonusData({
          passedRounds: [...bonusData.passedRounds, BonusRound.SHIELD],
        });
        toast.success(t("welldone"));
      } else {
        setCanPlay(false);
        toast.error(t("incorrect"));
      }
    } else {
      toast.error(t("bonusRoundNoMoreTries"));
    }
  };

  return (
    <div className="flex-grow flex flex-col mx-2">
      <div className="flex mt-8 mb-8 place-content-center">
        <span className="text-2xl place-content-center">
          {t("guessShield", { town: town?.name })}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 space-x-4 mt-4 mb-4">
        {randomTowns.map((town: Town) => {
          return (
            <button key={town.code} onClick={() => checkTown(town)}>
              <div className="grid place-content-center">
                <img
                  className={`pointer-events-none h-52 transition-transform duration-700 ease-in`}
                  alt="shield to guess"
                  src={`images/towns/${town?.code.toLowerCase()}/shield.svg`}
                />
              </div>
            </button>
          );
        })}
      </div>
      <div className="my-2">
        {gameIsEnded && (
          <Share
            guesses={guesses}
            dayString={dayString}
            settingsData={settingsData}
            bonusData={bonusData}
          />
        )}
        {canPlayNextRound && (
          <PlayBonusRound
            nextBonusRound={BonusRound.LIMITS}
            updateBonusData={updateBonusData}
          />
        )}
      </div>
    </div>
  );
}
