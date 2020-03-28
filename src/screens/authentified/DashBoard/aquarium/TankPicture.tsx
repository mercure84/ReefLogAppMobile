import React, { useState } from "react";
import { TouchableOpacity, ImageStyle, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import cameraIcon from "../../../../assets/icons/camera.png";
import ImagePicker from "react-native-image-picker";

export const TankPicture = () => {
  const [photo, setPhoto] = useState(null);

  const choosePicture = () => {
    const options = {};

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  return (
    <TouchableOpacity onPress={() => choosePicture()}>
      {photo === null ? (
        <Image source={cameraIcon} style={styles.icon} />
      ) : (
        <Image source={photo} style={styles.photo} />
      )}
    </TouchableOpacity>
  );
};

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
