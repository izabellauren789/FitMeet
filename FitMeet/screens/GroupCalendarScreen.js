import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import React from 'react'
import events from '../assets/data/events.json'
import { AgendaEntry } from 'react-native-calendars';

const GroupCalendarScreen = () => {
    const renderItem = (item, isFirstItem) => {
      // You can check if 'isFirstItem' is true to add custom styling to the first item
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          {/* Render more item details here */}
        </View>
      );
    };
    
    return (
      <View style={styles.container}>
        <Agenda
          items={events}
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