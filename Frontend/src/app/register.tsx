import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BrandColors } from '@/constants/theme';

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://10.139.32.171:8080/api/v1/auth/register', {
                fullName,
                email,
                password
            });

            const { token } = res.data;
            await AsyncStorage.setItem('userToken', token);
            console.log('Native Registration successful!');

            router.push('/goal-setup');
        } catch (err: any) {
            console.error('Registration failed:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred during registration. Please check your network.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.header}>
                            <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
                            <ThemedText type="default" style={styles.subtitle}>
                                Join SchoolMattazz and start studying smarter today.
                            </ThemedText>
                        </View>

                        <View style={styles.form}>
                            <Input
                                label="Full Name"
                                placeholder="e.g. John Doe"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                editable={!loading}
                            />

                            <Input
                                label="Email Address"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!loading}
                            />

                            <Input
                                label="Password"
                                placeholder="Create a secure password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!loading}
                            />

                            {error ? (
                                <ThemedText style={styles.mainError}>{error}</ThemedText>
                            ) : null}

                            <View style={styles.buttonContainer}>
                                <Button
                                    title={loading ? "Creating Account..." : "Create Account"}
                                    onPress={handleRegister}
                                    disabled={loading}
                                />
                                {loading && (
                                    <ActivityIndicator
                                        size="small"
                                        color={BrandColors.primaryGreen}
                                        style={styles.spinner}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.loginContainer}>
                            <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
                            <ThemedText
                                style={styles.loginLink}
                                // In the future this routers back to the login screen
                                onPress={() => router.back()}
                            >
                                Log In
                            </ThemedText>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: height * 0.1, // Push down slightly
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        marginBottom: 8,
    },
    subtitle: {
        color: '#6B7280',
        fontSize: 16,
    },
    form: {
        width: '100%',
    },
    mainError: {
        color: '#EF4444',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 16,
        position: 'relative',
        justifyContent: 'center',
    },
    spinner: {
        position: 'absolute',
        right: 24,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: 32, // Ensures there is space below the form
    },
    loginText: {
        color: '#6B7280',
        fontSize: 15,
    },
    loginLink: {
        color: BrandColors.primaryGreen,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
