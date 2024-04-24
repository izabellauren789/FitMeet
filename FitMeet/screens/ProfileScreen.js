import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C', // Dark grey background
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black', // White color for the text so it's visible
    // Define additional text styles here if necessary
  },
});
