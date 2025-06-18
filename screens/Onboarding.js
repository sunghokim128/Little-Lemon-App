import React, { useState } from 'react';
import { View, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Onboarding Screen - User Registration/Login
 * 
 * This is the first screen users see when they haven't logged in yet. It handles:
 * - User registration with first name and email
 * - Input validation for proper formatting
 * - Storing user credentials in AsyncStorage
 * - Automatic navigation to Home screen after successful login
 * 
 * Key Features:
 * - Real-time validation with visual feedback
 * - Keyboard dismissal on tap outside inputs
 * - Automatic login state management
 * - Consistent styling with app theme
 */

export default function Onboarding({ navigation }) {
    // Form state management
    const [firstName, setFirstName] = useState(''); // User's first name
    const [email, setEmail] = useState(''); // User's email address
    const [firstNameTouched, setFirstNameTouched] = useState(false); // Track if first name field was touched for validation

    // Validation functions - check if inputs meet requirements
    const isFirstNameValid = /^[A-Za-z]+$/.test(firstName); // Only letters allowed
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email); // Email format validation

    /**
     * Handle login/registration process
     * - Validates both inputs are correct
     * - Stores user data in AsyncStorage
     * - Sets login flag to trigger navigation to Home
     */
    const handleNext = async () => {
        if (isFirstNameValid && isEmailValid) {
            await AsyncStorage.setItem('firstName', firstName);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('isLoggedIn', 'true');
            
            // The App component will automatically re-render and show the Home screen
            // No need to navigate manually
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                {/* App header with logo and title */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../assets/lemon_logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text variant="headlineMedium" style={styles.headerText}>
                        Little Lemon
                    </Text>
                </View>
                
                {/* Welcome message */}
                <Text style={styles.subHeaderText}>Let us get to know you</Text>

                {/* First Name input with validation */}
                <TextInput
                    mode="outlined"
                    label="First Name"
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    onBlur={() => setFirstNameTouched(true)} // Trigger validation on blur
                    error={firstNameTouched && !isFirstNameValid} // Show error if touched and invalid
                />
                
                {/* Email input with validation */}
                <TextInput
                    mode="outlined"
                    label="Email"
                    keyboardType="email-address"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    error={email.length > 0 && !isEmailValid} // Show error if entered and invalid
                    autoCapitalize="none" // Prevent auto-capitalization for email
                />
                
                {/* Login button - disabled until both inputs are valid */}
                <Button
                    mode="contained"
                    onPress={handleNext}
                    style={styles.button}
                    labelStyle={{color: 'black'}}
                    buttonColor={isFirstNameValid && isEmailValid ? '#F4CE14' : '#A9A9A9'} // Yellow when valid, gray when invalid
                >
                    Login
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0e0e0',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#495E57',
        padding: 16,
        borderRadius: 8,
        marginBottom: 30,
        marginTop: 30,
    },
    subHeaderText: {
        marginBottom: 40,
        marginTop: 30,
        fontSize: 28,
        fontWeight: 'medium',
        alignSelf: 'center',
        color: '#495E57',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    headerText: {
        textAlign: 'left',
        flex: 1,
        color: '#F4CE14',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 20,
    },
});