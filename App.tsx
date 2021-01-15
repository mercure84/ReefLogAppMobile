import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "mobx-react";
import { MainNavigator } from "./src/navigation/AppNavigator";
import { getData } from "./src/services/storageDevice";
import { checkToken } from "./src/services/memberService";
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
      if (storedEmail != null && storedToken != null) {
        const data = await checkToken(storedEmail, storedToken);
        setAuthentified(data.credentialValide === true);
      }
      setLoading(false);
      console.log("UserTk = ", storedToken, " Email = ", storedEmail)

    } catch (error) {
      console.log("Erreur dans la recherche du token");
    }
  };


  if (isLoading) {
    validateToken();
    return <ActivityIndicator />;
  }

  return (
    <Provider RootStore={RootStore}>
      <MainNavigator isTokenOK={isAuthentified} />
    </Provider>
  );
}
