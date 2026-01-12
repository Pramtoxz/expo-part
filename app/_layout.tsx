import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'MaisonNeue-Bold': require('../assets/fonts/MaisonNeue-Bold.ttf'),
    'MaisonNeue-Book': require('../assets/fonts/MaisonNeue-Book.ttf'),
    'MaisonNeue-Light': require('../assets/fonts/MaisonNeue-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/otp" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
