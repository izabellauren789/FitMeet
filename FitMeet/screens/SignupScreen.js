
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../FirebaseConfig'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const SignupScreen = ({ navigation }) => {
    
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
        <LinearGradient
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                colors={['#cbddfb', '#800080']} // Black to Purple gradient
            >
                <View style={{
                    width: '80%',
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('../assets/fitmeet-logo.png')}
                        style={{ width: 200, 
                                 height: 200
                               }} 
                    />

                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: 'white' // Fixed color reference
                    }}>
                        FitMeet
                    </Text>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: 'white' // Fixed color reference
                    }}>
                        Resgister Now 
                    </Text>

                </View>
                <View style={styles.inputContainer}>
                <TextInput
                        placeholder="Username"
                        placeholderTextColor="grey"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(text) => setUsername(text)}
                        style={styles.input}
                        secureTextEntry
                    />
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
        </LinearGradient>
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
        color: 'white', 
        fontWeight: '700',
        fontSize: 16,
    },
});


export default SignupScreen;