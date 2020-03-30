import { urlServer } from "./../constants/constants";
import { getData } from "./storageDevice";
import RootStore from "../store/RootStore";
import { ImageSourcePropType } from "react-native";

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

export const getAquariumImageSource = (id: string): ImageSourcePropType => {
  return {
    uri: `${urlServer}api/downloadAquariumPicture/${id}?${Math.random()}`,
    method: "GET",
    headers: {
      Pragma: "no-cache",
      Authorization: RootStore.memberStore.token
    },
    cache: "reload"
  };
};
