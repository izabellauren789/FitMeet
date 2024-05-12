import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import React, { useState, useEffect } from 'react'
import { db, auth } from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const GroupCalendarScreen = () => {
    const [items, setItems] = useState({});  // State to hold agenda items

    // Effect hook to fetch activities from Firestore when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
          const userEmail = auth.currentUser?.email;
          if (!userEmail) {
            console.log("No user logged in");
            return;
          }

          try {
            // Query to fetch activities where the current user is the host
            const activitiesQuery = query(collection(db, 'Group Activities'), where('host', '==', userEmail));
            const querySnapshot = await getDocs(activitiesQuery);
            const loadedItems = {};
            
            // Process each activity document
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

    // Render each item in the agenda
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
            backgroundColor: '#000000', 
            calendarBackground: '#000000', 
            agendaKnobColor: '#16247d', 
            monthTextColor: '#16247d', 
            dayTextColor: '#ffffff', 
            textDisabledColor: 'grey', 
            dotColor: '#16247d', 
            selectedDotColor: '#16247d', 
            agendaDayTextColor: 'black', 
            agendaDayNumColor: 'black', 
            agendaTodayColor: '#16247d', 
            selectedDayBackgroundColor: '#16247d', 
            selectedDayTextColor: '#ffffff', 
            arrowColor: '#16247d', 
            todayTextColor: '#16247d'
          }}
        />
      </View>
    );
};

export default GroupCalendarScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000', // Background color for the entire container
    },
    itemContainer: {
      backgroundColor: '#2C2C2C', // Background color for each agenda item
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    itemText: {
      color: '#ffffff', // Text color for item name
    },
    itemDetail: {
      color: '#ffffff', // Text color for item description
    }
});
