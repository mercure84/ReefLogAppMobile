import React from "react";
import { Tank } from "../../../../services/tankService";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native";
import Moment from "moment";
import "moment/locale/fr";
import createIcon from "../../../../assets/icons/createIcon.png";

type Props = {
  tank: Tank;
  editFunction: () => void;
};

export const MainTankItem = ({ tank, editFunction }: Props) => {
  return tank !== null ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>{tank.name}</Text>
        <TouchableOpacity onPress={editFunction}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
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
    backgroundColor: "grey",
    padding: 8,
    margin: 16,
    borderRadius: 15,
    width: "96%",
  },
  mainTitle: {
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    height: 32,
    width: 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
