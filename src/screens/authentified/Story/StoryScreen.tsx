import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RootStore from "../../../store/RootStore";
import { observer } from "mobx-react";
import { ReefButton } from "../../../components/ReefButton";
import { ReefHeaderTitle } from "../../../components/ReefHeaderTitle";
import { WaterTestItem } from "./waterTest/WaterTestItem";
import { EventItem } from "./event/EventItem";

export const StoryScreen = observer(() => {
  const navigation = useNavigation();
  const { eventStore, waterTestStore, tankStore } = RootStore;

  useEffect(() => {
    if (
      waterTestStore.updateState === "done" &&
      waterTestStore.fetchState === "pending"
    ) {
      waterTestStore.fetchWaterTestList();
    }
  }, [waterTestStore.fetchState]);

  useEffect(() => {
    if (eventStore.fetchState === "pending") {
      eventStore.fetchEvents();
    }
  }, [eventStore.fetchState]);

  const isWaterTestLoading = waterTestStore.fetchState === "pending";
  const isEventLoading = eventStore.fetchState === "pending";
  const hasATank = tankStore.tankList.length > 0;

  return (
    <>
      <Header centerComponent={<ReefHeaderTitle title="MON JOURNAL" />} />
      <View style={styles.page}>
        {hasATank ? (
          <View>
            <View style={styles.buttonContainer}>
              <ReefButton
                size="medium"
                title="Tests d'eau"
                onPress={() => navigation.navigate("waterTests")}
              />
            </View>

            {isWaterTestLoading ? (
              <ActivityIndicator />
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
              <ActivityIndicator />
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
    alignItems: "center",
  },
});
