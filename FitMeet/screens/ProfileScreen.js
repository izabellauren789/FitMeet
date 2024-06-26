import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

// Profile screen component

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        followers: [],
        following: [],
    });
//  Fetch user data from Firestore
    const fetchUserData = async () => {
        if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log("No such document!");
                alert("No user data found.");
            }
        } else {
            console.log("No user is logged in.");
            alert("No user is logged in.");
        }
    };
// Logout function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace('Login');
        } catch (error) {
            console.error("Logout Error: ", error);
            alert("Failed to logout.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <LinearGradient 
        style={styles.container}
        colors={['#cbddfb', '#800080']}
        >
            <Text style={styles.header}>My Profile</Text>
            <Text style={styles.text}>Username: {userData.username}</Text>
            <Text style={styles.text}>First Name: {userData.firstName}</Text>
            <Text style={styles.text}>Last Name: {userData.lastName}</Text>
            <Text style={styles.text}>Email: {userData.email}</Text>
            <Text style={styles.text}>Bio: {userData.bio}</Text>
            <Button title="Followers" onPress={() => navigation.navigate('Followers')} />
            <Button title="Following" onPress={() => navigation.navigate('Following')} />
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',  
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2C2C2C',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    },
});

export default ProfileScreen;