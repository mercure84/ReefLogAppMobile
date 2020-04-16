import React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { GoBackButton } from "../../../../components/GoBackButton"
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle"
import { Header } from "react-native/Libraries/NewAppScreen"




export const EventScreen = observer(() => {


    return (


        <View>
            <Header
                leftComponent={<GoBackButton />}
                centerComponent={<ReefHeaderTitle title={"Mes Evènements"} />}
                backgroundColor="white"
                backgroundImage={require("../../../../assets/story.png")}
                backgroundImageStyle={{ opacity: 0.8 }}
            />

        </View>

    )


})