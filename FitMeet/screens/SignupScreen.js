
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = ({ navigation }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signUp = async () => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registered with:', userCredentials.user.email);

            // Save the user data to Firestore
            const userRef = doc(db, "Users", userCredentials.user.uid);
            await setDoc(userRef, {
                email: userCredentials.user.email,
                friends: [],
                bio: ""
            });
        } catch (error) {}
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
        backgroundColor: 'black', 
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#16247d', 
        fontWeight: '700',
        fontSize: 16,
    },
});


export default SignupScreen;