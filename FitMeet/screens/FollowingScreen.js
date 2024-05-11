import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const FollowingScreen = ({ route }) => {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchUsernames = async () => {
            const followingData = await Promise.all(
                route.params.following.map(async userId => {
                    const docRef = doc(db, "users", userId);
                    const docSnap = await getDoc(docRef);
                    return docSnap.exists() ? docSnap.data().username : "Unknown User";
                })
            );
            setFollowing(followingData);
        };
        fetchUsernames();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={following}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        padding: 10,
    },
});

export default FollowingScreen;
