import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    runOnJS,
} from 'react-native-reanimated';

import { ThemedText } from './themed-text';
import { BrandColors, Spacing, Fonts } from '@/constants/theme';
import { SymbolView } from 'expo-symbols';
import { Platform } from 'react-native';

export function SplashLoader({ onComplete }: { onComplete?: () => void }) {
    const progress = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Fade in the loader
        opacity.value = withDelay(800, withTiming(1, { duration: 500 }));

        const triggerComplete = () => {
            if (onComplete) setTimeout(onComplete, 500);
        };

        // Animate the progress bar to 100% over 2 seconds
        progress.value = withDelay(
            1000,
            withTiming(100, { duration: 2000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }, (finished) => {
                if (finished) {
                    runOnJS(triggerComplete)();
                }
            })
        );
    }, []);

    const progressBarAnimatedStyle = useAnimatedStyle(() => ({
        width: `${progress.value}%`,
    }));

    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.container, containerAnimatedStyle]}>
            <View style={styles.topRow}>
                <ThemedText style={styles.readyText}>READY FOR EXCELLENCE.</ThemedText>
            </View>

            <View style={styles.progressContainer}>
                <Animated.View style={[styles.progressFill, progressBarAnimatedStyle]} />
            </View>

            <View style={styles.bottomRow}>
                <ThemedText style={styles.engineText}>ACADEMIC ENGINE</ThemedText>
                <ThemedText style={styles.percentText}>100%</ThemedText>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: Spacing.four,
        marginBottom: Spacing.five,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.three,
    },
    readyText: {
        color: BrandColors.primaryYellow,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1.2,
        fontFamily: Fonts?.sans,
    },
    progressContainer: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // translucent track
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: Spacing.two,
    },
    progressFill: {
        height: '100%',
        backgroundColor: BrandColors.primaryYellow,
        borderRadius: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    engineText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
        letterSpacing: 1,
        fontWeight: '500',
    },
    percentText: {
        color: BrandColors.primaryYellow,
        fontSize: 12,
        fontWeight: '700',
    },
});
