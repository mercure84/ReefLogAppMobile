import fishIcon from "../assets/icons/fish.png";
import coralIcon from "../assets/icons/coral.png";
import crustaceanIcon from "../assets/icons/crustacean.png";
import starIcon from "../assets/icons/star.png";
import urchinIcon from "../assets/icons/urchin.png";
import molluskIcon from "../assets/icons/mollusk.png";
import cucumberIcon from "../assets/icons/cucumber.png";
import anemoneIcon from "../assets/icons/anemone.png";

import { Animal } from "../store/AnimalStore";

export const formatStringToFloat = (text: string) => {
  return isNaN(parseFloat(text.replace(",", ".")))
    ? 0
    : parseFloat(text.replace(",", "."));
};

export const formatStringToInteger = (text: string) => {
  return isNaN(parseInt(text.replace(",", ".")))
    ? 0
    : parseInt(text.replace(",", "."));
};

export const getAnimalType = (animal: Animal) => {
  if (animal.crustaceanSpecies !== undefined) {
    return "crustacean";
  }
  if (animal.softSpecies !== undefined) {
    return "soft";
  }
  if (animal.lpsSpecies !== undefined) {
    return "lps";
  }
  if (animal.spsSpecies !== undefined) {
    return "sps";
  }
  if (animal.fishSpecies !== undefined) {
    return "fish";
  }
  if (animal.anemoneSpecies !== undefined) {
    return "anemone";
  }
  if (animal.molluskSpecies !== undefined) {
    return "mollusk";
  }
  if (animal.cucumberSpecies !== undefined) {
    return "cucumber";
  }
  if (animal.urchinSpecies !== undefined) {
    return "urchin";
  }
  if (animal.starSpecies !== undefined) {
    return "star";
  }
};

export const getIconForAnimal = (animal: Animal) => {
  switch (getAnimalType(animal)) {
    case "fish":
      return fishIcon;
    case "urchin":
      return urchinIcon;
    case "crustacean":
      return crustaceanIcon;
    case "cucumber":
      return cucumberIcon;
    case "star":
      return starIcon;
    case "mollusk":
      return molluskIcon;
    case "lps":
    case "soft":
    case "sps":
      return coralIcon;
    case "anemone":
      return anemoneIcon;
  }
};

//fonction de l'équation d'état de l'eau de mer

export const getMasseVolumique = (S: number, T: number, P: number) => {
  const T2 = Math.pow(T, 2);
  const T3 = Math.pow(T, 3);
  const T4 = Math.pow(T, 4);
  const T5 = Math.pow(T, 5);
  const S1 = Math.pow(S, 1.5);
  const S2 = Math.pow(S, 2);
  const P2 = Math.pow(P, 2);

  const rho =
    999.842594 +
    6.793952e-2 * T -
    9.09529e-3 * T2 +
    1.001685e-4 * T3 -
    1.120083e-6 * T4 +
    6.536332e-9 * T5 +
    8.24493e-1 * S -
    4.0899e-3 * T * S +
    7.6438e-5 * T2 * S -
    8.2467e-7 * T3 * S +
    5.3875e-9 * T4 * S -
    5.72466e-3 * S1 +
    1.0227e-4 * T * S1 -
    1.6546e-6 * T2 * S1 +
    4.8314e-4 * S2;

  const K =
    19652.21 +
    148.4206 * T -
    2.327105 * T2 +
    1.360447e-2 * T3 -
    5.155288e-5 * T4 +
    3.239908 * P +
    1.43713e-3 * T * P +
    1.16092e-4 * T2 * P -
    5.77905e-7 * T3 * P +
    8.50935e-5 * P2 -
    6.12293e-6 * T * P2 +
    5.2787e-8 * T2 * P2 +
    54.6746 * S -
    0.603459 * T * S +
    1.09987e-2 * T2 * S -
    6.167e-5 * T3 * S +
    7.944e-2 * S1 +
    1.6483e-2 * T * S1 -
    5.3009e-4 * T2 * S1 +
    2.2838e-3 * P * S -
    1.0981e-5 * T * P * S -
    1.6078e-6 * T2 * P * S +
    1.91075e-4 * P * S1 -
    9.9348e-7 * P2 * S +
    2.0816e-8 * T * P2 * S +
    9.1697e-10 * T2 * P2 * S;

  return Math.round((rho / (1 - P / K)) * 100) / 100;
};
