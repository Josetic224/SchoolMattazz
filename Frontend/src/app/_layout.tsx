import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useFonts, HankenGrotesk_900Black } from '@expo-google-fonts/hanken-grotesk';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    HankenGrotesk_900Black,
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
    }
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
