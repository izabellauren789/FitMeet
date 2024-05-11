import React, { useState } from 'react';
import {
  ScrollView, KeyboardAvoidingView, TouchableOpacity, View, Text, Button, 
  TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../FirebaseConfig';

const ScheduleGroupActivity = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [sendNotification, setSendNotification] = useState(false);
    const [markedDates, setMarkedDates] = useState({});
    
    const handleSchedule = async () => {
        const newMarkedDates = {
          ...markedDates,
          [date]: { marked: true, dotColor: '#50cebb', activeOpacity: 0, description: activity }
        };
        setMarkedDates(newMarkedDates);
    
        // Construct the activity data
        const activityData = {
          name: activity,
          date: date,
          location: location,
          created: new Date(),
          host: auth.currentUser.email,
          notifyMembers: sendNotification
        }
    
        // Save the activity to Firestore
        try {
          const docRef = await addDoc(collection(db, 'Group Activities'), activityData);
          console.log('Activity added', docRef.id)
          setActivity('');
          setDate('');
          setLocation('');
        } catch(error) {
          console.error('Error adding activity:', error);
        }
    
        // Implement logic for sending notifications if required
        if (sendNotification) {
          // Logic to send notification
          console.log('Notification sent to group members!');
        }
    
        alert('Activity scheduled!');
        setActivity('');
        setDate('');
        setLocation('');
      };

      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <LinearGradient
              style={styles.linearGradient}
              colors={['#cbddfb', '#800080']}
            >
              <ScrollView contentContainerStyle={styles.scrollView}>
                <Image
                  source={require('../assets/fitmeet-logo.png')}
                  style={styles.logo}
                />
                <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={styles.navigationButton}
                        onPress={() => navigation.navigate('GroupCalendar')}
                        >
              <Text style={styles.navigationButtonText}>Go to Group Calendar</Text>
            </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter activity"
                    placeholderTextColor="grey"
                    autoCapitalize='none'
                    value={activity}
                    onChangeText={setActivity}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Select date (YYYY-MM-DD)"
                    placeholderTextColor="grey"
                    autoCapitalize='none'
                    value={date}
                    onChangeText={setDate}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Enter Location"
                    placeholderTextColor="grey"
                    autoCapitalize='none'
                    value={location}
                    onChangeText={setLocation}
                    style={styles.input}
                  />
                  <View style={styles.switchContainer}>
                    <Text styel={styles.switchLabel}>Notify group members:</Text>
                    <Switch
                    onValueChange={setSendNotification}
                    value={sendNotification}
                    />
                    </View>
                </View>
                <TouchableOpacity onPress={handleSchedule} style={styles.scheduleButton}>
                  <Text style={styles.scheduleButtonText}>Schedule Activity</Text>
                </TouchableOpacity>
                <Calendar
                  current={Date()}
                  onDayPress={(day) => setDate(day.dateString)}
                  monthFormat={'yyyy MM'}
                  hideExtraDays={true}
                  disableMonthChange={true}
                  firstDay={1}
                  markedDates={markedDates}
                  theme={calendarStyles}
                  style={styles.calendar}
                />
              </ScrollView>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
};

// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    linearGradient: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollView: {
      width: '100%',
      alignItems: 'center'
    },
    logo: {
      width: 50,
      height: 50,
      marginTop: 10
    },
    inputContainer: {
      alignSelf: 'stretch',
      paddingHorizontal: '10%',
    },
    input: {
      backgroundColor: '#2C2C2C',
      color: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: '100%',
      fontSize: 16,
    },
    picker: {
      width: '100%',
      color: 'white',
      backgroundColor: '#2C2C2C',
      marginTop: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    switchLabel: {
      color: 'white',
      marginRight: 10,
    },
    calendar: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'stretch'
    },
    scheduleButton: {
      backgroundColor: 'black',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    scheduleButtonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    navigationButton: {
        backgroundColor: 'black',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
      },
      navigationButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      }
  });
  
  const calendarStyles = {
    backgroundColor: '#2C2C2C',
    calendarBackground: '#2C2C2C',
    textSectionTitleColor: 'white',
    textSectionTitleDisabledColor: 'grey',
    selectedDayBackgroundColor: '#50cebb',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#50cebb',
    dayTextColor: 'white',
    textDisabledColor: 'grey',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: 'white',
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  };

  export default ScheduleGroupActivity;