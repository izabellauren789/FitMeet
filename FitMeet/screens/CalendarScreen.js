import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calendar Screen</Text>
    </View>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C2C2C', 
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: 'black', 
      },
})