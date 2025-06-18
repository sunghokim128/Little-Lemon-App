import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

/**
 * Splash Screen - App Loading Screen
 * 
 * This is the initial screen that displays while the app is:
 * - Checking login status from AsyncStorage
 * - Initializing the database
 * - Loading initial data
 * 
 * Purpose:
 * - Provides visual feedback that the app is loading
 * - Displays the app logo and branding
 * - Prevents users from seeing a blank screen during initialization
 * 
 * Navigation:
 * - Automatically transitions to either Onboarding or Home screen
 * - Controlled by the main App.js component based on login status
 */

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            {/* App logo displayed during loading */}
            <Image
                source={require('../assets/lemon_logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0', // Consistent with app theme
    },
    logo: {
        width: 120,
        height: 120,
    },
});