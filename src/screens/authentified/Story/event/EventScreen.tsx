import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { View, FlatList, Text, ViewStyle, StyleSheet } from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { Header } from "react-native-elements";
import RootStore from "../../../../store/RootStore";
import { ReefButton } from "../../../../components/ReefButton";

import { EventItem } from "./EventItem";
import { EventFormModal } from "./EventFormModal";
import { ReefActivityIndicator } from "../../../../components/ReefActivityIndicator";
import { ThemeContext } from "../../../../../App";

export const EventScreen = observer(() => {
  const { eventStore } = RootStore;
  const [isEventFormVisible, setEventFormVisible] = useState(false);
  const { darkColor } = useContext(ThemeContext).theme;

  useEffect(() => {
    const getEvents = async () => {
      if (
        eventStore.updateState === "done" &&
        eventStore.fetchState === "pending"
      ) {
        await eventStore.fetchEvents();
      }
    };
    getEvents();
  }, [eventStore.fetchState]);

  const isEventLoading = eventStore.fetchState !== "done";
  const events = eventStore.eventsData;

  const HeaderComponent = () => {
    return (
      <View>
        <Header
          containerStyle={{ backgroundColor: darkColor }}
          leftComponent={<GoBackButton />}
          centerComponent={<ReefHeaderTitle title="MES EVENEMENTS" />}
        />

        <View style={{ alignSelf: "center" }}>
          <ReefButton
            size="medium"
            title="Nouvel évènement"
            onPress={() => setEventFormVisible(true)}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.page}>
        {isEventLoading && <ReefActivityIndicator />}

        <FlatList
          ListHeaderComponent={<HeaderComponent />}
          data={events}
          renderItem={({ item }) => <EventItem event={item} />}
          keyExtractor={({ id }) => id.toString()}
          ListEmptyComponent={<Text>Aucun enregistrement</Text>}
          scrollEnabled={true}
        />
      </View>

      {isEventFormVisible && (
        <EventFormModal
          showForm={setEventFormVisible}
          eventToSave={null}
          visible={isEventFormVisible}
        />
      )}
    </View>
  );
});

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    alignItems: "stretch",
  },
});
