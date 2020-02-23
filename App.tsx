import React, { useState } from "react";
import { MainNavigator } from "./src/navigation/AppNavigator";
import { getData } from "./src/services/storageDevice";
import { ActivityIndicator } from "react-native";
import { checkToken } from "./src/services/memberServices";

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

  return <MainNavigator isTokenOK={isAuthentified} />;
}
