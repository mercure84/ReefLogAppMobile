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
  ImageStyle
} from "react-native";

type Props = {
  tankList: Tank[];
  editFunction: () => void;
};

import createIcon from "../../../../assets/icons/createIcon.png";

export const MainTankItem = ({ tankList, editFunction }: Props) => {
  return tankList.length > 0 ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>{tankList[0].name}</Text>
        <TouchableOpacity onPress={editFunction}>
          <Image source={createIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.detailText}>
        Volume brut : {tankList[0].rawVolume} litres
      </Text>

      <Text style={styles.detailText}>
        Maintenance : {tankList[0].typeOfMaintenance}
      </Text>

      <Text style={styles.detailText}>
        Population : {tankList[0].mainPopulation}
      </Text>

      <Text style={styles.detailText}>
        Décantation : {tankList[0].sumpVolume} litres
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
};

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: "grey",
    padding: 8,
    margin: 16,
    borderRadius: 15,
    width: "96%"
  },
  mainTitle: {
    fontSize: 24,
    margin: 8,
    textAlign: "center"
  },
  detailText: {
    fontSize: 16,
    textAlign: "center"
  },
  icon: {
    height: 32,
    width: 32
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
