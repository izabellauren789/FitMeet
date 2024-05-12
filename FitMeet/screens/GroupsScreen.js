import React, { useState, useEffect} from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {db, auth} from '../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const GroupsScreen = () => {
  const navigation = useNavigation();
  const [groupCalendars, setGroupCalendars] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      // Check if the user is logged in
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        console.log("No user logged in");
        return;
      }
      try {
        // QUery the groups where the user is a host whose email is the value for 'createdBy',
        // or a member of a group whose email is a value for 'members'
        const createdByQuery = query(collection(db, 'Groups'), where('createdBy', '==', userEmail));
        const memberOfQuery = query(collection(db, 'Groups'), where('members', 'array-contains', userEmail));

        // Execute both of the queries
        const [createdBySnapshot, memberOfSnapshot] = await Promise.all([
          getDocs(createdByQuery),
          getDocs(memberOfQuery)
        ]);

        // Merge results, avoiding duplicates
        const groupSet = new Set();
        const groups = [];

        createdBySnapshot.docs.forEach(doc => {
          groups.push({ id: doc.id, ...doc.data() });
          groupSet.add(doc.id);
        });

        memberOfSnapshot.docs.forEach(doc => {
          if (!groupSet.has(doc.id)) {
            groups.push({ id: doc.id, ...doc.data() });
            groupSet.add(doc.id);
          }
        });

        setGroupCalendars(groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['#cbddfb', '#800080']}
    >
      <View style={styles.addButtonContainer}>
        <Button
          title="Add New Group Calendar"
          onPress={() => navigation.navigate('CreateGroupCalendar')}
          color="#16247d"
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
    justifyContent: 'flex-start', // Align items to the start of the container
    paddingVertical: 20,
  },
  addButtonContainer: {
    width: '90%', // Match the width of the list items
    marginBottom: 20, // Spacing between the button and the list
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
    width: '90%', // Ensure items do not stretch too wide
    alignSelf: 'center', // Center items in the scroll view
  },
  itemText: {
    fontSize: 18,
    color: 'white',
  }
});

export default GroupsScreen;