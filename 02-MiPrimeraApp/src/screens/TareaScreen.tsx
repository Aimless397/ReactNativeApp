import React from 'react'
import { StyleSheet, View } from 'react-native'

export const TareaScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cajaMorada} />
      <View style={styles.cajaNaranja} />
      <View style={styles.cajaAzul} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28425B',
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  cajaMorada: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderColor: 'white',
    backgroundColor: '#5856D6',
    position: 'relative'
    /* alignSelf: 'flex-start', */
  },
  cajaNaranja: {
    width: 100,
    height: 100,
    top: 50,
    borderWidth: 10,
    borderColor: 'white',
    backgroundColor: '#F0A23B',
    /* alignSelf: 'center', */

  },
  cajaAzul: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderColor: 'white',
    backgroundColor: '#28C4D9',
    /* alignSelf: 'flex-start' */
  },
})