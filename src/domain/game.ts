import { Guess } from "./guess";

export const MAX_TRY_COUNT = 4;

export const gameEnded = (guesses: Guess[]): boolean => {
  return (
    guesses.length === MAX_TRY_COUNT ||
    guesses[guesses.length - 1]?.distance === 0
  );
};
