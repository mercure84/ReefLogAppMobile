import React from "react"
import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";

export interface WaterTest {
    id?: string;
    dateTime?: Date
    temperature: number;
    salinity?: number;
    alcalinity?: number;
    pH?: number;
    calcium?: number;
    magnesium?: number;
    ammoniac?: number;
    nitrates?: number;
    nitrites?: number;
    phosphates?: number;
    silicates?: number;
}


// ajout d'un nouveau test
export const addNewWaterTest = async (
    aquariumId: string,
    newWaterTest: WaterTest
) => {
    const urlService = urlServer + "api/addNewWaterTest";
    const newWaterTestForm = {
        aquariumId: aquariumId,
        waterTest: newWaterTest
    }
    try {
        const token = await getData("token");
        const response = await fetch(urlService, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(newWaterTestForm)
        });
        const dataResponse = response.json();
        console.log("Tests enregistrés");
        return dataResponse;
    } catch (error) {
        console.log(error);
    }
};