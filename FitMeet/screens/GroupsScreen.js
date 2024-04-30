import React, { useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const GroupsScreen = () => {
  const navigation = useNavigation();
  const [groupCalendars, setGroupCalendars] = useState([
    { id: '1', name: 'Workout Buddies' },
    { id: '2', name: 'Running Club' }
  ]);

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
            onPress={() => navigation.navigate('GroupCalendar', { groupId: item.id })}
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
