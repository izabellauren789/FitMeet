import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView,
  Image, Button, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig'; // Make sure db is properly imported from your Firebase config

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const signUp = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registered with:', userCredentials.user.email);
<<<<<<< Updated upstream
            // Add user data to Firestore
            await addDoc(collection(db, "Users"), {
=======

            // Add user data to Firestore after successful authentication
            await addDoc(collection(db, "users"), {
>>>>>>> Stashed changes
                username: username,
                email: email, // use the email from authentication
                bio: bio,
                profilePic: profilePic
            });
            alert('User registered successfully!');
            navigation.navigate('Home'); // Adjust as necessary
        } catch (error) {
            alert(error.message);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfilePic(result.uri);
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
                            style={{ width: 200, height: 200 }} 
                        />

                        <Text style={styles.headerText}>FitMeet</Text>
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
                        <Button title="Pick an image" onPress={pickImage} />
                    </View>
                    {profilePic && <Image source={{ uri: profilePic }} style={{ width: 100, height: 100 }} />}
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
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 12,
        color: 'white'
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
