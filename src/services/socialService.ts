import { urlServer } from "./../constants/constants";

export const getAllAquariums = async (token: string) => {
  const urlService = urlServer + "api/getAllAquariums";
  try {
    console.log("On demande la liste des aquariums de la communauté");

    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const dataResponse = response.json();
    return dataResponse;
  } catch (error) {
    console.error(error);
  }
};
