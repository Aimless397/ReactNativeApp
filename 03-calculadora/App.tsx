import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import { CalculadoraSCreen } from './src/screens/CalculadoraSCreen'

import { styles } from './src/theme/appTheme'

export const App = () => {
  return (
    <SafeAreaView style={styles.fondo}>
      <StatusBar 
        backgroundColor='black'
        barStyle='light-content'  // solo para IOS
      />
      <CalculadoraSCreen />

    </SafeAreaView>
  )
}
