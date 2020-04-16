import React from "react"
import { observer } from "mobx-react"
import { View } from "react-native"
import { Header } from "react-native/Libraries/NewAppScreen"
import { GoBackButton } from "../../../../components/GoBackButton"
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle"

export const CountScreen = observer(() => {


    return (<View>
        <Header
            leftComponent={<GoBackButton />}
            centerComponent={<ReefHeaderTitle title={"Mon recensement"} />}
            backgroundColor="white"
            backgroundImage={require("../../../../assets/story.png")}
            backgroundImageStyle={{ opacity: 0.8 }}
        />

    </View>)


})