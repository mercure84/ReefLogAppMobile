import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";

export interface Alert {
  id?: string;
  typeTest : TypeTest;
  targetValue : number;
  dayInterval : 8
}

export enum TypeTest {
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

export const saveAlerts = async (aquariumId : string, alerts : Alert[], token : string) => {
    const urlService = urlServer + "api/saveAlerts"
    const alertsForm = {
        aquariumId : aquariumId,
        alerts : alerts
    };
    try {
        const response = await fetch (urlService, {
            method : "POST",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(alertsForm)})
            const dataResponse = response.json();
            console.log("Alerts envoyées")
            return dataResponse;
        } catch (error){
            console.log(error);
        }
}

export const getAlerts = async (aquariumId : string, token : string): Promise<Alert[]| any> => {
const urlService = urlServer + "api/getAlerts/" + aquariumId;
try {
    const response = await fetch (urlService, {
        method : "GET",
        headers : {
            Accept : "application/json",
            "Content-Type": "application/json",
            Authorization : token
        }
    });
    const dataResponse = response.json();
    console?.log("Alertes fétechées : " + dataResponse);
} catch(error){
    console.log(error)
}
}

