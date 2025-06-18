import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaskInput, { Masks } from 'react-native-mask-input';
import * as ImagePicker from 'expo-image-picker';

/**
 * Profile Screen - User Profile Management
 * 
 * This screen allows users to view and edit their profile information:
 * - Display and change profile avatar
 * - Edit personal information (name, email, phone)
 * - Save changes to persistent storage
 * - Logout functionality
 * 
 * Key Features:
 * - Image picker integration for avatar selection
 * - Form validation and data persistence
 * - Phone number formatting with mask
 * - Keyboard-aware layout
 * - Consistent styling with app theme
 */

const placeholderAvatar = require('../assets/lemon_logo.png'); // Default avatar image

export default function Profile({ navigation }) {
    // Form state management
    const [avatar, setAvatar] = useState(null); // User's profile image URI
    const [firstName, setFirstName] = useState(''); // User's first name
    const [lastName, setLastName] = useState(''); // User's last name
    const [email, setEmail] = useState(''); // User's email address
    const [phone, setPhone] = useState(''); // User's phone number

    /**
     * Load existing profile data from AsyncStorage on component mount
     * Retrieves all saved user information and avatar
     */
    useEffect(() => {
        const loadProfileData = async () => {
            const storedFirstName = await AsyncStorage.getItem('firstName');
            const storedLastName = await AsyncStorage.getItem('lastName');
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPhone = await AsyncStorage.getItem('phone');
            const storedAvatar = await AsyncStorage.getItem('avatar');
            
            // Set state with stored values if they exist
            if (storedFirstName) setFirstName(storedFirstName);
            if (storedLastName) setLastName(storedLastName);
            if (storedEmail) setEmail(storedEmail);
            if (storedPhone) setPhone(storedPhone);
            if (storedAvatar) setAvatar(storedAvatar);
        };
        loadProfileData();
    }, []);

    /**
     * Handle avatar change through image picker
     * - Requests camera roll permissions
     * - Opens image picker with editing capabilities
     * - Saves selected image to AsyncStorage
     */
    const handleChangeAvatar = async () => {
        // Ask for permission to access photo library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        // Launch the image picker with editing options
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: true, // Allow user to crop/edit image
            aspect: [1, 1], // Square aspect ratio for avatar
            quality: 1, // High quality
        });

        // Handle selected image
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setAvatar(result.assets[0].uri);
            await AsyncStorage.setItem('avatar', result.assets[0].uri);
        }
    };

    /**
     * Remove current avatar and reset to default
     */
    const handleRemoveAvatar = () => {
        setAvatar(null);
    };

    /**
     * Handle user logout
     * - Clears all stored data from AsyncStorage
     * - Triggers automatic navigation back to Onboarding screen
     */
    const handleLogout = async () => {
        // Clear all AsyncStorage data
        await AsyncStorage.clear();
        
        // The App component will automatically re-render and show the Onboarding screen
        // No need to navigate manually
    };

    /**
     * Save profile changes to AsyncStorage
     * - Validates required fields (firstName and email)
     * - Saves all form data
     * - Shows success message and navigates to Home
     */
    const handleSave = async () => {
        if (!firstName.trim() || !email.trim()) {
            Alert.alert('Missing Information', 'Please fill in First Name and Email.');
            return;
        }
        
        // Save all form data to AsyncStorage
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('lastName', lastName);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('phone', phone);
        if (avatar) await AsyncStorage.setItem('avatar', avatar);
        
        // Show success message and navigate back to Home
        Alert.alert('Success', 'Information saved!', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('Home'),
            },
        ]);
    };

    /**
     * Discard all changes and reset form to original values
     * - Removes all profile data from AsyncStorage
     * - Resets all form fields to empty
     */
    const handleDiscard = async () => {
        await AsyncStorage.removeItem('firstName');
        await AsyncStorage.removeItem('lastName');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('phone');
        await AsyncStorage.removeItem('avatar');
        
        // Reset all form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setAvatar(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    {/* Avatar section with change/remove options */}
                    <View style={styles.avatarContainer}>
                        <Image
                            source={avatar ? { uri: avatar } : placeholderAvatar}
                            style={styles.avatar}
                        />
                        <View style={styles.avatarButtons}>
                            <Button mode="outlined" onPress={handleChangeAvatar} style={styles.avatarButton} buttonColor="#495E57" textColor="#F4CE14">Change</Button>
                            <Button mode="outlined" onPress={handleRemoveAvatar} style={styles.avatarButton} textColor="#495E57">Remove</Button>
                        </View>
                    </View>
                    
                    {/* Personal information form */}
                    <TextInput
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        mode="outlined"
                        keyboardType="email-address"
                    />
                    
                    {/* Phone number input with formatting mask */}
                    <View style={styles.input}>
                        <MaskInput
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            mask={Masks.USA_PHONE} // Apply US phone number formatting
                            style={{
                                borderWidth: 1,
                                borderColor: '#bdbdbd',
                                borderRadius: 4,
                                padding: 12,
                                backgroundColor: '#fff',
                                fontSize: 16,
                            }}
                        />
                    </View>
                    
                    {/* Spacer to push buttons to bottom */}
                    <View style={styles.spacer} />
                    
                    {/* Action buttons */}
                    <Button mode="contained" onPress={handleLogout} style={styles.logoutButton} buttonColor="#FF2400" textColor="white">
                        Logout
                    </Button>
                    <View style={styles.buttonRow}>
                        <Button mode="contained" onPress={handleSave} style={styles.saveButton} buttonColor="#495E57" textColor="#F4CE14">
                            Save
                        </Button>
                        <Button mode="outlined" onPress={handleDiscard} style={styles.discardButton} textColor="#495E57">
                            Discard
                        </Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#e0e0e0',
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#e0e0e0',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    avatarButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatarButton: {
        marginHorizontal: 8,
        borderColor: '#495E57',
    },
    input: {
        marginBottom: 16,
    },
    spacer: {
        flex: 1,
    },
    logoutButton: {
        marginTop: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    saveButton: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#495E57',
    },
    discardButton: {
        flex: 1,
        marginLeft: 8,
        borderColor: '#495E57',
    },
}); 