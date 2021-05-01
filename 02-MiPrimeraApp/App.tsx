import React from 'react'
import {SafeAreaView, View } from 'react-native'
/* import { FlexScreen } from './src/screens/FlexScreen' */
/* import { PositionScreen } from './src/screens/PositionScreen' */
/* import { DimensionesScreen } from './src/screens/DimensionesScreen' */
/* import { BoxObjectModelScreen } from './src/screens/BoxObjectModelScreen' */
/* import { ContadorScreen } from './src/screens/ContadorScreen' */
/* import { HolaMundoScreen } from './src/screens/HolaMundoScreen' */
import { TareaScreen } from './src/screens/TareaScreen'

export const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <HolaMundoScreen /> */}
      {/* <ContadorScreen/> */}
      {/* <BoxObjectModelScreen /> */}
      {/* <DimensionesScreen /> */}
      {/* <PositionScreen /> */}
      {/* <FlexScreen /> */}
      <TareaScreen />

    </SafeAreaView>
    
  )
}
