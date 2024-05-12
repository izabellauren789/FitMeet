import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db, auth } from '../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';


const Homescreen = () => {
  const [activities, setItems] = useState({});

    useEffect(() => {
        const fetchActivities = async () => {
          const userEmail = auth.currentUser?.email;
          if (!userEmail){
            console.log("No user logged in");
            return
          }
          try {
            const activitiesQuery = query(collection(db, 'activities'), where('host', '==', userEmail));
            const querySnapshot = await getDocs(activitiesQuery);
            const loadedItems = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setItems(loadedItems);
          } catch (error) {
            console.error("Error fetching activities:", error);
          }
        };

        fetchActivities();
    }, []);

  return (
    <LinearGradient 
    style={styles.container}
    colors={['#cbddfb', '#800080']}
    >
      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.date}: {item.name} at {item.location}</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '90%'
  },
  text: {
    color: 'black',
    fontSize: 16
  }
});

export default Homescreen;
