import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { BrandColors, Spacing, Fonts } from '@/constants/theme';

export default function OnboardingScreen() {
    const router = useRouter();

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '375283309196-82j010vdvmuibdb1u927qr896rr6rnv7.apps.googleusercontent.com',
        androidClientId: '375283309196-82j010vdvmuibdb1u927qr896rr6rnv7.apps.googleusercontent.com',
        iosClientId: '375283309196-82j010vdvmuibdb1u927qr896rr6rnv7.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            if (id_token) handleBackendGoogleAuth(id_token);
        }
    }, [response]);

    const handleBackendGoogleAuth = async (idToken: string) => {
        try {
            // Using 10.139.32.171 instead of localhost so it perfectly works in Expo Go on mobile
            const res = await axios.post('http://10.139.32.171:8080/api/v1/auth/google', {
                idToken: idToken
            });
            const { token } = res.data;
            await AsyncStorage.setItem('userToken', token);
            console.log('Login successful, JWT cached!');

            // In the future this will go to step 1 of Goal Setup
            router.push('/goal-setup');
        } catch (error) {
            console.error('Failed to authenticate with backend', error);
        }
    };

    const handleGetStarted = () => {
        // Fallback or explicit email route
        console.log('Navigate to Native Registration');
        router.push('/register');
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>

                {/* Header Branding */}
                <View style={styles.header}>
                    <BrandLogo color="green" size={24} />
                    <ThemedText style={styles.tagline}>ACHIEVE EXCELLENCE</ThemedText>
                </View>

                {/* Hero Image Illustration */}
                <View style={styles.illustrationContainer}>
                    <View style={styles.placeholderBg}>
                        <Image
                            source={require('../../assets/images/onboarding_hero.png')}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>

                {/* Text Content */}
                <View style={styles.textContainer}>
                    <ThemedText type="title" style={styles.title}>
                        Unlock Your Academic Potential
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Join Nigeria's premier community for high-achieving scholars. Track progress, compete with peers, and earn rewards.
                    </ThemedText>
                </View>

                {/* Footer Actions */}
                <View style={styles.footer}>
                    <Button
                        title="Get Started"
                        icon="arrow.right"
                        onPress={handleGetStarted}
                    />
                    <View style={{ height: 12 }} />
                    <Button
                        title="Continue with Google"
                        variant="google"
                        disabled={!request}
                        onPress={() => promptAsync()}
                    />

                    <View style={styles.loginContainer}>
                        <ThemedText style={styles.loginPrompt}>
                            Already have an account?{' '}
                        </ThemedText>
                        <ThemedText style={styles.loginLink} onPress={() => console.log('Navigate to Login')}>
                            Login
                        </ThemedText>
                    </View>
                </View>

            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // The design shows a white background for onboarding
        backgroundColor: BrandColors.white,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: Spacing.two,
        alignItems: 'flex-start',
    },
    brandText: {
        fontSize: 24,
        fontWeight: '800',
        color: BrandColors.primaryGreen,
        fontFamily: Fonts?.sans,
        letterSpacing: -0.5,
    },
    brandYellow: {
        color: BrandColors.primaryYellow,
        fontWeight: '800',
    },
    tagline: {
        fontSize: 10,
        fontWeight: '700',
        color: BrandColors.primaryGreen,
        letterSpacing: 1,
        marginTop: 2,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Spacing.four,
    },
    placeholderBg: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#F3F6F5', // Very light green/gray
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        borderRadius: 32,
    },
    textContainer: {
        marginBottom: Spacing.five,
    },
    title: {
        color: '#11181C',
        fontSize: 32,
        fontWeight: '800',
        marginBottom: Spacing.three,
        lineHeight: 38,
        fontFamily: Fonts?.sans,
    },
    subtitle: {
        color: '#687076',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
    },
    footer: {
        paddingBottom: Spacing.two,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.four,
    },
    loginPrompt: {
        color: '#687076',
        fontSize: 14,
        fontWeight: '500',
    },
    loginLink: {
        color: BrandColors.primaryGreen,
        fontSize: 14,
        fontWeight: '700',
    },
});
