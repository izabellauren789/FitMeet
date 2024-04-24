import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../FirebaseConfig'
import { useNavigation } from '@react-navigation/native'

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
                onPress={signIn}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity> 
            <TouchableOpacity
                onPress={signUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Create Account</Text>
            </TouchableOpacity>  
      </View>
    </KeyboardAvoidingView>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'black' 
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#16247d',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'black',
        marginTop: 5,
        borderColor: '#16247d',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#16247d',
        fontWeight: '700',
        fontSize: 16,
    },

})