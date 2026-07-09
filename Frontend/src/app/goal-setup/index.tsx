import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/Button';
import { BrandColors } from '@/constants/theme';

const { width } = Dimensions.get('window');

const EXAM_TYPES = [
    { id: 'jamb', title: 'JAMB / UTME', description: 'University Tertiary Matriculation Exam' },
    { id: 'waec', title: 'WAEC / WASSCE', description: 'West African Senior School Certificate' },
    { id: 'neco', title: 'NECO', description: 'National Examinations Council' },
];

export default function GoalSetupStepOne() {
    const router = useRouter();
    const [selectedExam, setSelectedExam] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedExam) {
            // Ideally we save this to a global state or AsyncStorage here
            console.log('Selected Exam:', selectedExam);
            router.push('/goal-setup/department');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <ThemedText type="smallBold" style={styles.stepText}>Step 1 of 3</ThemedText>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: '33%' }]} />
                    </View>
                </View>

                <View style={styles.content}>
                    <ThemedText type="title" style={styles.title}>What are you studying for?</ThemedText>
                    <ThemedText type="default" style={styles.subtitle}>
                        Select your primary target examination so we can tailor your subjects and mock tests.
                    </ThemedText>

                    <View style={styles.optionsContainer}>
                        {EXAM_TYPES.map((exam) => {
                            const isSelected = selectedExam === exam.id;
                            return (
                                <TouchableOpacity
                                    key={exam.id}
                                    style={[
                                        styles.optionCard,
                                        isSelected && styles.optionCardSelected
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => setSelectedExam(exam.id)}
                                >
                                    <View style={styles.optionContent}>
                                        <ThemedText type="subtitle" style={[
                                            styles.optionTitle,
                                            isSelected && styles.optionTitleSelected
                                        ]}>
                                            {exam.title}
                                        </ThemedText>
                                        <ThemedText type="default" style={styles.optionDescription}>
                                            {exam.description}
                                        </ThemedText>
                                    </View>

                                    <View style={[
                                        styles.radioCircle,
                                        isSelected && styles.radioCircleSelected
                                    ]}>
                                        {isSelected && <View style={styles.radioInnerCircle} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        disabled={!selectedExam}
                    />
                </View>
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
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 16,
        marginBottom: 32,
    },
    stepText: {
        color: BrandColors.primaryGreen,
        marginBottom: 12,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: BrandColors.primaryGreen,
        borderRadius: 4,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        marginBottom: 12,
    },
    subtitle: {
        color: '#6B7280',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 32,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#F3F4F6',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    optionCardSelected: {
        borderColor: BrandColors.primaryGreen,
        backgroundColor: '#F0FDF4', // Very light green tint
    },
    optionContent: {
        flex: 1,
        paddingRight: 16,
    },
    optionTitle: {
        fontSize: 18,
        marginBottom: 4,
        color: '#111827',
    },
    optionTitleSelected: {
        color: BrandColors.primaryGreen,
    },
    optionDescription: {
        fontSize: 13,
        color: '#6B7280',
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        borderColor: BrandColors.primaryGreen,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: BrandColors.primaryGreen,
    },
    footer: {
        paddingVertical: 24,
    }
});
