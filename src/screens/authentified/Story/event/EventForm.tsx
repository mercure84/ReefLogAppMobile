import React, { useState } from "react";

import RootStore from "../../../../store/RootStore";
import {
    ActivityIndicator,
    View,
    ViewStyle,
    TextStyle,
    StyleSheet,
    Text,
} from "react-native";
import { MessageInfo } from "../../../../components/MessageInfo";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import Moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ReefButton } from "../../../../components/ReefButton";
import { EventType } from "../../../../store/EventStore";

type Props = {
    eventToUpdate: EventType;
    hideCallBack: () => void;
};

export const EventForm = ({ eventToUpdate, hideCallBack }: Props) => {
    const navigation = useNavigation();
    const [event, setEvent] = useState<EventType>(eventToUpdate);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [infoMessage, setInfoMessage] = useState(
        "Décrivez votre nouvel évènement... !"
    );
    const isUpdating = eventToUpdate !== null;

    const [isLoading, setLoading] = useState(false);

    const checkForm = () => {
        if (event.title !== "") {
            return true;
        } else {
            setInfoMessage("Oups il ya un problème dans votre formulaire");
            return false;
        }
    };

    const closeForm = () => hideCallBack();

    const submitEvent = async () => {
        setLoading(true);
        if (checkForm) {
            setInfoMessage("Le formulaire est valide ! Enregistrement en cours...");
            const response = RootStore.eventStore.saveEvent(
                event,
                isUpdating
            );
            if (response != null) {
                setInfoMessage("L'évènement a été enregistré !");
                setLoading(false);
                hideCallBack()

            } else {
                setInfoMessage("Un problème est survenu");
            }
            setLoading(false);
        }
        RootStore.eventStore.fetchEvents();
    };

    const setDate = date => {
        setDatePickerVisible(false);

        setEvent({
            ...event,
            date: date
        });
        setDatePickerVisible(false);
    };

    return (
        <>
            {isLoading && <ActivityIndicator />}
            <MessageInfo message={infoMessage} />
            <Card>
                <View style={styles.input}>
                    <Text>Date de l'évènement</Text>
                    <ReefButton
                        title={
                            event !== null ? Moment(event.date)
                                .format("ll")
                                .toString()
                                : Moment(new Date())
                                    .format("ll")
                                    .toString()
                        }
                        onPress={() => setDatePickerVisible(true)}
                    />

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        date={

                  /*           new Date(Moment(event.date).toString())
                            ??  */new Date()
                        }
                        locale="fr-FR"
                        mode="date"
                        display="calendar"
                        onConfirm={setDate}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                </View>

                <View style={styles.input}>
                    <Text>Notes</Text>
                    <TextInput
                        style={styles.textInput}
                        maxLength={250}
                        placeholder={"250 caractères maxi"}
                        onChangeText={text =>
                            setEvent({ ...event, description: text })
                        }
                        defaultValue={
                            event !== null ? event.description : ""
                        }
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <ReefButton title="Enregistrer" onPress={() => submitEvent()} />
                    <ReefButton
                        title="Annuler"
                        onPress={closeForm}
                    />
                </View>
            </Card>
        </>
    );
};

type Style = {
    input: ViewStyle;
    inputInlineContainer: ViewStyle;
    inputInline: ViewStyle;
    textInput: TextStyle;
    textInputSmall: TextStyle;
    buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4
    },
    inputInlineContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    inputInline: {
        alignItems: "center"
    },
    textInput: {
        backgroundColor: "lightgrey",
        textAlign: "center",
        height: 40,
        width: "65%",
        borderRadius: 5
    },

    textInputSmall: {
        backgroundColor: "lightgrey",
        textAlign: "center",
        height: 40,
        width: "100%",
        borderRadius: 10
    },
    buttonContainer: {
        padding: 16
    }
});
