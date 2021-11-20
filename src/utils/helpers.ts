import qs from "qs";

import { Tank } from "../store/TankStore";
import { TypeTest } from "../store/AlertStore";
import { Linking } from "react-native";
import { myThemes } from "../components/colors";
import RootStore from "../store/RootStore";

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

export const getPopulation = (
  mainPopulation: Tank["mainPopulation"]
): string => {
  if (mainPopulation === "FISH_ONLY") {
    return "Fish only";
  }
  if (mainPopulation === "LPS") {
    return "Coraux Lps";
  }
  if (mainPopulation === "MIX") {
    return "mixte";
  }
  if (mainPopulation === "SOFT") {
    return "Coraux mous";
  }
  if (mainPopulation === "SPS") {
    return "Coraux Sps";
  }
  return "";
};

export const getLabelForTypeTest = (typeTest: TypeTest) => {
  switch (typeTest) {
    case TypeTest.ALCALINITY:
      return "KH";
    case TypeTest.AMMONIAC:
      return "Ammoniac";
    case TypeTest.CALCIUM:
      return "Calcium";
    case TypeTest.MAGNESIUM:
      return "Magnésium";
    case TypeTest.NITRATES:
      return "Nitrates";
    case TypeTest.NITRITES:
      return "Nitrites";
    case TypeTest.PH:
      return "pH";
    case TypeTest.PHOSPHATES:
      return "Phosphates";
    case TypeTest.SALINITY:
      return "Salinité";
    case TypeTest.SILICATES:
      return "Silicates";
    case TypeTest.TEMPERATURE:
      return "Température";
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

/// méthode pour l'envoi d'un mail
export const handleSuggestEmail = async () => {
  const to = "mercure8492@gmail.com";

  const query = qs.stringify({
    subject: "Une suggestion pour l'application Log4Reef",
  });
  const url = `mailto:${to}?${query}`;

  return Linking.openURL(url);
};

//méthode pour retourner le thème couleur du membre
export const getColorTheme = () => {
  return myThemes[RootStore.memberStore.member?.themeColor ?? 0].theme;
};

export const darkColor = getColorTheme().darkColor;
export const clearColor = getColorTheme().clearColor;
