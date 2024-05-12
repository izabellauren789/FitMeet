import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const GroupsScreen = () => {
  const navigation = useNavigation(); // Hook to access navigation object
  const [groupCalendars, setGroupCalendars] = useState([]); // State to store groups the user belongs to

  // Function to fetch groups from Firestore
  const fetchGroups = async () => {
    const userEmail = auth.currentUser?.email; // Get the currently logged in user's email
    if (!userEmail) {
      console.log("No user logged in");
      return;
    }

    // Query to find groups where the current user is a member
    const groupsQuery = query(collection(db, 'Groups'), where('members', 'array-contains', userEmail));

    try {
      const groupsSnapshot = await getDocs(groupsQuery);
      const groups = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through documents and store their data
      setGroupCalendars(groups); // Update state with the fetched groups
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  // UseEffect to set up an event listener that fetches groups when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGroups();  // This ensures groups are refreshed every time this screen is focused.
    });

    return unsubscribe;  // Clean up the event listener on component unmount
  }, [navigation]);

  return (
    <LinearGradient style={styles.linearGradient} colors={['#cbddfb', '#800080']}>
      <View style={styles.buttonContainer}>
        <Button
          title="Add New Group Calendar"
          onPress={() => navigation.navigate('CreateGroupCalendar')}
          color="#16247d"
        />
        <Button
          title="View Invitations"
          onPress={() => navigation.navigate('InvitationsScreen')}
          color="#16247d"
          style={{ marginTop: 10 }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {groupCalendars.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ScheduleGroupActivity', { groupId: item.id })}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#2C2C2C',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 18,
    color: 'white',
  }
});

export default GroupsScreen;
