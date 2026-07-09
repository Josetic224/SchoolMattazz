import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay,
} from 'react-native-reanimated';

import { ThemedText } from './themed-text';
import { BrandColors, Spacing, Fonts } from '@/constants/theme';
import { BrandLogo } from './ui/BrandLogo';

export function SplashLogo() {
    const logoScale = useSharedValue(0.5);
    const logoOpacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(20);

    useEffect(() => {
        logoScale.value = withSpring(1, { damping: 12, stiffness: 100 });
        logoOpacity.value = withTiming(1, { duration: 600 });

        // Text animations delayed slightly
        textOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
        textTranslateY.value = withDelay(400, withSpring(0, { damping: 15 }));
    }, []);

    const logoAnimatedStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Icon Area */}
            <Animated.View style={[styles.iconContainer, logoAnimatedStyle]}>
                <ThemedText style={styles.iconText}>🎓</ThemedText>
            </Animated.View>

            {/* Brand Name */}
            <Animated.View style={[styles.brandContainer, textAnimatedStyle]}>
                <View style={styles.nameRow}>
                    <BrandLogo color="white" size={32} />
                </View>
                <ThemedText style={styles.taglineText}>
                    MASTER YOUR EXAMS, EARN REWARDS
                </ThemedText>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: 'rgba(250, 186, 26, 0.2)', // Light yellow tint
        borderWidth: 2,
        borderColor: BrandColors.primaryYellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.four,
        shadowColor: BrandColors.primaryYellow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    iconText: {
        fontSize: 40,
    },
    brandContainer: {
        alignItems: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.two,
    },
    schoolText: {
        fontSize: 32,
        fontFamily: Fonts?.sans, // Can use 'bold' if handled, for MVP we do weight
        fontWeight: '700',
        color: BrandColors.white,
        letterSpacing: 2,
    },
    mattazzText: {
        fontSize: 32,
        fontFamily: Fonts?.sans,
        fontWeight: '800',
        color: BrandColors.primaryYellow,
        letterSpacing: 2,
    },
    taglineText: {
        fontSize: 12,
        fontFamily: Fonts?.sans,
        color: BrandColors.primaryYellow,
        letterSpacing: 1.5,
        fontWeight: '600',
    },
});
