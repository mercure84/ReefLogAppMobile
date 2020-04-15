import { urlServer } from "./../constants/constants";
import RootStore from "../store/RootStore";
import { ImageSourcePropType } from "react-native";

export const getAquariumImageSource = (id: string): ImageSourcePropType => {
  return {
    uri: `${urlServer}api/downloadAquariumPicture/${id}?${Math.random()}`,
    method: "GET",
    headers: {
      Pragma: "no-cache",
      Authorization: RootStore.memberStore.token,
    },
    cache: "reload",
  };
};
