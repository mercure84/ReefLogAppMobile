import { ImageSourcePropType } from "react-native";
import { urlServer } from "./../constants/constants";
import { getData } from "./storageDevice";

export const saveAquariumPicture = async (photo: any, aquariumId: string) => {
  const suffixUrl = "api/uploadAquariumPicture/";
  const urlService = urlServer + suffixUrl + aquariumId;
  const data = new FormData();
  data.append("file", {
    uri: photo.uri,
    name: "photo.png",
    filename: "imageName.png",
    type: "image/png"
  });
  try {
    const token = await getData("token");
    await fetch(urlService, {
      method: "POST",
      headers: {
        Authorization: token
      },
      body: data
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAquariumPicture = async (
  aquariumId: string
): Promise<ImageSourcePropType | any> => {
  const suffixUrl = "api/downloadAquariumPicture/";
  const urlService = urlServer + suffixUrl + aquariumId;
  try {
    const token = await getData("token");
    const response = await fetch(urlService, {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
    console.log("service a retourné une réponse : " + response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
