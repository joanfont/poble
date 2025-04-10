import { Guess } from "../domain/guess";
import { GuessRow } from "./GuessRow";
import React from "react";
import { SettingsData } from "../hooks/useSettings";

interface GuessesProps {
  rowCount: number;
  guesses: Guess[];
  settingsData: SettingsData;
  townInputRef?: React.RefObject<HTMLInputElement>;
}

export function Guesses({
  rowCount,
  guesses,
  settingsData,
  townInputRef,
}: GuessesProps) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from(Array(rowCount).keys()).map((index) => (
          <GuessRow
            key={index}
            guess={guesses[index]}
            settingsData={settingsData}
            townInputRef={townInputRef}
          />
        ))}
      </div>
    </div>
  );
}
