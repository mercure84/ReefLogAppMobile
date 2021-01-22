import { TextInputProps } from "react-native";
import { WaterTest } from "../../../../store/WaterTestStore";

export const waterTestFormInputs: WaterFormContent = {
  firstLine: [
    {
      label: "Température",
      maxLength: 5,
      placeHolder: "0-99°C",
      keyBoard: "decimal-pad",
      kind: "temperature",
    },
    {
      label: "Salinité",
      maxLength: 5,
      placeHolder: "0-99",
      keyBoard: "decimal-pad",
      kind: "salinity",
    },
    {
      label: "pH",
      maxLength: 4,
      placeHolder: "0-99",
      keyBoard: "decimal-pad",
      kind: "ph",
    },
  ],

  secondLine: [
    {
      label: "KH",
      maxLength: 4,
      placeHolder: "0-99",
      keyBoard: "decimal-pad",
      kind: "alcalinity",
    },
    {
      label: "Calcium (ppm)",
      maxLength: 4,
      placeHolder: "0-999",
      keyBoard: "decimal-pad",
      kind: "calcium",
    },
    {
      label: "Magnesium (ppm)",
      maxLength: 5,
      placeHolder: "0-9999",
      keyBoard: "decimal-pad",
      kind: "magnesium",
    },
  ],

  thirdLine: [
    {
      label: "NH4 (ppm)",
      maxLength: 4,
      placeHolder: "0-9",
      keyBoard: "decimal-pad",
      kind: "ammoniac",
    },
    {
      label: "NO3 (ppm)",
      maxLength: 4,
      placeHolder: "0-9",
      keyBoard: "decimal-pad",
      kind: "nitrates",
    },
    {
      label: "NO2 (ppm)",
      maxLength: 4,
      placeHolder: "0-9",
      keyBoard: "decimal-pad",
      kind: "magnesium",
    },
  ],
  fourthLine: [
    {
      label: "PO4 (ppm)",
      maxLength: 4,
      placeHolder: "0-9",
      keyBoard: "decimal-pad",
      kind: "phosphates",
    },
    {
      label: "Si (ppm)",
      maxLength: 4,
      placeHolder: "0-9",
      keyBoard: "decimal-pad",
      kind: "silicates",
    },
  ],
};

export type WaterFormContent = {
  firstLine: InputContent[];
  secondLine: InputContent[];
  thirdLine: InputContent[];
  fourthLine: InputContent[];
};

export type InputContent = {
  label: string;
  maxLength: number;
  placeHolder: string;
  keyBoard: TextInputProps["keyboardType"];
  kind: keyof WaterTest;
};
