import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../store/RootStore";
import { observer } from "mobx-react";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { WaterTestItem } from "./waterTest/WaterTestItem";
import { EventItem } from "./event/EventItem";
import { ReefActivityIndicator } from "../../../components/ReefActivityIndicator";
import { ThemeContext } from "../../../../App";

export const StoryScreen = observer(() => {
  const navigation = useNavigation();
  const { eventStore, waterTestStore, tankStore } = RootStore;
  const { darkColor } = useContext(ThemeContext).theme.theme;

  useEffect(() => {
    console.log("Fetching water Test !");
    const getWaterTests = async () => {
      if (
        waterTestStore.updateState === "done" &&
        waterTestStore.fetchState === "pending"
      ) {
        await waterTestStore.fetchWaterTests();
      }
    };
    getWaterTests();
  }, [waterTestStore.fetchState]);

  useEffect(() => {
    const getEvents = async () => {
      if (eventStore.fetchState === "pending") {
        await eventStore.fetchEvents();
      }
    };
    getEvents();
  }, [eventStore.fetchState]);

  const isWaterTestLoading = waterTestStore.fetchState === "pending";
  const isEventLoading = eventStore.fetchState === "pending";
  const hasATank = tankStore.tankList.length > 0;

  return (
    <>
      <Header
        containerStyle={{ backgroundColor: darkColor }}
        centerComponent={<ReefHeaderTitle title="MON JOURNAL" />}
      />
      <View style={styles.page}>
        {hasATank ? (
          <View>
            <View style={styles.buttonContainer}>
              <ReefButton
                size="medium"
                title="Tests"
                onPress={() => navigation.navigate("waterTests")}
              />
              <ReefButton
                size="medium"
                title="Données"
                onPress={() => navigation.navigate("graph")}
              />
            </View>

            {isWaterTestLoading ? (
              <ReefActivityIndicator />
            ) : (
              RootStore.waterTestStore.waterTestList.length > 0 && (
                <View style={styles.lastItem}>
                  <Text>Mon dernier test enregistré :</Text>

                  <WaterTestItem waterTest={waterTestStore.waterTestList[0]} />
                </View>
              )
            )}
            <View style={styles.buttonContainer}>
              <ReefButton
                size="medium"
                title="Evènements"
                onPress={() => navigation.navigate("events")}
              />
            </View>
            {isEventLoading ? (
              <ReefActivityIndicator />
            ) : (
              RootStore.eventStore.events.length > 0 && (
                <View style={styles.lastItem}>
                  <Text>Mon dernier évènement enregistré :</Text>

                  <EventItem event={eventStore.events[0]} />
                </View>
              )
            )}
          </View>
        ) : (
          <Text>Créer d'abord un Aquarium avant de consulter cette page !</Text>
        )}
      </View>
    </>
  );
});

type Style = {
  page: ViewStyle;
  lastItem: ViewStyle;
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignContent: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  lastItem: {
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginTop: 32,
    alignSelf: "center",
    flexDirection: "row",
  },
});
