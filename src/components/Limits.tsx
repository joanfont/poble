import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Town, towns, sanitizeTownName, getNeighbours } from "../domain/towns";
import { CountryInput } from "./TownInput";
import { useTranslation } from "react-i18next";
import { getDayString, useTodays } from "../hooks/useTodays";
import { MyEmoji } from "./Emoji";
import { SettingsData } from "../hooks/useSettings";
import { BonusData, LimitGuess } from "../hooks/useBonus";
import _ from "lodash";
import { LimitGuesses } from "./LimitGuesses";

interface LimitsProps {
  settingsData: SettingsData;
  bonusData: BonusData;
  updateBonusData: (bonusData: Partial<BonusData>) => void;
}

export function Limits({
  settingsData,
  bonusData,
  updateBonusData,
}: LimitsProps) {
  const { t } = useTranslation();

  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  const townInputRef = useRef<HTMLInputElement>(null);

  const [currentGuess, setCurrentGuess] = useState("");

  const { guesses } = bonusData.limits;

  const containsAllValidGuesses = (limitGuesses: LimitGuess[]) => {
    if (undefined === town) {
      return false;
    }

    const codes = limitGuesses.map(
      (limitGuess: LimitGuess) => limitGuess.town.code
    );

    for (const code of town.neighbours) {
      if (!_.includes(codes, code)) {
        return false;
      }
    }

    return true;
  };

  const [todays] = useTodays(dayString);
  const { town } = todays;

  const neighbours = undefined !== town ? getNeighbours(town) : [];

  const MAX_TRY_COUNT = neighbours.length + 2;

  const gameEnded =
    guesses.length === MAX_TRY_COUNT || containsAllValidGuesses(guesses);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (town == null) {
        return;
      }
      e.preventDefault();
      const guessedTown = towns.find(
        (town) => sanitizeTownName(town.name) === sanitizeTownName(currentGuess)
      );

      if (guessedTown == null) {
        toast.error(t("unknownTown"));
        return;
      }

      updateBonusData({
        limits: {
          guesses: [
            ...bonusData.limits.guesses,
            {
              town: guessedTown,
              valid: _.includes(town.neighbours, guessedTown.code),
            },
          ],
        },
      });

      setCurrentGuess("");
    },
    [town, currentGuess, t, bonusData, updateBonusData]
  );

  return (
    <div className="flex-grow flex flex-col mx-2">
      <div className="flex mt-8 mb-8 place-content-center">
        <span className="text-2xl place-content-center">
          {t("guessLimits", { town: town?.name })}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 space-x-4 mt-4 mb-4">
        {neighbours.map((town: Town) => {
          return (
            <div className="grid place-content-center" key={town.code}>
              <img
                className={`pointer-events-none h-52 transition-transform duration-700 ease-in dark:invert`}
                alt="shield to guess"
                src={`images/towns/${town?.code.toLowerCase()}/shape.svg`}
              />
            </div>
          );
        })}
      </div>
      <LimitGuesses
        rowCount={MAX_TRY_COUNT}
        limitGuesses={guesses}
        townInputRef={townInputRef}
      />
      <div className="my-2">
        {gameEnded && town ? (
          <></>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <CountryInput
                inputRef={townInputRef}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
              />
              <button
                className="rounded font-bold p-1 flex items-center justify-center border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                type="submit"
              >
                <MyEmoji
                  text="🌍"
                  options={{ className: "inline-block" }}
                  className="flex items-center justify-center"
                />{" "}
                <span className="ml-1">{t("guess")}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
