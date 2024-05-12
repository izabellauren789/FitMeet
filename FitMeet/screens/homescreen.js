import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';


const Homescreen = () => {
  const [activities, setItems] = useState({});

    useEffect(() => {
        const fetchActivities = async () => {
            const querySnapshot = await getDocs(collection(db, 'activities'));
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
        };

        fetchActivities();
    }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.date}: {item.name} at {item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

export default Homescreen;
