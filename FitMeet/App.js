import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Loginscreen from './screens/loginscreen'; // Ensure this path is correct
import Homescreen from './screens/homescreen';  // Ensure this path is correct
import SignupScreen from './screens/SignupScreen';
import CalendarScreen from './screens/CalendarScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    backgroundColor: 'black', // Changed from `background` to `backgroundColor`
    height: 90,
    borderTopWidth: 0, // Optional: remove border on top of the tab bar
  },
  tabBarInactiveTintColor: '#fff', // Tab icon and text color when not focused
  tabBarActiveTintColor: '#16247d', // Tab icon and text color when focused
}

function MainTabScreen() {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
         <Tab.Screen 
         name="Home" 
         component={Homescreen} 
         options={{
           tabBarIcon: ({focused})=>{
             return (
               <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="home" size={24} color={focused ? "#16247d": "#2C2C2C"} />
                 <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#2C2C2C" }}>Home</Text>
           </View>
             )
           }
         }}
         />
         <Tab.Screen 
         name="Calendar" 
         component={CalendarScreen} 
         options={{
           tabBarIcon: ({focused})=>{
             return (
               <View style={{alignItems: "center", justifyContent: "center"}}> 
                <AntDesign name="calendar" size={24} color={focused ? "#16247d": "#2C2C2C"} />
                <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#2C2C2C" }}>Calendar</Text>
           </View>
             )
           }
         }}
         />
         <Tab.Screen 
         name="Profile" 
         component={ProfileScreen} 
         options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <AntDesign name="user" size={24} color={focused ? "#16247d": "#2C2C2C"} />
                 <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#2C2C2C" }}>Profile</Text>
            </View>
              )
            }
          }}
         />
      </Tab.Navigator>
)
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Loginscreen}
          options={{ headerShown: false }} // Correct property use to hide header
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: 'Sign Up',
            headerStyle: {
            backgroundColor: 'black', // This sets the header background color
            },
            headerTitleStyle: {
            color: '#16247d', // This sets the title color to match the purple theme
            },
            headerTintColor: '#16247d', // This sets the back button color if you have one
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={MainTabScreen}
          options={{ headerShown: true }} // Assuming you want to show the header here
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
