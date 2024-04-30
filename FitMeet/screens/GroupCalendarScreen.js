import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

const GroupCalendarScreen = ({ route }) => {
    const { groupId } = route.params;  // Assuming groupId is passed via navigation params
    const [items, setItems] = useState({});

    useEffect(() => {
        // Simulate fetching events specific to a group from a file or API
        import('../assets/data/events.json')
            .then((data) => {
                // Filter or process data based on groupId if necessary
                const groupEvents = data.filter(event => event.groupId === groupId);
                setItems(formatEventsForAgenda(groupEvents));
            })
            .catch(error => console.error("Failed to load events", error));
    }, [groupId]);

    const formatEventsForAgenda = (events) => {
        const formatted = {};
        events.forEach(event => {
            const date = event.date;  // Assuming each event has a 'date' property
            if (!formatted[date]) {
                formatted[date] = [];
            }
            formatted[date].push({ name: event.name, ...event });
        });
        return formatted;
    };

    const renderItem = (item) => {
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
        backgroundColor: '#000000',
    },
    itemContainer: {
        backgroundColor: '#2C2C2C',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#ffffff',
    },
    // Additional styles can be added here
});
