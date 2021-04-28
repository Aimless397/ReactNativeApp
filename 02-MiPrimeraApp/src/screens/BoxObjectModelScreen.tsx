import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const BoxObjectModelScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Box Object Model</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  title: {
    paddingHorizontal: 40,
    paddingVertical: 50,
    margin: 10,
    fontSize: 20,
    /* width: 100, */
    borderWidth: 10
  }
});