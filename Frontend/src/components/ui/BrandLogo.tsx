import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { BrandColors } from '@/constants/theme';

interface BrandLogoProps {
    color?: 'green' | 'white'; // To support Splash Screen vs Onboarding Screen variants
    size?: number; // Base font size
}

export function BrandLogo({ color = 'green', size = 28 }: BrandLogoProps) {
    const isWhite = color === 'white';

    return (
        <View style={styles.container}>
            <ThemedText
                style={[
                    styles.textBase,
                    {
                        fontSize: size,
                        lineHeight: size,
                        color: isWhite ? BrandColors.white : BrandColors.primaryGreen
                    }
                ]}
            >
                School
                <ThemedText
                    style={[
                        styles.textBase,
                        {
                            fontSize: size,
                            lineHeight: size,
                            color: BrandColors.primaryYellow
                        }
                    ]}
                >
                    Mattazz
                </ThemedText>
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textBase: {
        fontFamily: 'HankenGrotesk_900Black',
        fontWeight: 'normal',
        letterSpacing: -1.4,
    },
});
