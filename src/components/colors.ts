// colors for themes

import { ColorValue } from "react-native";

// Centropyge bicolor
export const blue = "#0000DF";
export const yellow = "#DFDF00";

//Neocirrithes armatus
export const red = "#DC143C";
export const black = "#120E0D";

//Amphiprion ocellaris
export const orange = "#FFC300";
export const white = "#F4F6F7";

//Nemateleotris Decora
export const grey = "#E7DFE8";
export const fuschia = "#A114B8";

//Kauderni Dark Mode

export type ColorTheme = {
  clearColor: ColorValue;
  darkColor: ColorValue;
};

export type Theme = {
  name: "cb" | "ocellaris" | "decora" | "armatus" | "kauderni";
  theme: ColorTheme;
  darkMode?: boolean;
};

export const myThemes: Theme[] = [
  { name: "cb", theme: { clearColor: yellow, darkColor: blue } },
  { name: "armatus", theme: { clearColor: red, darkColor: black } },
  { name: "ocellaris", theme: { clearColor: white, darkColor: orange } },
  { name: "decora", theme: { clearColor: grey, darkColor: fuschia } },
  {
    name: "kauderni",
    theme: { clearColor: "#000000", darkColor: "#FFFFFF" },
    darkMode: true,
  },
];
