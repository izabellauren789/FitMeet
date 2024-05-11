import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {db, auth} from '../FirebaseConfig';
import {collection, query, where, getDocs, addDoc} from 'firebase/firestore';

const CreateGroupCalendarScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);
  const [username, setUsername] = useState('');

  const handleAddMember = async () => {
    if (username) {
      // Query the 'users' collection to read and check if the username exists
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty){
          if (!members.includes(username)){
            setMembers([...members, username]);
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
    // Handle the creation of the group calendar here
    // Prepare the data to be stored in Firestore
    if (groupName == '' || members.length == 0){
      Alert.alert("Please enter a group name and add at least one member.")
    }
    const groupData = {
      name: groupName,
      members, // Array of usernames
      createdAt: new Date(),
      createdBy: auth.currentUser.email // Assuming the user is logged in
    }
    try {
      // Add the group data to the 'Groups' collection in Firestore
      const docRef = await addDoc(collection(db, 'Groups'), groupData);
      console.log('Group added with ID:', docRef.id);
      
      // Optionally navigate to the group calendar view or back to the groups list
      navigation.goBack();
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#cbddfb', '#800080']} // Gradient from your theme
    >
    <Button title="Create New Group Calendar" onPress={handleSubmit} color="#16247d" />
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setGroupName}
        value={groupName}
        placeholder="Enter group name"
        placeholderTextColor="#aaa" // Light grey for placeholder
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
          <Text style={styles.memberItem}>{item}</Text>
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
    justifyContent: 'flex-start', // Align items at the start of the screen
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Assuming a light-on-dark theme
    alignSelf: 'flex-start', // Align text to the start
    marginLeft: '5%', // Align with the inputs
    marginTop: 10,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: 'white', // Text color
    backgroundColor: '#2C2C2C', // Dark background for the input
  },
  memberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between', // Space between the text input and the button
  },
  memberItem: {
    fontSize: 16,
    padding: 10,
    color: 'white', // Text color for members list
    width: '90%', // Full width for alignment
    textAlign: 'center', // Center text items
  }
});

export default CreateGroupCalendarScreen;
