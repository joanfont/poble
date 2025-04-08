import { DateTime, Interval } from "luxon";
import { useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  computeProximityPercent,
  generateSquareCharacters,
  getDirectionEmoji,
} from "../domain/geography";
import { Guess } from "../domain/guess";
import React from "react";
import { SettingsData } from "../hooks/useSettings";
import { BonusData } from "../hooks/useBonus";
import { BonusRound } from "../domain/bonus";

const START_DATE = DateTime.fromISO("2022-03-19");

interface ShareProps {
  guesses: Guess[];
  dayString: string;
  settingsData: SettingsData;
  bonusData: BonusData;
}

export function Share({
  guesses,
  dayString,
  settingsData,
  bonusData,
}: ShareProps) {
  const { t } = useTranslation();
  const { theme } = settingsData;

  const shareText = useMemo(() => {
    const win = guesses[guesses.length - 1]?.distance === 0;
    const bestDistance = Math.min(...guesses.map(({ distance }) => distance));
    const guessCount = win ? guesses.length : "X";
    const dayCount = Math.floor(
      Interval.fromDateTimes(START_DATE, DateTime.fromISO(dayString)).length(
        "day"
      )
    );

    const bestPercent = `(${computeProximityPercent(
      bestDistance
    ).toString()}%)`;

    const title = `#Poble #${dayCount} ${guessCount}/4 ${bestPercent}`;

    const guessString = guesses
      .map((guess) => {
        const percent = computeProximityPercent(guess.distance);
        const squares = generateSquareCharacters(percent, theme).join("");
        const direction = getDirectionEmoji(guess);
        return `${squares}${direction}`;
      })
      .join("\n");

    const bonusStrings = [];
    if (bonusData.passedRounds.includes(BonusRound.SHIELD)) {
      bonusStrings.push("🛡️");
    }

    if (bonusData.passedRounds.includes(BonusRound.LIMITS)) {
      bonusStrings.push("🧭");
    }

    return [
      title,
      guessString,
      "",
      bonusStrings.join(" "),
      "",
      "https://poble.joanfont.cat",
    ].join("\n");
  }, [dayString, guesses, theme, bonusData.passedRounds]);

  return (
    <CopyToClipboard
      text={shareText}
      onCopy={() => toast(t("copy"))}
      options={{
        format: "text/plain",
      }}
    >
      <button className="rounded font-bold border-2 p-1 uppercase bg-green-600 hover:bg-green-500 active:bg-green-700 text-white w-full">
        {t("share")}
      </button>
    </CopyToClipboard>
  );
}
