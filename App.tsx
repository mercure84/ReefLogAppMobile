import React, { useState } from "react";
import { Provider } from "mobx-react";
import { MainNavigator } from "./src/navigation/AppNavigator";
import { getData } from "./src/services/storageDevice";
import { checkToken } from "./src/services/memberServices";
import { ActivityIndicator } from "react-native";
import RootStore from "./src/store/RootStore";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isAuthentified, setAuthentified] = useState(false);
  // récupération du token

  const validateToken = async () => {
    try {
      const storedToken = await getData("token");
      const storedEmail = await getData("emailUser");
      console.log(
        "Token trouvé = " + storedToken + " et email = " + storedEmail
      );

      if (storedEmail != null && storedToken != null) {
        const data = await checkToken(storedEmail, storedToken);
        setAuthentified(data.credentialValide === true);
      }
      setLoading(false);
    } catch (error) {
      console.log("Erreur dans la recherche du token");
    }
  };

  validateToken();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Provider rootStore={RootStore}>
      <MainNavigator isTokenOK={isAuthentified} />
    </Provider>
  );
}
