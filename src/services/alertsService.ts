import { urlServer } from "../constants/constants";

export interface Alert {
  id?: string;
  typeTest: TypeTest;
  targetValue: number;
  dayInterval: number;
  active: boolean;
}

export enum TypeTest {
  TEMPERATURE = "Température",
  SALINITY = "Salinité",
  ALCALINITY = "KH",
  PH = "pH",
  CALCIUM = "Calcium",
  MAGNESIUM = "Magnésium",
  AMMONIAC = "Ammoniac",
  NITRATES = "Nitrates",
  NITRITES = "Nitrites",
  PHOSPHATES = "Phosphates",
  SILICATES = "Silicates",
}

export const saveAlerts = async (
  aquariumId: string,
  alerts: Alert[],
  token: string
) => {
  const urlService = urlServer + "api/addAlertsCollection";
  const alertsForm = {
    aquariumId: aquariumId,
    alerts: alerts,
  };
  try {
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(alertsForm),
    });
    const dataResponse = response.json();
    console.log("Alerts envoyées");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
