import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import { townsWithImage, Town } from "../domain/towns";
import { Guess, loadAllGuesses, saveGuesses } from "../domain/guess";

const startDay = "2022-05-05";

const forcedTowns: Record<string, string> = {
  "2022-08-15": "DE",
  "2022-11-07": "DE",
  "2023-05-06": "PO",
};

export function getDayString(shiftDayCount?: number) {
  return DateTime.now()
    .plus({ days: shiftDayCount ?? 0 })
    .toFormat("yyyy-MM-dd");
}

export function useTodays(dayString: string): [
  {
    town?: Town;
    guesses: Guess[];
  },
  (guess: Guess) => void,
  number,
  number
] {
  const [todays, setTodays] = useState<{
    town?: Town;
    guesses: Guess[];
  }>({ guesses: [] });

  const addGuess = useCallback(
    (newGuess: Guess) => {
      if (todays == null) {
        return;
      }

      const newGuesses = [...todays.guesses, newGuess];

      setTodays((prev) => ({ town: prev.town, guesses: newGuesses }));
      saveGuesses(dayString, newGuesses);
    },
    [dayString, todays]
  );

  useEffect(() => {
    const guesses = loadAllGuesses()[dayString] ?? [];
    const town = getTown(dayString);

    setTodays({ town, guesses });
  }, [dayString]);

  const randomAngle = useMemo(
    () => seedrandom.alea(dayString)() * 360,
    [dayString]
  );

  const imageScale = useMemo(() => {
    const normalizedAngle = 45 - (randomAngle % 90);
    const radianAngle = (normalizedAngle * Math.PI) / 180;
    return 1 / (Math.cos(radianAngle) * Math.sqrt(2));
  }, [randomAngle]);

  return [todays, addGuess, randomAngle, imageScale];
}

function getTown(dayString: string) {
  const forcedTownCode = forcedTowns[dayString];
  const forcedTown =
    forcedTownCode != null
      ? townsWithImage.find((town) => town.code === forcedTownCode)
      : undefined;

  if (forcedTown) {
    return forcedTown;
  }

  const initialDay = DateTime.fromISO(startDay);
  const today = DateTime.fromISO(dayString);

  if (today < initialDay) {
    return townsWithImage[
      Math.floor(seedrandom.alea(dayString)() * townsWithImage.length)
    ];
  }

  const diff = today.diff(initialDay, "days");
  const townOffset = diff.days % townsWithImage.length;

  return townsWithImage[townOffset];
}
