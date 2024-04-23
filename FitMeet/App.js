import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginscreen from './screens/loginscreen'; // Ensure this path is correct
import homescreen from './screens/homescreen';  // Ensure this path is correct


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={loginscreen}
          options={{ headerShown: false }} // Correct property use to hide header
        />
        <Stack.Screen 
          name="Home" 
          component={homescreen}
          options={{ headerShown: true }} // Assuming you want to show the header here
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
