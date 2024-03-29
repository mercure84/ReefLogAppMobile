import React from "react";
import { TouchableOpacity, ImageStyle, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import cameraIcon from "../../../../assets/icons/camera.png";
import ImagePicker from "react-native-image-picker";
import { observer } from "mobx-react";
import RootStore from "../../../../store/RootStore";
import { getAquariumImageSource } from "../../../../services/imageTransfertService";
import { Dimensions } from "react-native";

export const TankPicture = observer(() => {
  const choosePicture = () => {
    const options = {};

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        RootStore.tankStore.storeUploadImageTank(response);
      }
    });
  };

  return (
    <>
      <TouchableOpacity onPress={() => choosePicture()}>
        <Image source={cameraIcon} style={styles.icon} />
      </TouchableOpacity>

      <Image
        source={getAquariumImageSource(RootStore.tankStore.tankList[0].id)}
        style={styles.photo}
      />
    </>
  );
});

type Style = {
  icon: ImageStyle;
  photo: ImageStyle;
};

const styles = StyleSheet.create<Style>({
  photo: {
    height: Dimensions.get("window").width * 0.5,
    width: Dimensions.get("window").width * 0.95
  },
  icon: {
    height: 32,
    width: 32
  }
});
