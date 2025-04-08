import React, { useCallback, useEffect, useState } from "react";
import { MyEmoji } from "./Emoji";
import { LimitGuess } from "../hooks/useBonus";

const ANIMATION_LENGTH = 250;
type AnimationState = "NOT_STARTED" | "ENDED";

interface LimitGuessRowProps {
  limitGuess?: LimitGuess;
  townInputRef?: React.RefObject<HTMLInputElement>;
}

export function LimitGuessRow({
  limitGuess,
  townInputRef,
}: LimitGuessRowProps) {
  const [animationState, setAnimationState] =
    useState<AnimationState>("NOT_STARTED");

  const getValidEmoji = (valid: boolean) => {
    if (valid) {
      return "✅";
    } else {
      return "❌";
    }
  };

  useEffect(() => {
    setAnimationState("NOT_STARTED");

    if (limitGuess == null) {
      return;
    }

    const timeout = setTimeout(() => {
      setAnimationState("ENDED");
    }, ANIMATION_LENGTH);

    return () => {
      clearTimeout(timeout);
    };
  }, [limitGuess]);

  const handleClickOnEmptyRow = useCallback(() => {
    if (townInputRef?.current != null) {
      townInputRef?.current.focus();
    }
  }, [townInputRef]);

  switch (animationState) {
    case "NOT_STARTED":
      return (
        <div
          onClick={handleClickOnEmptyRow}
          className={`col-span-7 h-8 bg-gray-200 dark:bg-slate-600 rounded`}
        />
      );
    case "ENDED":
      return (
        <>
          <div className="flex items-center justify-center border-2 h-8 col-span-6 animate-reveal rounded">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {limitGuess?.town.name.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center justify-center border-2 h-8 col-span-1 animate-reveal rounded">
            {limitGuess && <MyEmoji text={getValidEmoji(limitGuess?.valid)} />}
          </div>
        </>
      );
  }
}
