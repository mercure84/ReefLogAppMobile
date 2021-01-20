import React from "react";
import { Tank } from "../../../../store/TankStore";
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>{tank.name}</Text>
        <TouchableOpacity onPress={editFunction}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.detailText}>
        Mise en eau : {Moment(tank.startDate).format("ll")}
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
  );
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
    margin: 16,
    borderRadius: 4,
    width: "96%",

    elevation: 2,
  },
  mainTitle: {
    fontSize: 20,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    marginLeft: 32,
  },
  icon: {
    height: 32,
    width: 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
