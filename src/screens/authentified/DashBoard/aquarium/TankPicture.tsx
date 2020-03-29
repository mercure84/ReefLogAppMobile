import React, { useState } from "react";
import {
  TouchableOpacity,
  ImageStyle,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Image } from "react-native-elements";
import cameraIcon from "../../../../assets/icons/camera.png";
import ImagePicker from "react-native-image-picker";
import { observer } from "mobx-react";
import RootStore from "../../../../store/RootStore";

export const TankPicture = observer(() => {
  const [rootStore] = useState(RootStore);

  const choosePicture = () => {
    const options = {};

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        rootStore.tankStore.storeUploadImageTank(response);
      }
    });
  };

  if (rootStore.tankStore.tankImageState === "pending") {
    rootStore.tankStore.storeGetImageTank();
  }
  const photo = rootStore.tankStore.tankPicture;
  console.log("photo = " + photo);

  return (
    <TouchableOpacity onPress={() => choosePicture()}>
      <Image source={cameraIcon} style={styles.icon} />

      {photo != null ? (
        <Image source={photo} style={styles.photo} />
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
});

type Style = {
  icon: ImageStyle;
  photo: ImageStyle;
};

const styles = StyleSheet.create<Style>({
  photo: {
    height: 200,
    width: 200
  },
  icon: {
    height: 32,
    width: 32
  }
});
