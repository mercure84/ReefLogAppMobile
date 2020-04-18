import React, { useState } from "react"
import { observer } from "mobx-react"
import { View, ActivityIndicator, FlatList, Text, ViewStyle, StyleSheet } from "react-native"
import { GoBackButton } from "../../../../components/GoBackButton"
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle"
import { Header } from "react-native-elements"
import RootStore from "../../../../store/RootStore"
import { ReefButton } from "../../../../components/ReefButton"
import { EventItem } from "./EventItem"
import { EventForm } from "./EventForm"
import { EventType } from "src/store/EventStore"




export const EventScreen = observer(() => {

    if (RootStore.eventStore.eventState === "pending") {
        RootStore.eventStore.fetchEvents();
    }

    const isEventLoading = RootStore.eventStore.eventState === "pending";
    const events = RootStore.eventStore.eventsData

    const [isEventFormVisible, setEventFormVisible] = useState(false);
    const [eventInForm, setEventInForm] = useState<EventType>()

    const handleEventForm = (event: EventType) => {

        setEventInForm(event);
        setEventFormVisible(!isEventFormVisible);

    }

    return (


        <>
            <Header
                leftComponent={<GoBackButton />}
                centerComponent={<ReefHeaderTitle title={"Mes Evènements"} />}
                backgroundColor="white"
                backgroundImage={require("../../../../assets/story.png")}
                backgroundImageStyle={{ opacity: 0.8 }}
            />
            <ReefButton
                title="Nouvel Evènement"
                onPress={() => handleEventForm(null)}
            />

            {isEventFormVisible && <EventForm eventToUpdate={eventInForm} hideCallBack={() => setEventFormVisible(!isEventFormVisible)
            } />
            }
            <View style={styles.page}>
                {isEventLoading ? (
                    <ActivityIndicator />
                ) : (
                        <FlatList
                            style={{ marginBottom: 64 }}
                            data={events}
                            renderItem={({ item }) => <EventItem event={item} />}
                            keyExtractor={(item) => item.id.toString()}
                            ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
                            scrollEnabled={true}
                        />
                    )}
            </View>


        </>

    )

})

type Style = {
    page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    page: {
        alignItems: "stretch"
    },
});
