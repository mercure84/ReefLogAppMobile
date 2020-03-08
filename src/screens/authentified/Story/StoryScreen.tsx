import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ViewStyle
} from "react-native";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const StoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <Header
        centerComponent={<Text style={{ fontSize: 16 }}>Mon journal</Text>}
        backgroundColor="green"
      />
      <TouchableOpacity>
        <Text>Liste à définir</Text>
      </TouchableOpacity>
      <Button
        title="Ajouter un test de mon eau"
        onPress={() => navigation.navigate("addTests")}
      />
    </View>
  );
};

type Style = {
  page: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  page: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

export default StoryScreen;