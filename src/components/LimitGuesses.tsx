import React from "react";
import { LimitGuess } from "../hooks/useBonus";
import { LimitGuessRow } from "./LimitGuessRow";

interface LimitGuessesProps {
  rowCount: number;
  limitGuesses: LimitGuess[];
  townInputRef?: React.RefObject<HTMLInputElement>;
}

export function LimitGuesses({
  rowCount,
  limitGuesses,
  townInputRef,
}: LimitGuessesProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from(Array(rowCount).keys()).map((index) => (
          <LimitGuessRow
            key={index}
            limitGuess={limitGuesses[index]}
            townInputRef={townInputRef}
          />
        ))}
      </div>
    </div>
  );
}
