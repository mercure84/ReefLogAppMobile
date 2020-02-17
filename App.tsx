import React, { useState } from 'react';
import { AppNavigator } from "./src/navigation/AppNavigator"
import { HomeNavigator } from "./src/navigation/AppNavigator"
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

  //TODO : faire une fonction qui demande la validité du token plutôt que juste en vérifier la présence
  if (token != null) { return <AppNavigator />; }

  else {

    return <HomeNavigator />
  }

}



