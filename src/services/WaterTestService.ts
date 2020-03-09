import React from "react"
import { urlServer } from "src/constants/constants";
import { getData } from "./storageDevice";

export interface TestCollection {
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


// ajout d'une collection de test
export const addNewTestCollection = async (
    newTestCollection: TestCollection
) => {
    const urlService = urlServer + "api/addNewTestCollection";
    try {
        const token = await getData("token");
        const response = await fetch(urlService, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(newTestCollection)
        });
        const dataResponse = response.json();
        console.log("Tests enregistrés");
        return dataResponse;
    } catch (error) {
        console.log(error);
    }
};