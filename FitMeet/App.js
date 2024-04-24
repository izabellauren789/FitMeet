import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Loginscreen from './screens/loginscreen'; 
import Homescreen from './screens/homescreen'; 
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
    backgroundColor: '#121212', 
    height: 90,
    borderTopWidth: 0, 
  },
  tabBarInactiveTintColor: '#fff', 
  tabBarActiveTintColor: '#16247d', 
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
                 <Entypo name="home" size={24} color={focused ? "#16247d": "#383838"} />
                 <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#383838" }}>Home</Text>
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
                <AntDesign name="calendar" size={24} color={focused ? "#16247d": "#383838"} />
                <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#383838" }}>Calendar</Text>
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
                 <AntDesign name="user" size={24} color={focused ? "#16247d": "#383838"} />
                 <Text style={{ fontSize: 12, color: focused ? "#16247d" : "#383838" }}>Profile</Text>
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
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: 'Sign Up',
            headerStyle: {
            backgroundColor: 'black', 
            },
            headerTitleStyle: {
            color: '#16247d', 
            },
            headerTintColor: '#16247d', 
          }}
        />
        <Stack.Screen 
          name="Homepage" 
          component={MainTabScreen}
          options={({ route }) => ({ 
            headerShown: true,
            title: route.params?.email || "Homepage", 
            headerStyle: {
              backgroundColor: '#121212', 
            },
            headerTitleStyle: {
            color: '#16247d', 
          },
          headerTintColor: '#16247d', 
        })}
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
