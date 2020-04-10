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
