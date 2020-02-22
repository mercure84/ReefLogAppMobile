import React, { useState } from 'react';
import { MainNavigator } from "./src/navigation/AppNavigator"
import { getData } from './src/services/storageDevice';
import { ActivityIndicator } from "react-native"

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState();
  // récupération du token 


  const fetchToken = async () => {
    try {
      const value = await getData('id_token');
      console.log("Token trouvé = " + value);
      setLoading(false);
      setToken(value);
    }
    catch (error) {

      console.log("Erreur dans la recherche du token")
    }
  }

  fetchToken();
  if (isLoading) {

    return <ActivityIndicator />

  }

  return <MainNavigator isTokenOK={token ? true : false} />

}
