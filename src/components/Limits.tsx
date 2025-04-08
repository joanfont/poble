import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Town, towns, sanitizeTownName, getNeighbours } from "../domain/towns";
import { CountryInput } from "./TownInput";
import { useTranslation } from "react-i18next";
import { getDayString, useTodays } from "../hooks/useTodays";
import { MyEmoji } from "./Emoji";
import { SettingsData } from "../hooks/useSettings";
import { BonusData, LimitGuess } from "../hooks/useBonus";
import { LimitGuesses } from "./LimitGuesses";
import { Share } from "./Share";
import { gameEnded } from "../domain/game";
import { BonusRound } from "../domain/bonus";

interface LimitsProps {
  settingsData: SettingsData;
  bonusData: BonusData;
  updateBonusData: (newBonusData: Partial<BonusData>) => void;
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

  const [todays] = useTodays(dayString);
  const { town, guesses } = todays;

  const hasAllValidGuesses = () => {
    if (undefined === town) {
      return false;
    }

    const codes = bonusData.limits.guesses.map(
      (limitGuess: LimitGuess) => limitGuess.town.code
    );

    if (codes.length !== town.neighbours.length) {
      return false;
    }

    for (const code of town.neighbours) {
      if (!codes.includes(code)) {
        return false;
      }
    }

    return true;
  };

  const townIsGuessed = useCallback(
    (t: Town): boolean => {
      const guessCodes = bonusData.limits.guesses
        .filter((lg: LimitGuess) => lg.valid)
        .map((lg: LimitGuess) => lg.town.code);

      return guessCodes.includes(t.code);
    },
    [bonusData.limits.guesses]
  );

  const neighbours = undefined !== town ? getNeighbours(town) : [];

  const MAX_TRY_COUNT = neighbours.length + 2;

  const gameIsEnded = gameEnded(guesses);

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

      const newLimitGuess = {
        town: guessedTown,
        valid: town.neighbours.includes(guessedTown.code),
      };

      const newLimitGuesses = [...bonusData.limits.guesses, newLimitGuess];
      updateBonusData({
        limits: {
          guesses: newLimitGuesses,
        },
      });

      const allGuessesAreValid = (limitGuesses: LimitGuess[]): boolean => {
        const codes = limitGuesses.map(
          (limitGuess: LimitGuess) => limitGuess.town.code
        );

        for (const code of town.neighbours) {
          if (!codes.includes(code)) {
            return false;
          }
        }

        return true;
      };

      setCurrentGuess("");

      if (allGuessesAreValid(newLimitGuesses)) {
        updateBonusData({
          passedRounds: [...bonusData.passedRounds, BonusRound.LIMITS],
          limits: {
            guesses: newLimitGuesses,
          },
        });
        toast.success(t("welldone"));
      } else if (newLimitGuesses.length === MAX_TRY_COUNT) {
        toast.error(t("bonusRoundNoMoreTries"));
      }
    },
    [town, currentGuess, t, bonusData, updateBonusData, MAX_TRY_COUNT]
  );

  return (
    <div className="flex-grow flex flex-col mx-2">
      <div className="flex mt-8 mb-8 place-content-center">
        <span className="text-2xl place-content-center">
          {t("guessLimits", { town: town?.name })}
        </span>
      </div>
      <div className="grid grid-cols-3 pt-4 pb-4 mt-4 mb-4">
        {neighbours.map((town: Town) => {
          return (
            <div
              className="grid place-content-center mt-4 mb-4 ml-4 mr-4"
              key={town.code}
            >
              <img
                className={
                  `pointer-events-none h-52 transition-transform duration-700 ease-in dark:invert pb-4 pt-4 pt-4 pr-4` &&
                  townIsGuessed(town)
                    ? " bg-pink-500 rounded invert"
                    : ""
                }
                alt="shield to guess"
                src={`images/towns/${town?.code.toLowerCase()}/shape.svg`}
              />
            </div>
          );
        })}
      </div>
      <LimitGuesses
        rowCount={MAX_TRY_COUNT}
        limitGuesses={bonusData.limits.guesses}
        townInputRef={townInputRef}
      />
      <div className="my-2">
        {!hasAllValidGuesses() &&
          bonusData.limits.guesses.length < MAX_TRY_COUNT && (
            <>
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
            </>
          )}
        {gameIsEnded && (
          <Share
            guesses={guesses}
            bonusData={bonusData}
            dayString={dayString}
            settingsData={settingsData}
          />
        )}
      </div>
    </div>
  );
}
