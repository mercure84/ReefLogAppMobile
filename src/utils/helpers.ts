import { Animal } from "src/services/animalService";

import fishIcon from "../assets/icons/fish.png";
import coralIcon from "../assets/icons/coral.png";
import reefcleanerIcon from "../assets/icons/reefcleaner.png";

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
    case "crustacean":
    case "cucumber":
    case "star":
    case "mollusk":
      return reefcleanerIcon;
    case "lps":
    case "soft":
    case "sps":
    case "anemone":
      return coralIcon;
  }
};
