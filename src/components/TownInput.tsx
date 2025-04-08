import { t } from "i18next";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { towns, sanitizeTownName } from "../domain/towns";

interface CountryInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
}

export function CountryInput({
  inputRef,
  currentGuess,
  setCurrentGuess,
}: CountryInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(
          towns
            .map((t) => t.name.toUpperCase())
            .filter((countryName) =>
              sanitizeTownName(countryName).includes(sanitizeTownName(value))
            )
        )
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => (
        <div className="border-2 dark:bg-slate-800 dark:text-slate-100">
          {suggestion}
        </div>
      )}
      containerProps={{
        className: "border-2 rounded flex-auto relative",
      }}
      inputProps={{
        ref: inputRef,
        className: "w-full dark:bg-slate-800 dark:text-slate-100 p-1",
        placeholder: t("placeholder"),
        value: currentGuess,
        onChange: (_e, { newValue }) => setCurrentGuess(newValue),
        autoFocus: true,
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          className={`${containerProps.className} absolute bottom-full w-full bg-white mb-1 divide-x-2 max-h-52 overflow-auto`}
        >
          {children}
        </div>
      )}
    />
  );
}
