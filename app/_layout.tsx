import { useColorScheme } from "@/components/useColorScheme";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalStateProvider } from "../context/globalContext";
import Transition from "@/components/components/Transition";
export { ErrorBoundary } from "expo-router";
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({});

  const [styleLoaded, setStyleLoaded] = useState(false);
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useLayoutEffect(() => {
    setStyleLoaded(true);
  }, [styleLoaded]);

  if (!loaded || !styleLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    router.push("/tabs/(tabs)/");
  }, []);
  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GlobalStateProvider>
          <StatusBar/>
            <Slot />
        </GlobalStateProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
