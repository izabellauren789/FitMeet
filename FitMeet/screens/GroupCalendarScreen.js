import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import React, {useState, useEffect} from 'react'
import events from '../assets/data/events.json'
import {db, auth} from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const GroupCalendarScreen = () => {
    const [items, setItems] = useState({});

    useEffect(() => {
        const fetchActivities = async () => {
          const userEmail = auth.currentUser?.email;
          if (!userEmail){
            console.log("No user logged in");
          }
          try{
            const activitiesQuery = query(collection(db, 'Group Activities'), where('host', '==', userEmail));
            const querySnapshot = await getDocs(activitiesQuery);
            const loadedItems = {};
            querySnapshot.forEach((doc) => {
                const { date, name, description } = doc.data();
                if (!loadedItems[date]) {
                    loadedItems[date] = [];
                }
                loadedItems[date].push({
                    name: name,
                    description: description
                });
            });
            setItems(loadedItems);
          } catch (error) {
            console.error("Error fetching activities:", error);
          }
        };

        fetchActivities();
    }, []);

    const renderItem = (item) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemDetail}>{item.description}</Text>
            </View>
        );
    };

    return (
      <View style={styles.container}>
        <Agenda
          items={items}
          renderItem={renderItem}
          theme={{
            // Agenda container and day backgrounds
            backgroundColor: '#000000', // black background
            calendarBackground: '#000000', // black calendar background
            agendaKnobColor: '#16247d', // purple knob color
            // Text colors
            monthTextColor: '#16247d', // purple month text
            dayTextColor: '#ffffff', // white day text
            textDisabledColor: 'grey', // grey text for disabled days
            dotColor: '#16247d', // purple dots for marked dates
            selectedDotColor: '#16247d', // purple selected dots
            agendaDayTextColor: 'black', // white text for agenda day
            agendaDayNumColor: 'black', // white text for agenda day number
            agendaTodayColor: '#16247d', // purple text for agenda today
            // Selected day styling
            selectedDayBackgroundColor: '#16247d', // purple background for selected day
            selectedDayTextColor: '#ffffff', // white text for selected day
            // Arrow colors
            arrowColor: '#16247d', // purple arrows
            todayTextColor: '#16247d'
            
            // Any other styling properties you want to change...
          }}
        />
      </View>
    );
  };
  
  export default GroupCalendarScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000', // black for the main background
    },
    itemContainer: {
      backgroundColor: '#2C2C2C', // grey for the agenda item background
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    itemText: {
      color: '#ffffff', // white for the agenda item text
    },
    // Add any additional styles you may need
  });