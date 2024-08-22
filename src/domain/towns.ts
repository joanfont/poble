// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon

import _ from "lodash";

export interface Town {
  code: string;
  latitude: number;
  longitude: number;
  name: string;
}

export const towns: Town[] = [
  {
    code: "AR",
    latitude: 39.649444,
    longitude: 3.110833,
    name: "Ariany",
  },
  {
    code: "SJ",
    latitude: 39.59431,
    longitude: 3.04012,
    name: "Sant Joan",
  },
  {
    code: "BA",
    latitude: 39.6875,
    longitude: 2.5148,
    name: "Banyalbufar",
  },
  {
    code: "ES",
    latitude: 39.8265,
    longitude: 2.8471,
    name: "Escorca",
  },
  {
    code: "SM",
    latitude: 39.703333,
    longitude: 3.103611,
    name: "Santa Margalida",
  },
  {
    code: "LS",
    latitude: 39.71792,
    longitude: 2.86666,
    name: "Lloseta",
  },
  {
    code: "AC",
    latitude: 39.8525,
    longitude: 3.1192,
    name: "Alcúdia",
  },
  {
    code: "AN",
    latitude: 39.5746,
    longitude: 2.42055,
    name: "Andratx",
  },
  {
    code: "AL",
    latitude: 39.706667,
    longitude: 2.790833,
    name: "Alaró",
  },
  {
    code: "MU",
    latitude: 39.73445,
    longitude: 3.05544,
    name: "Muro",
  },
  {
    code: "CS",
    latitude: 39.6575,
    longitude: 2.95,
    name: "Costitx",
  },
  {
    code: "LB",
    latitude: 39.69913,
    longitude: 3.00493,
    name: "Llubí",
  },
  {
    code: "SL",
    latitude: 39.60899,
    longitude: 3.28525,
    name: "Sant Llorenç des Cardassar",
  },
  {
    code: "PO",
    latitude: 39.76929,
    longitude: 3.02253,
    name: "Sa Pobla",
  },
  {
    code: "DE",
    latitude: 39.75,
    longitude: 2.633056,
    name: "Deià",
  },
  {
    code: "VI",
    latitude: 39.5699,
    longitude: 3.08802,
    name: "Vilafranca de Bonany",
  },
  {
    code: "FO",
    latitude: 39.7827,
    longitude: 2.7409,
    name: "Fornalutx",
  },
  {
    code: "SO",
    latitude: 39.766667,
    longitude: 2.7,
    name: "Sóller",
  },
  {
    code: "SA",
    latitude: 39.354167,
    longitude: 3.128333,
    name: "Santanyí",
  },
  {
    code: "SE",
    latitude: 39.7545,
    longitude: 2.9007,
    name: "Selva",
  },
  {
    code: "SI",
    latitude: 39.6431,
    longitude: 3.0116,
    name: "Sineu",
  },
  {
    code: "CP",
    latitude: 39.43056,
    longitude: 3.01944,
    name: "Campos",
  },
  {
    code: "CD",
    latitude: 39.7,
    longitude: 3.43333,
    name: "Capdepera",
  },
  {
    code: "ET",
    latitude: 39.6535,
    longitude: 2.481,
    name: "Estellencs",
  },
  {
    code: "IN",
    latitude: 39.716667,
    longitude: 2.916667,
    name: "Inca",
  },
  {
    code: "PE",
    latitude: 39.61422,
    longitude: 3.11181,
    name: "Petra",
  },
  {
    code: "PA",
    latitude: 39.5667,
    longitude: 2.6497,
    name: "Palma",
  },
  {
    code: "SR",
    latitude: 39.65111,
    longitude: 2.77306,
    name: "Santa Maria del Camí",
  },
  {
    code: "CM",
    latitude: 39.76667,
    longitude: 2.96667,
    name: "Campanet",
  },
  {
    code: "AT",
    latitude: 39.695026,
    longitude: 3.351157,
    name: "Artà",
  },
  {
    code: "MR",
    latitude: 39.66455,
    longitude: 3.07467,
    name: "Maria de la Salut",
  },
  {
    code: "PL",
    latitude: 39.8772,
    longitude: 3.01643,
    name: "Pollença",
  },
  {
    code: "LC",
    latitude: 39.49003,
    longitude: 2.88983,
    name: "Llucmajor",
  },
  {
    code: "CO",
    latitude: 39.66908,
    longitude: 2.81216,
    name: "Consell",
  },
  {
    code: "PR",
    latitude: 39.51437,
    longitude: 3.02373,
    name: "Porreres",
  },
  {
    code: "MO",
    latitude: 39.56997,
    longitude: 2.98412,
    name: "Montuïri",
  },
  {
    code: "VA",
    latitude: 39.711678,
    longitude: 2.622581,
    name: "Valldemossa",
  },
  {
    code: "SS",
    latitude: 39.3386,
    longitude: 3.0536,
    name: "Ses Salines",
  },
  {
    code: "BN",
    latitude: 39.696667,
    longitude: 2.699722,
    name: "Bunyola",
  },
  {
    code: "BU",
    latitude: 39.7591,
    longitude: 2.9856,
    name: "Búger",
  },
  {
    code: "FE",
    latitude: 39.4692,
    longitude: 3.1481,
    name: "Felanitx",
  },
  {
    code: "LO",
    latitude: 39.6179,
    longitude: 2.9752,
    name: "Lloret de Vistalegre",
  },
  {
    code: "MA",
    latitude: 39.57,
    longitude: 3.208889,
    name: "Manacor",
  },
  {
    code: "SV",
    latitude: 39.620833,
    longitude: 3.36,
    name: "Son Servera",
  },
  {
    code: "BI",
    latitude: 39.6831,
    longitude: 2.8333,
    name: "Binissalem",
  },
  {
    code: "PU",
    latitude: 39.62262,
    longitude: 2.52746,
    name: "Puigpunyent",
  },
  {
    code: "MT",
    latitude: 39.64215,
    longitude: 2.75268,
    name: "Marratxí",
  },
  {
    code: "MN",
    latitude: 39.7501,
    longitude: 2.871,
    name: "Mancor de la Vall",
  },
  {
    code: "SN",
    latitude: 39.6431,
    longitude: 3.0116,
    name: "Sencelles",
  },
  {
    code: "SU",
    latitude: 39.62367,
    longitude: 2.83919,
    name: "Santa Eugènia",
  },
  {
    code: "AG",
    latitude: 39.5592,
    longitude: 2.8947,
    name: "Algaida",
  },
  {
    code: "CA",
    latitude: 39.56667,
    longitude: 2.51667,
    name: "Calvià",
  },
  {
    code: "EP",
    latitude: 39.66623,
    longitude: 2.5799,
    name: "Esporles",
  },
];

export function sanitizeTownName(townName: string): string {
  return townName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[- "()]/g, "")
    .toLowerCase();
}

export function pickManyWithTown(town: Town, howMany: number): Town[] {
  const allTownsExceptTown = _.filter(towns, (t: Town) => t.code != town.code);
  return _.shuffle([town, ..._.sampleSize(allTownsExceptTown, howMany - 1)]);
}
