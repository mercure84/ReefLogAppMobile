import React from "react"
import { observer } from "mobx-react"
import { View, ActivityIndicator, FlatList, Text, ViewStyle, StyleSheet } from "react-native"
import { GoBackButton } from "../../../../components/GoBackButton"
import { ReefHeaderTitle } from "../../../../components/ReefHeaderTitle"
import { ReefButton } from "../../../../components/ReefButton"
import { useNavigation } from "@react-navigation/native"
import { Header } from "react-native-elements"
import { WaterTestItem } from "./WaterTestItem"
import RootStore from "../../../../store/RootStore"


export const WaterTestScreen = observer(() => {

    const navigation = useNavigation();
    if (RootStore.waterTestStore.waterTestState === "pending") {
        RootStore.waterTestStore.fetchWaterTestList();
    }

    const isTestsLoading = RootStore.waterTestStore.waterTestState === "pending";
    const dataWaterTestList = RootStore.waterTestStore.waterTestListData

    return (<View>
        <Header
            leftComponent={<GoBackButton />}
            centerComponent={<ReefHeaderTitle title={"MES TESTS"} />}
            backgroundColor="white"
            backgroundImage={require("../../../../assets/story.png")}
            backgroundImageStyle={{ opacity: 0.8 }}
        />

        <ReefButton
            title="Nouveau Test"
            onPress={() => navigation.navigate("waterTests")}
        />
        <View style={styles.page}>
            {isTestsLoading ? (
                <ActivityIndicator />
            ) : (
                    <FlatList
                        style={{ marginBottom: 64 }}
                        data={dataWaterTestList}
                        renderItem={({ item }) => <WaterTestItem waterTest={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={<Text>Aucun enregistrement :(</Text>}
                        scrollEnabled={true}
                    />
                )}
        </View>

    </View>)

})


type Style = {
    page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    page: {
        alignItems: "stretch",
    },
});
