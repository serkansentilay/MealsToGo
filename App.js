import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Navigation } from "./src/infrastructure/navigation";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "mealstogo-8119c.firebaseapp.com",
  projectId: "mealstogo-8119c",
  storageBucket: "mealstogo-8119c.appspot.com",
  messagingSenderId: "984650100610",
  appId: "1:984650100610:web:9b747fd6040694a946299b",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latodLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latodLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
