import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView,
  Image, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, setDoc } from 'firebase/firestore';  // Import setDoc and doc
import { db } from '../FirebaseConfig'; 

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');

    const signUp = async () => {
        // Ensure all fields are filled
        if (!email || !password || !username || !firstName || !lastName || !bio) {
            alert('Please fill all fields.');
            return;
        }
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredentials.user.uid; // Get Firebase Auth UID

            // Use this UID to create the user document
            await setDoc(doc(db, "users", uid), {
                authUid: uid,  // Store Firebase Auth UID in Firestore for reference
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                followers: [],  // Initialize an empty array for followers
                following: []  // Also initialize an empty array for following
            });

            alert('User registered successfully!');
            navigation.navigate('Home'); // Adjust as necessary
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <LinearGradient
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    colors={['#cbddfb', '#800080']}
                >
                    <View style={{
                        width: '80%',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={require('../assets/fitmeet-logo.png')}
                            style={{ width: 100, height: 100 }} 
                        />
                        <Text style={styles.subHeaderText}>Register Now</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="grey"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="grey"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="grey"
                            value={lastName}
                            onChangeText={setLastName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="grey"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="grey"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            placeholder="Bio"
                            placeholderTextColor="grey"
                            value={bio}
                            onChangeText={setBio}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={signUp} style={[styles.button, styles.buttonOutline]}>
                            <Text style={styles.buttonOutlineText}>Create Account</Text>
                        </TouchableOpacity>  
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 12,
        color: 'white'
    },
    inputContainer: {
        width: '80%', 
    },
    input: {
        backgroundColor: '#2C2C2C', 
        color: 'white', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15, 
        fontSize: 16, 
        borderWidth: 1, 
        borderColor: '#16247d', 
    },
    buttonContainer: {
        width: '60%', 
        marginTop: 20, 
    },
    button: {
        backgroundColor: '#16247d', 
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10, 
    },
    buttonOutline: {
        backgroundColor: 'black', 
        borderColor: '#16247d', 
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: 'white', 
        fontWeight: '700',
        fontSize: 16,
    },
});

export default SignupScreen;