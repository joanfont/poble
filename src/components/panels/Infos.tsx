import { Guesses } from "../Guesses";
import { Panel } from "./Panel";
import React from "react";
import { Worldle } from "../Worldle";
import { formatDistance } from "../../domain/geography";
import { SettingsData } from "../../hooks/useSettings";
import { MyEmoji } from "../Emoji";

interface InfosProps {
  isOpen: boolean;
  close: () => void;
  settingsData: SettingsData;
}

export function Infos({ isOpen, close, settingsData }: InfosProps) {
  return (
    <Panel title="Com jugar" isOpen={isOpen} close={close}>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          Endevina <Worldle /> en 4 intents.
        </div>
        <div>Cada intent ha de ser un poble vàlid de Mallorca...</div>
        <div>
          Després de cada intent, tendràs la distància, la direcció i la{" "}
          proximitat desde entre el teu intent i el poble.
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div className="font-bold">Exemples</div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Vilafranca de Bonany",
                direction: "W",
                distance: 53_000,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            El teu intent{" "}
            <span className="uppercase font-bold">Vilafranca de Bonany</span>és{" "}
            a {formatDistance(53000, settingsData.distanceUnit)} del poble a{" "}
            endevinar, està en direcció Oest i tens una proximitat del 41%.
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Esporles",
                direction: "W",
                distance: 9_000,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            El teu segon intent{" "}
            <span className="uppercase font-bold">Esporles</span> és més aprop{" "}
            {formatDistance(9000, settingsData.distanceUnit)} enfora, a{" "}
            l&apos;oest i 94%!
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Estellencs",
                direction: "N",
                distance: 0,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            El següent intent,{" "}
            <span className="uppercase font-bold">Estellencs</span> és el poble{" "}
            a esbrinar! Enhorabona!{" "}
            <MyEmoji text="🎉" options={{ className: "inline-block" }} />
          </div>
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3 font-bold">
        Un nou <Worldle /> estarà disponible cada dia!
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <Worldle /> està <span className="font-bold">fortament</span> inspirat{" "}
        per
        <a
          className="underline"
          href="https://worldle.teuteuf.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Worldle
        </a>{" "}
        fet per{" "}
        <a
          className="underline"
          href="https://twitter.com/teuteuf"
          target="_blank"
          rel="noopener noreferrer"
        >
          teuteuf (@teuteuf)
        </a>
        .
      </div>
      <div className="space-y-3 text-justify pb-3">
        <div>
          Fet per{" "}
          <a
            className="underline"
            href="https://twitter.com/joanfont"
            target="_blank"
            rel="noopener noreferrer"
          >
            @joanfont
          </a>{" "}
          - (
          <a
            className="underline"
            href="https://github.com/joanfont/poble/"
            target="_blank"
            rel="noopener noreferrer"
          >
            codi font
          </a>
          )
        </div>
      </div>
    </Panel>
  );
}
