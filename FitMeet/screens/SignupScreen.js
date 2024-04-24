
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../FirebaseConfig'
import { useNavigation } from '@react-navigation/native';

const SignupScreen = ({ navigation }) => {
    // You can handle the state and functions here or any additional logic for signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signUp = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registered with:', userCredentials.user.email);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
            placeholder="Email"
            placeholderTextColor="grey"
            autoCapitalize='none'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            autoCapitalize='none'
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
        />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={signUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Create Account</Text>
            </TouchableOpacity>  
      </View>
    </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Use black for the background color
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%', // You can adjust the width as needed
    },
    input: {
        backgroundColor: '#2C2C2C', // Dark grey for the input background
        color: 'white', // Text color for the input
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15, // Add more space between inputs
        fontSize: 16, // Match font size with your button text
        borderWidth: 1, // Add a border to make the input stand out
        borderColor: '#16247d', // Use purple to match the theme
    },
    buttonContainer: {
        width: '60%', // Keep consistent with the width of the button in login screen
        marginTop: 20, // Add some margin at the top
    },
    button: {
        backgroundColor: '#16247d', // Purple for the primary button
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10, // Space between buttons if needed
    },
    buttonOutline: {
        backgroundColor: 'black', // Keep it black to match the container
        borderColor: '#16247d', // Purple border to stand out
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#16247d', // Purple text color for contrast on black
        fontWeight: '700',
        fontSize: 16,
    },
});


export default SignupScreen;