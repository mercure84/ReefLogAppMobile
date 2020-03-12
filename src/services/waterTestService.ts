import { urlServer } from "../constants/constants";
import { getData } from "./storageDevice";
import { Tank } from "./tankServices";

export interface WaterTest {
    id?: number;
    date?: Date
    temperature?: number;
    salinity?: number;
    alcalinity?: number;
    ph?: number;
    calcium?: number;
    magnesium?: number;
    ammoniac?: number;
    nitrates?: number;
    nitrites?: number;
    phosphates?: number;
    silicates?: number;
    aquarium?: Tank;
}


// ajout d'un nouveau test
export const saveWaterTest = async (
    aquariumId: string,
    newWaterTest: WaterTest,
    update: boolean
) => {
    const suffixUrl = update ? "api/updateWaterTest" : "api/addNewWaterTest"
    //purge du champ de l'aquarium si on est dans le cas d'un update
    newWaterTest.aquarium = null;
    const urlService = urlServer + suffixUrl;
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

// récupérer la liste des tests d'un aquarium

export const getWaterTestList = async (
    pTankId: string,
    token: string
): Promise<WaterTest[] | any> => {
    const urlService = urlServer + "api/getWaterTestList/" + pTankId;
    try {
        console.log("Service is fetching waterTestList for tank n° " + pTankId);

        const response = await fetch(urlService, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
            }
        });

        const dataResponse = response.json();
        console.log("tests fetchés = " + dataResponse)
        return dataResponse;

    } catch (error) {
        console.log(error)
    }

}
