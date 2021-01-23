import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle";
import { Header } from "react-native-elements";
import RootStore from "../../../../store/RootStore";
import { ReefButton } from "../../../../components/ReefButton";

import { EventItem } from "./EventItem";
import { EventFormModal } from "./EventFormModal";

export const EventScreen = observer(() => {
  const { eventStore } = RootStore;
  const [isEventFormVisible, setEventFormVisible] = useState(false);

  useEffect(() => {
    if (
      eventStore.updateState === "done" &&
      eventStore.fetchState === "pending"
    ) {
      eventStore.fetchEvents();
    }
  }, [eventStore.fetchState]);

  const isEventLoading = eventStore.fetchState === "pending";
  const events = eventStore.eventsData;

  const HeaderComponent = () => {
    return (
      <View>
        <Header
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
        {isEventLoading && <ActivityIndicator />}

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
