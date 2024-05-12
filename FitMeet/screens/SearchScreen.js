import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../FirebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

const SearchScreen = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    const searchUsers = async () => {
        if (username.trim() === "") {
            Alert.alert("Validation", "Please enter a username to search.");
            return;
        }
        const q = query(collection(db, "users"), where("username", "==", username.trim()));
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data(), followed: false });
        });
        setUsers(results); // Updates the state with search results
        if (results.length === 0) {
            Alert.alert("Search Results", "No users found with that username.");
        }
    };

    const followUser = async (userIdToFollow, index) => {
        if (!auth.currentUser) {
            Alert.alert("Error", "You are not logged in!");
            return;
        }
        const currentUserId = auth.currentUser.uid;
        const currentUserDocRef = doc(db, "users", currentUserId);
        const userToFollowDocRef = doc(db, "users", userIdToFollow);

        try {
            await updateDoc(currentUserDocRef, {
                following: arrayUnion(userIdToFollow)
            });

            await updateDoc(userToFollowDocRef, {
                followers: arrayUnion(currentUserId)
            });

            let updatedUsers = [...users];
            updatedUsers[index].followed = true;
            setUsers(updatedUsers);

            Alert.alert("Success", "You have successfully followed this user!");
        } catch (error) {
            console.error("Error following user:", error);
            Alert.alert("Error", "Failed to follow user.");
        }
    };

    return (
        <LinearGradient 
        style={styles.container}
        colors={['#cbddfb', '#800080']}
        >
            <TextInput 
                style={styles.input}
                placeholder="Search by username"
                placeholderTextColor="grey"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Search" color="#16247d" onPress={searchUsers} />
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.username}>{item.username}</Text>
                        <TouchableOpacity onPress={() => followUser(item.id, index)} style={styles.followButton}>
                            <Text style={styles.followButtonText}>
                                {item.followed ? 'Following ✔️' : 'Follow'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </LinearGradient >
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
    input: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#16247d',
        width: '80%',
        marginBottom: 10,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
    },
    username: {
        color: 'white',
        fontSize: 16,
    },
    followButton: {
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
    },
    followButtonText: {
        color: 'white',
    },
});

export default SearchScreen;