import React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { GoBackButton } from "../../../../components/GoBackButton"
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle"
import { ReefButton } from "../../../../components/ReefButton"
import { useNavigation } from "@react-navigation/native"
import { Header } from "react-native-elements"


export const WaterTestScreen = observer(() => {

    const navigation = useNavigation();

    return (<View>
        <Header
            leftComponent={<GoBackButton />}
            centerComponent={<ReefHeaderTitle title={"Mes Tests"} />}
            backgroundColor="white"
            backgroundImage={require("../../../../assets/story.png")}
            backgroundImageStyle={{ opacity: 0.8 }}
        />

        <ReefButton
            title="Ajouter un test"
            onPress={() => navigation.navigate("addTests")}
        />




    </View>)

})