
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db, auth } from '../FirebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const CreateGroupCalendarScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);
  const [username, setUsername] = useState('');

  const handleAddMember = async () => {
    if (username) {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        const newMember = { username: user.username, email: user.email, id: user.id };
        if (!members.some(member => member.email === newMember.email)) {
          setMembers([...members, newMember]);
          setUsername('');
        } else {
          Alert.alert("Duplicate", "Member has already been added");
        }
      } else {
        Alert.alert("Not Found", "Username does not exist.");
      }
    }
  };

  const handleSubmit = async () => {
    if (groupName === '' || members.length === 0) {
      Alert.alert("Incomplete", "Please enter a group name and add at least one member.");
      return;
    }

    // Add the creator as a member of the group by default
    const memberEmails = members.map(member => member.email);
    if (!memberEmails.includes(auth.currentUser.email)) {
      memberEmails.push(auth.currentUser.email);
    }

    const groupData = {
      name: groupName,
      members: memberEmails,
      createdAt: new Date(),
      createdBy: auth.currentUser.email
    };

    try {
      const docRef = await addDoc(collection(db, 'Groups'), groupData);
      console.log('Group added with ID:', docRef.id);
      
      // Create invitations for each member except the creator
      members.forEach(async member => {
        if (member.email !== auth.currentUser.email) {
          const invitation = {
            groupId: docRef.id,
            recipient: member.email,
            status: 'pending',
            groupName: groupName,
            sentAt: new Date()
          };
          await addDoc(collection(db, 'Invitations'), invitation);
        }
      });

      Alert.alert("Success", "Group created and invitations sent.");
      navigation.goBack();
    } catch (error) {
      console.error('Error adding group:', error);
      Alert.alert("Error", "Failed to create group.");
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#cbddfb', '#800080']}>
      <Button title="Create New Group Calendar" onPress={handleSubmit} color="#16247d" />
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setGroupName}
        value={groupName}
        placeholder="Enter group name"
        placeholderTextColor="#aaa"
      />
      <Text style={styles.label}>Add Members:</Text>
      <View style={styles.memberInputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter username"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
        />
        <Button title="Add" onPress={handleAddMember} color="#16247d" />
      </View>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.memberItem}>{item.username} ({item.email})</Text>
        )}
        style={{ width: '90%' }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: 10,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: 'white',
    backgroundColor: '#2C2C2C',
  },
  memberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  memberItem: {
    fontSize: 16,
    padding: 10,
    color: 'white',
    textAlign: 'center',
  }
});

export default CreateGroupCalendarScreen;
