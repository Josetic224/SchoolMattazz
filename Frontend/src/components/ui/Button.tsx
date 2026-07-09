import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '../themed-text';
import { BrandColors, Spacing, Fonts } from '@/constants/theme';
import { SymbolView } from 'expo-symbols';
import { Platform, Image } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'google';
    icon?: string; // name of expo symbol if any
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function Button({ title, variant = 'primary', icon, style, textStyle, ...props }: ButtonProps) {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';
    const isGoogle = variant === 'google';

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.button,
                isPrimary && styles.primaryButton,
                isOutline && styles.outlineButton,
                isGoogle && styles.googleButton,
                style,
            ]}
            {...props}
        >
            {isGoogle && (
                <Image
                    source={require('../../../assets/images/google-logo.png')}
                    style={styles.googleIcon}
                />
            )}
            <ThemedText
                style={[
                    styles.text,
                    isPrimary && styles.primaryText,
                    isOutline && styles.outlineText,
                    isGoogle && styles.googleText,
                    textStyle,
                ]}
            >
                {title}
            </ThemedText>

            {icon && (
                <ThemedText style={[styles.text, isPrimary && styles.primaryText, { marginLeft: 6 }]}>→</ThemedText>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56, // Universal standard touch target size for primary CTAs
        paddingHorizontal: Spacing.four,
        borderRadius: 16,
        width: '100%',
    },
    primaryButton: {
        backgroundColor: BrandColors.primaryGreen,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: BrandColors.primaryGreen,
    },
    googleButton: {
        backgroundColor: BrandColors.white,
        borderWidth: 1,
        borderColor: '#E0E1E6',
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts?.sans,
    },
    primaryText: {
        color: BrandColors.white,
    },
    outlineText: {
        color: BrandColors.primaryGreen,
    },
    googleText: {
        color: '#1F1F1F',
    },
});
