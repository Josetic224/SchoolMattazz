import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';

export default function GoalSetupStepTwo() {
    const router = useRouter();

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ThemedText type="title">Step 2: Department Setup (Stub)</ThemedText>

                <Button
                    title="Go Back"
                    variant="outline"
                    onPress={() => router.back()}
                    style={{ marginTop: 24 }}
                />
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1, padding: 24, justifyContent: 'center' }
});
