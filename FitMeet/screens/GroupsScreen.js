import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const GroupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group Screen</Text>
    </View>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#2C2C2C', 
  },
});