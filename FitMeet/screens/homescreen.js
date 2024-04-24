import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  )
}

export default Homescreen

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