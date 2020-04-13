import { urlServer } from "../constants/constants";

export interface Alert {
  id?: string;
  typeTest: TypeTest;
  targetValue: number;
  dayInterval: number;
  active: boolean;
}

export enum TypeTestWithoutLabel {
  TEMPERATURE,
  SALINITY,
  ALCALINITY,
  PH,
  CALCIUM,
  MAGNESIUM,
  AMMONIAC,
  NITRATES,
  NITRITES,
  PHOSPHATES,
  SILICATES
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
  SILICATES = "Silicates"
}

export const saveAlerts = async (
  aquariumId: string,
  alerts: Alert[],
  token: string
) => {
  const urlService = urlServer + "api/addAlertsCollection";
  const alertsForm = {
    aquariumId: aquariumId,
    alerts: alerts
  };
  try {
    const response = await fetch(urlService, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(alertsForm)
    });
    const dataResponse = response.json();
    console.log("Alerts envoyées");
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getAlerts = async (
  aquariumId: string,
  token: string
): Promise<Alert[] | any> => {
  const urlService = urlServer + "api/getAlerts/" + aquariumId;
  try {
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const dataResponse = response.json();
    console.log("Alertes fétchées : " + dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

//service qui appeler les alertes actives : les tests à faire !
export const showAlerts = async (
  aquariumId: string,
  token: string
): Promise<Alert[] | any> => {
  const urlService = urlServer + "api/showAlerts/" + aquariumId;
  try {
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    const dataResponse = response.json();
    console.log("ShowAlert a été appelé : " + dataResponse);
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};
