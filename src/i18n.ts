import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  ca: {
    translation: {
      placeholder: "Poble...",
      guess: "Endevinar",
      share: "Compartir",
      playBonusRound: "🎁 Ronda extra",
      showOnGoogleMaps: "👀 a Google Maps",
      welldone: "Ben fet!",
      incorrect: "No és correcte",
      bonusRoundNoMoreTries: "Ja no ho pots seguir intentant",
      guessShield: "Quin és l'escut de {{town}}?",
      guessLimits: "Amb quins municipis limita {{town}}?",
      unknownTown: "Poble desconegut!",
      copy: "Resultat copiat!",
      showTown: "🗺️ mostrar mapa!",
      cancelRotation: "🌀 Anular rotació",
      settings: {
        title: "Paràmetres",
        mode: "Mode",
        distanceUnit: "Unitat de distància",
        theme: "Tema",
        difficultyModifiers: "Modificador de dificultat",
        startingNextDay: "A partir de demà!",
        noImageMode: "Oculta la imatge del poble per un major desafiament",
        rotationMode: "Gira la imatge del poble aleatòriament",
      },
      stats: {
        title: "Estadístiques",
        played: "Jugades",
        win: "Guanyades %",
        currentStreak: "Sèrie actual",
        maxStreak: "Sèrie màxima",
        averageBestDistance: "Millor distància mesurada",
        guessDistribution: "Distribució d'encerts:",
      },
      install: {
        title: "Poble",
        descritpionTitle: "Instal·lar aplicació:",
        // prettier-ignore
        description: "Afegeix Poble a la teva pantalla d'inici per jugar-hi fàcilment!",
        instructionTitle: "Instruccions:",
        instructionActionOk: "D'acord",
        instructionActionCancel: "Cancelar",
        instructionActionInstall: "Instal·lar",
        instructionFirefoxAction1: "- obre les opcions del navegador ",
        instructionFirefoxAction2: "- afegir a la pantalla d'inici",
        instructionFirefoxNewAction1: "- obre les opcions del navegador ",
        instructionFirefoxNewAction2: '- sel·lecciona "Instal·lar" ',
        instructionIdeviceAction1: "- a Safari, clica el botó Compartir ",
        // prettier-ignore
        instructionIdeviceAction2: '- sel·lecciona "Afegir a la pantalla d\'inici"',
        instructionOperaAction1: "- clica el botó de menú ",
        instructionOperaAction2: "- afegeix a la pantalla principal",
        instructionNotSupported: "No està suportat per aquest navegador.",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "ca",
  });

export default i18n;
