import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from "react-native";
import Moment from "moment";
import "moment/locale/fr";
import memberIcon from "../../../../assets/icons/social.png";
import { Tank } from "../../../../store/TankStore";

type Props = {
  tank: Tank;
  editFunction: () => void;
};

export const SocialTankItem = ({ tank, editFunction }: Props) => {
  return tank !== null ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>{tank.name}</Text>
        <Image source={memberIcon} style={styles.icon} />
        <Text style={styles.mainTitle}>{tank?.member?.userName}</Text>
      </View>
      <Text style={styles.detailText}>
        Mis en eau : {Moment(tank.startDate).format("ll")}
      </Text>
      <Text style={styles.detailText}>
        Volume brut : {tank.rawVolume} litres
      </Text>

      <Text style={styles.detailText}>
        Maintenance : {tank.typeOfMaintenance}
      </Text>

      <Text style={styles.detailText}>Population : {tank.mainPopulation}</Text>

      <Text style={styles.detailText}>
        Décantation : {tank.sumpVolume} litres
      </Text>
    </View>
  ) : null;
};

type Style = {
  container: ViewStyle;
  mainTitle: TextStyle;
  detailText: TextStyle;
  icon: ImageStyle;
  header: ViewStyle;
  date: TextStyle;
};

const styles = StyleSheet.create<Style>({
  date: {
    fontWeight: "bold",
  },
  container: {
    padding: 8,
    margin: 8,
    borderRadius: 4,
    borderWidth: 1,
    width: "90%",
  },
  mainTitle: {
    fontSize: 16,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    height: 24,
    width: 24,
  },

  header: {
    backgroundColor: "#C8FFAE",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
