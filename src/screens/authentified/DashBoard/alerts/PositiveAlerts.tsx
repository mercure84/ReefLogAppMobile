import React from "react";
import { Alert } from "../../../../services/alertsService";
import { View, Text } from "react-native";

type Props = {
    positiveAlerts: Alert[];
}

export const PositiveAlerts = ({ positiveAlerts }: Props) => {

    return (
        positiveAlerts != null && positiveAlerts.length > 0 ? (<View style={{ padding: 8 }}>
            <Text>Vous avez actuellement {positiveAlerts.length} alerte(s) sur vos tests.</Text>
            <Text>{`Il faut tester : ${positiveAlerts.map(alert => alert.typeTest).join(', ')}`}</Text>

        </View>) : null
    )
}


