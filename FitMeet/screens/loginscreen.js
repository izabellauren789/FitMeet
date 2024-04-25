import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Loginscreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Homepage', { email: user.email });
            }
        });
        return unsubscribe;
    }, [navigation]);

    const signUp = () => {
        navigation.navigate('Signup');
    };

    const signIn = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in with:', userCredentials.user.email);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <KeyboardAvoidingView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }} 
        behavior="padding">
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

                </View>
                <View style={{
                    width: '80%'
                }}>

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="grey"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{
                            backgroundColor: '#2C2C2C',
                            color: 'white',
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            borderRadius: 10,
                            marginTop: 5,
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="grey"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={{
                            backgroundColor: '#2C2C2C',
                            color: 'white',
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            borderRadius: 10,
                            marginTop: 5,
                        }}
                        secureTextEntry
                    />
                </View>
                <View style={{
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 40
                }}>
                    <TouchableOpacity onPress={signIn} style={{
                        backgroundColor: 'black',
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: 'white', // Correct color
                            fontWeight: '700',
                            fontSize: 16,
                        }}>Login</Text>
                    </TouchableOpacity> 
                    
                    <TouchableOpacity onPress={signUp} style={{
                        backgroundColor: 'black',
                        width: '100%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 10 // Added some spacing
                    }}>
                        <Text style={{
                            color: 'white', // Correct color
                            fontWeight: '700',
                            fontSize: 16,
                        }}>Create Account</Text>
                    </TouchableOpacity>  
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

export default Loginscreen;
