import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { towns, Town } from "../domain/towns";
import { Guess, loadAllGuesses, saveGuesses } from "../domain/guess";

const startDay = "2022-05-05";

const forcedTowns: Record<string, string> = {};

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
  (guess: Guess) => void
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

  return [todays, addGuess];
}

function getTown(dayString: string) {
  const forcedTownCode = forcedTowns[dayString];
  const forcedTown =
    forcedTownCode != null
      ? towns.find((town: Town) => town.code === forcedTownCode)
      : undefined;

  if (forcedTown) {
    return forcedTown;
  }

  const initialDay = DateTime.fromISO(startDay);
  const today = DateTime.fromISO(dayString);

  const diff = today.diff(initialDay, "days");

  return towns[diff.days % towns.length];
}
