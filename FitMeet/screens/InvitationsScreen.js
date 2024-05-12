import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../FirebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const ViewInvitationsScreen = () => {
  const navigation = useNavigation();
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        console.log("No user logged in");
        return;
      }

      const invitationsQuery = query(collection(db, 'Invitations'), where('recipient', '==', userEmail), where('status', '==', 'pending'));

      try {
        const snapshot = await getDocs(invitationsQuery);
        if (snapshot.empty) {
          console.log('No pending invitations found.');
          return;
        }

        const fetchedInvitations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInvitations(fetchedInvitations);
      } catch (error) {
        console.error("Error fetching invitations:", error);
        Alert.alert("Error", "Failed to fetch invitations.");
      }
    };

    fetchInvitations();
  }, []);

  const acceptInvitation = async (invitation) => {
    const invitationDocRef = doc(db, 'Invitations', invitation.id);
    try {
      // Update the invitation status to 'accepted'
      await updateDoc(invitationDocRef, {
        status: 'accepted'
      });
      
      // Remove the invitation from the list in the UI
      setInvitations(currentInvitations => currentInvitations.filter(invite => invite.id !== invitation.id));
      Alert.alert("Invitation Accepted", "You have successfully joined the group!");
      
      // Refresh the group list if needed or navigate back
      navigation.goBack(); 
    } catch (error) {
      console.error("Failed to accept invitation:", error);
      Alert.alert("Error", "Failed to accept invitation.");
    }
  };

  return (
    <LinearGradient style={styles.linearGradient} colors={['#cbddfb', '#800080']}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {invitations.length > 0 ? (
          invitations.map((invite) => (
            <View key={invite.id} style={styles.invitationContainer}>
              <Text style={styles.invitationText}>{invite.groupName} - Invitation</Text>
              <Button title="Accept" onPress={() => acceptInvitation(invite)} color="#00ff00" />
            </View>
          ))
        ) : (
          <Text style={styles.noInvitationsText}>No Invitations</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scrollView: {
    width: '100%',
  },
  invitationContainer: {
    backgroundColor: '#2C2C2C',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  invitationText: {
    fontSize: 18,
    color: 'white',
  },
  noInvitationsText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});

export default ViewInvitationsScreen;

