import React, { Context, createContext, useEffect, useState } from "react";
import { Provider } from "mobx-react";
import { MainNavigator } from "./src/navigation/AppNavigator";
import { getData } from "./src/services/storageDevice";
import { checkToken } from "./src/services/memberService";
import RootStore from "./src/store/RootStore";
import { ReefActivityIndicator } from "./src/components/ReefActivityIndicator";
import { myThemes, Theme } from "./src/components/colors";

export const ThemeContext = createContext({
  theme: myThemes[0],
  setTheme: (p: Theme) => {},
});

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isAuthentified, setAuthentified] = useState(false);
  const [theme, setTheme] = useState<Theme>(myThemes[0]);
  const value = { theme, setTheme };

  // récupération du token
  useEffect(() => {
    const validateToken = async () => {
      try {
        const storedToken = await getData("token");
        const storedEmail = await getData("emailUser");
        if (storedEmail != null && storedToken != null) {
          const data = await checkToken(storedEmail, storedToken);
          setAuthentified(data.credentialValide === true);
        }
        setLoading(false);
        console.log("UserTk = ", storedToken, " Email = ", storedEmail);
      } catch (error) {
        console.log("Erreur dans la recherche du token");
      }
    };
    validateToken();
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <Provider RootStore={RootStore}>
        {isLoading && <ReefActivityIndicator />}
        <MainNavigator isTokenOK={isAuthentified} />
      </Provider>
    </ThemeContext.Provider>
  );
}
