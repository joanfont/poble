import React, {
  ReactText,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { towns, sanitizeTownName } from "../domain/towns";
import { CountryInput } from "./TownInput";
import * as geolib from "geolib";
import { Share } from "./Share";
import { Guesses } from "./Guesses";
import { useTranslation } from "react-i18next";
import { getDayString, useTodays } from "../hooks/useTodays";
import { MyEmoji } from "./Emoji";
import { PlayBonusRound } from "./PlayBonusRound";
import { BonusRound } from "../domain/bonus";
import { SettingsData } from "../hooks/useSettings";
import { allBonusCompleted, BonusData } from "../hooks/useBonus";
import { gameEnded, MAX_TRY_COUNT } from "../domain/game";
import { Map } from "./Map";
interface TownProps {
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
  bonusData: BonusData;
  updateBonusData: (newBonusData: Partial<BonusData>) => void;
}

export function Town({
  settingsData,
  updateSettings,
  bonusData,
  updateBonusData,
}: TownProps) {
  const { t, i18n } = useTranslation();
  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  const townInputRef = useRef<HTMLInputElement>(null);

  const [todays, addGuess] = useTodays(dayString);
  const { town, guesses } = todays;

  const [currentGuess, setCurrentGuess] = useState("");

  const gameIsEnded = gameEnded(guesses);

  const canPlayBonusRound =
    guesses[guesses.length - 1]?.distance === 0 &&
    !allBonusCompleted(bonusData);

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

      const newGuess = {
        name: currentGuess,
        distance: geolib.getDistance(guessedTown, town),
        direction: geolib.getCompassDirection(
          guessedTown,
          town,
          (origin, dest) =>
            Math.round(geolib.getRhumbLineBearing(origin, dest) / 45) * 45
        ),
      };

      addGuess(newGuess);
      setCurrentGuess("");

      if (newGuess.distance === 0) {
        toast.success(t("welldone"), { delay: 2000 });
      }
    },
    [addGuess, town, currentGuess, t]
  );

  useEffect(() => {
    let toastId: ReactText;
    const { town, guesses } = todays;
    if (
      town &&
      guesses.length === MAX_TRY_COUNT &&
      guesses[guesses.length - 1].distance > 0
    ) {
      toastId = toast.info(town.name.toUpperCase(), {
        autoClose: false,
        delay: 2000,
      });
    }

    return () => {
      if (toastId != null) {
        toast.dismiss(toastId);
      }
    };
  }, [todays, i18n.resolvedLanguage]);

  return (
    <div className="flex-grow flex flex-col mx-2">
      <div className="flex my-1">
        {settingsData.allowShiftingDay && settingsData.shiftDayCount > 0 && (
          <button
            type="button"
            onClick={() =>
              updateSettings({
                shiftDayCount: Math.max(0, settingsData.shiftDayCount - 1),
              })
            }
          >
            <MyEmoji text="↪️" className="text-xl" />
          </button>
        )}
        {settingsData.mode === "satellite" && town && (
          <Map zoom={10} latitude={town.latitude} longitude={town.longitude} />
        )}
        {settingsData.mode === "shape" && town && (
          <img
            className="pointer-events-none max-h-52 m-auto transition-transform duration-700 ease-in dark:invert h-full"
            alt="town to guess"
            src={`images/towns/${town?.code.toLowerCase()}/shape.svg`}
          />
        )}
        {settingsData.allowShiftingDay && settingsData.shiftDayCount < 7 && (
          <button
            type="button"
            onClick={() =>
              updateSettings({
                shiftDayCount: Math.min(7, settingsData.shiftDayCount + 1),
              })
            }
          >
            <MyEmoji text="↩️" className="text-xl" />
          </button>
        )}
      </div>
      <Guesses
        rowCount={MAX_TRY_COUNT}
        guesses={guesses}
        settingsData={settingsData}
        townInputRef={townInputRef}
      />
      <div className="my-2">
        {canPlayBonusRound && town && (
          <PlayBonusRound
            nextBonusRound={BonusRound.SHIELD}
            updateBonusData={updateBonusData}
          />
        )}
        {gameIsEnded && town ? (
          <>
            <Share
              guesses={guesses}
              dayString={dayString}
              settingsData={settingsData}
              bonusData={bonusData}
            />
            <a
              className="underline w-full text-center block mt-4"
              href={`https://www.google.com/maps?q=${town.name}+Mallorca&hl=${i18n.resolvedLanguage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MyEmoji
                text={t("showOnGoogleMaps")}
                options={{ className: "inline-block" }}
              />
            </a>
          </>
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
