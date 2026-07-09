import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { SplashLogo } from '@/components/SplashLogo';
import { SplashLoader } from '@/components/SplashLoader';
import { BrandColors } from '@/constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  const handleSplashComplete = () => {
    // Navigate to Onboarding screen when the loader finishes
    // replace replaces the stack history so user can't go back to splash
    router.replace('/onboarding');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Main Center Content */}
        <ThemedView style={styles.centerContent}>
          <SplashLogo />
        </ThemedView>

        {/* Bottom Loading Progress */}
        <SplashLoader onComplete={handleSplashComplete} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.primaryGreen,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // space between center content and bottom loader
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
