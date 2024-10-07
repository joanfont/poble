// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon

import _ from "lodash";

export interface Town {
  code: string;
  latitude: number;
  longitude: number;
  name: string;
  neighbours: string[];
}

export const towns: Town[] = [
  {
    code: "AR",
    latitude: 39.649444,
    longitude: 3.110833,
    name: "Ariany",
    neighbours: ["MR", "SM", "PE", "SI"],
  },
  {
    code: "SJ",
    latitude: 39.59431,
    longitude: 3.04012,
    name: "Sant Joan",
    neighbours: ["LO", "SI", "PE", "VI", "PR", "MO"],
  },
  {
    code: "BA",
    latitude: 39.6875,
    longitude: 2.5148,
    name: "Banyalbufar",
    neighbours: ["ET", "VA", "EP", "PU"],
  },
  {
    code: "ES",
    latitude: 39.8265,
    longitude: 2.8471,
    name: "Escorca",
    neighbours: ["SO", "FO", "PL", "CM", "SE", "MN", "AL", "BN"],
  },
  {
    code: "SM",
    latitude: 39.703333,
    longitude: 3.103611,
    name: "Santa Margalida",
    neighbours: ["MU", "AT", "PE", "AR", "MR", "LB"],
  },
  {
    code: "LS",
    latitude: 39.71792,
    longitude: 2.86666,
    name: "Lloseta",
    neighbours: ["AL", "MN", "SE", "IN", "BI"],
  },
  {
    code: "AC",
    latitude: 39.8525,
    longitude: 3.1192,
    name: "Alcúdia",
    neighbours: ["PL", "MU", "PO"],
  },
  {
    code: "AN",
    latitude: 39.5746,
    longitude: 2.42055,
    name: "Andratx",
    neighbours: ["ET", "CA"],
  },
  {
    code: "AL",
    latitude: 39.706667,
    longitude: 2.790833,
    name: "Alaró",
    neighbours: ["BN", "ES", "MN", "LS", "BI", "CO", "SR"],
  },
  {
    code: "MU",
    latitude: 39.73445,
    longitude: 3.05544,
    name: "Muro",
    neighbours: ["PO", "AC", "SM", "MR", "LB"],
  },
  {
    code: "CS",
    latitude: 39.6575,
    longitude: 2.95,
    name: "Costitx",
    neighbours: ["SN", "IN", "SI", "LO"],
  },
  {
    code: "LB",
    latitude: 39.69913,
    longitude: 3.00493,
    name: "Llubí",
    neighbours: ["PO", "MU", "SM", "MR", "SI", "IN"],
  },
  {
    code: "SL",
    latitude: 39.60899,
    longitude: 3.28525,
    name: "Sant Llorenç des Cardassar",
    neighbours: ["MA", "PE", "AT", "SV"],
  },
  {
    code: "PO",
    latitude: 39.76929,
    longitude: 3.02253,
    name: "Sa Pobla",
    neighbours: ["CM", "PL", "AC", "MU", "LB", "BU", "IN"],
  },
  {
    code: "DE",
    latitude: 39.75,
    longitude: 2.633056,
    name: "Deià",
    neighbours: ["VA", "SO", "BN"],
  },
  {
    code: "VI",
    latitude: 39.5699,
    longitude: 3.08802,
    name: "Vilafranca de Bonany",
    neighbours: ["SJ", "PE", "MA", "FE", "PR"],
  },
  {
    code: "FO",
    latitude: 39.7827,
    longitude: 2.7409,
    name: "Fornalutx",
    neighbours: ["SO", "ES"],
  },
  {
    code: "SO",
    latitude: 39.766667,
    longitude: 2.7,
    name: "Sóller",
    neighbours: ["DE", "FO", "BN"],
  },
  {
    code: "SA",
    latitude: 39.354167,
    longitude: 3.128333,
    name: "Santanyí",
    neighbours: ["SS", "CP", "FE"],
  },
  {
    code: "SE",
    latitude: 39.7545,
    longitude: 2.9007,
    name: "Selva",
    neighbours: ["MN", "ES", "CM", "BU", "IN", "LS"],
  },
  {
    code: "SI",
    latitude: 39.6431,
    longitude: 3.0116,
    name: "Sineu",
    neighbours: ["CS", "IN", "LB", "MR", "AR", "PE", "SJ", "LO"],
  },
  {
    code: "CP",
    latitude: 39.43056,
    longitude: 3.01944,
    name: "Campos",
    neighbours: ["LC", "PR", "FE", "SA", "SS"],
  },
  {
    code: "CD",
    latitude: 39.7,
    longitude: 3.43333,
    name: "Capdepera",
    neighbours: ["AT", "SV"],
  },
  {
    code: "ET",
    latitude: 39.6535,
    longitude: 2.481,
    name: "Estellencs",
    neighbours: ["AN", "BA", "PU", "CA"],
  },
  {
    code: "IN",
    latitude: 39.716667,
    longitude: 2.916667,
    name: "Inca",
    neighbours: ["SE", "BU", "PO", "LB", "SI", "CS", "SN", "BI", "LS"],
  },
  {
    code: "PE",
    latitude: 39.61422,
    longitude: 3.11181,
    name: "Petra",
    neighbours: ["SI", "AR", "SM", "AT", "SL", "MA", "VI", "SJ"],
  },
  {
    code: "PA",
    latitude: 39.5667,
    longitude: 2.6497,
    name: "Palma",
    neighbours: ["CA", "PU", "EP", "VA", "BN", "MT", "SR", "SU", "AG", "LC"],
  },
  {
    code: "SR",
    latitude: 39.65111,
    longitude: 2.77306,
    name: "Santa Maria del Camí",
    neighbours: ["BN", "AL", "CO", "SU", "PA", "MT"],
  },
  {
    code: "CM",
    latitude: 39.76667,
    longitude: 2.96667,
    name: "Campanet",
    neighbours: ["ES", "PL", "PO", "BU", "SE"],
  },
  {
    code: "AT",
    latitude: 39.695026,
    longitude: 3.351157,
    name: "Artà",
    neighbours: ["SM", "CD", "SV", "SL", "PE"],
  },
  {
    code: "MR",
    latitude: 39.66455,
    longitude: 3.07467,
    name: "Maria de la Salut",
    neighbours: ["LB", "MU", "SM", "AR", "SI"],
  },
  {
    code: "PL",
    latitude: 39.8772,
    longitude: 3.01643,
    name: "Pollença",
    neighbours: ["ES", "AC", "PO", "CM"],
  },
  {
    code: "LC",
    latitude: 39.49003,
    longitude: 2.88983,
    name: "Llucmajor",
    neighbours: ["PA", "AG", "MO", "PR", "CP"],
  },
  {
    code: "CO",
    latitude: 39.66908,
    longitude: 2.81216,
    name: "Consell",
    neighbours: ["AL", "BI", "SN", "SU", "SR"],
  },
  {
    code: "PR",
    latitude: 39.51437,
    longitude: 3.02373,
    name: "Porreres",
    neighbours: ["MO", "SJ", "VI", "FE", "CP"],
  },
  {
    code: "MO",
    latitude: 39.56997,
    longitude: 2.98412,
    name: "Montuïri",
    neighbours: ["AG", "LO", "SJ", "PR", "LC"],
  },
  {
    code: "VA",
    latitude: 39.711678,
    longitude: 2.622581,
    name: "Valldemossa",
    neighbours: ["BA", "DE", "BN", "PA", "EP"],
  },
  {
    code: "SS",
    latitude: 39.3386,
    longitude: 3.0536,
    name: "Ses Salines",
    neighbours: ["CP", "SA"],
  },
  {
    code: "BN",
    latitude: 39.696667,
    longitude: 2.699722,
    name: "Bunyola",
    neighbours: ["VA", "DE", "SO", "ES", "AL", "SR", "MT", "PA"],
  },
  {
    code: "BU",
    latitude: 39.7591,
    longitude: 2.9856,
    name: "Búger",
    neighbours: ["SE", "CM", "PO", "IN"],
  },
  {
    code: "FE",
    latitude: 39.4692,
    longitude: 3.1481,
    name: "Felanitx",
    neighbours: ["PR", "VI", "MA", "SA", "CP"],
  },
  {
    code: "LO",
    latitude: 39.6179,
    longitude: 2.9752,
    name: "Lloret de Vistalegre",
    neighbours: ["SN", "CS", "SI", "SJ", "MO", "AG"],
  },
  {
    code: "MA",
    latitude: 39.57,
    longitude: 3.208889,
    name: "Manacor",
    neighbours: ["VI", "PE", "SL", "FE"],
  },
  {
    code: "SV",
    latitude: 39.620833,
    longitude: 3.36,
    name: "Son Servera",
    neighbours: ["AT", "CD", "SL"],
  },
  {
    code: "BI",
    latitude: 39.6831,
    longitude: 2.8333,
    name: "Binissalem",
    neighbours: ["AL", "LS", "IN", "SN", "CO"],
  },
  {
    code: "PU",
    latitude: 39.62262,
    longitude: 2.52746,
    name: "Puigpunyent",
    neighbours: ["ET", "BA", "EP", "PA", "CA"],
  },
  {
    code: "MT",
    latitude: 39.64215,
    longitude: 2.75268,
    name: "Marratxí",
    neighbours: ["PA", "BN", "SR"],
  },
  {
    code: "MN",
    latitude: 39.7501,
    longitude: 2.871,
    name: "Mancor de la Vall",
    neighbours: ["ES", "SE", "LS", "AL"],
  },
  {
    code: "SN",
    latitude: 39.64644,
    longitude: 2.89782,
    name: "Sencelles",
    neighbours: ["CO", "BI", "IN", "CS", "LO", "AG", "SU"],
  },
  {
    code: "SU",
    latitude: 39.62367,
    longitude: 2.83919,
    name: "Santa Eugènia",
    neighbours: ["SR", "CO", "SN", "AG", "PA"],
  },
  {
    code: "AG",
    latitude: 39.5592,
    longitude: 2.8947,
    name: "Algaida",
    neighbours: ["SU", "SN", "LO", "MO", "LC", "PA"],
  },
  {
    code: "CA",
    latitude: 39.56667,
    longitude: 2.51667,
    name: "Calvià",
    neighbours: ["AN", "ET", "PU", "PA"],
  },
  {
    code: "EP",
    latitude: 39.66623,
    longitude: 2.5799,
    name: "Esporles",
    neighbours: ["PU", "BA", "VA", "PA"],
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

export function getNeighbours(town: Town): Town[] {
  const foundTowns = [];

  for (const code of town.neighbours) {
    const foundTown = _.find(towns, (t: Town) => t.code === code);
    if (undefined != foundTown) {
      foundTowns.push(foundTown);
    }
  }

  return foundTowns;
}
